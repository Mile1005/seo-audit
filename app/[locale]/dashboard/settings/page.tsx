'use client'

import { useEffect, useRef, useState } from 'react'
import { useSession } from 'next-auth/react'
import { toast, Toaster } from 'react-hot-toast'
import { UserCircleIcon, CameraIcon, CheckIcon } from '@heroicons/react/24/outline'

// Simple, production-ready settings page wired to backend APIs (no mock data)
// - Profile: view/edit name, upload photo (email read-only)
// - Preferences: company, timezone (stored via /api/user/preferences)
// - Security: change password, enable/verify TOTP 2FA

type Tab = 'profile' | 'security'

type Preferences = {
  company: string
  timezone: string
}

type TwoFAState = {
  enabled: boolean
  secret: string
  qr: string
  token: string
}

export default function SettingsPage() {
  const { data: session, update } = useSession()
  const [tab, setTab] = useState<Tab>('profile')
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState({ name: '', email: '', hasPassword: false })
  const [prefs, setPrefs] = useState<Preferences>({ company: '', timezone: 'UTC' })
  const [pwd, setPwd] = useState({ current: '', next: '', confirm: '' })
  const [twoFA, setTwoFA] = useState<TwoFAState>({ enabled: false, secret: '', qr: '', token: '' })
  const fileRef = useRef<HTMLInputElement>(null)

  // Load profile and preferences on mount
  useEffect(() => {
    if (!session?.user?.email) return
    const init = async () => {
      try {
        const [uRes, pRes] = await Promise.all([
          fetch('/api/user/profile'),
          fetch('/api/user/preferences'),
        ])
        if (uRes.ok) {
          const { user } = await uRes.json()
          setProfile({ name: user?.name || '', email: user?.email || '', hasPassword: !!user?.hasPassword })
        }
        if (pRes.ok) {
          const { preferences } = await pRes.json()
          setPrefs({ company: preferences?.company || '', timezone: preferences?.timezone || 'UTC' })
        }
      } catch (err) {
        console.error(err)
        toast.error('Failed to load settings')
      }
    }
    init()
  }, [session])

  // Load 2FA status
  useEffect(() => {
    if (!session?.user?.email) return
    const load2FA = async () => {
      try {
        const r = await fetch('/api/user/2fa')
        if (r.ok) {
          const data = await r.json()
          if (typeof data.enabled === 'boolean') {
            setTwoFA((prev) => ({ ...prev, enabled: data.enabled }))
          }
        }
      } catch (e) {
        // silent – 2FA may not be configured yet
      }
    }
    load2FA()
  }, [session])

  async function saveProfile() {
    if (!profile.name.trim()) return toast.error('Name is required')
    setLoading(true)
    try {
      const r = await fetch('/api/user/profile', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: profile.name }),
      })
      if (!r.ok) throw new Error((await r.json()).error || 'Update failed')
      const { user } = await r.json()
      
      // Update session and local state
      await update({ name: user.name })
      setProfile(p => ({ ...p, name: user.name }))
      
      // Force page refresh to ensure data is updated
      setTimeout(() => window.location.reload(), 1000)
      
      toast.success('Profile updated successfully!')
    } catch (e: any) {
      toast.error(e?.message || 'Error updating profile')
    } finally {
      setLoading(false)
    }
  }

  async function savePrefs() {
    setLoading(true)
    try {
      const r = await fetch('/api/user/preferences', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prefs),
      })
      if (!r.ok) throw new Error((await r.json()).error || 'Save failed')
      toast.success('Preferences saved')
    } catch (e: any) {
      toast.error(e?.message || 'Error saving preferences')
    } finally {
      setLoading(false)
    }
  }

  async function uploadPhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const fd = new FormData()
    fd.append('file', file)
    setLoading(true)
    try {
      const r = await fetch('/api/user/photo', { method: 'POST', body: fd })
      if (!r.ok) throw new Error((await r.json()).error || 'Upload failed')
      const { user } = await r.json()
      
      // Update session and refresh page data
      await update({ image: user.image })
      
      // Force page refresh to show new photo
      window.location.reload()
      
      toast.success('Photo updated successfully!')
    } catch (e: any) {
      toast.error(e?.message || 'Error uploading photo')
    } finally {
      setLoading(false)
    }
  }

  async function changePassword() {
    if (!pwd.current || !pwd.next || pwd.next !== pwd.confirm) return toast.error('Fill all password fields correctly')
    setLoading(true)
    try {
      const r = await fetch('/api/user/password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword: pwd.current, newPassword: pwd.next }),
      })
      if (!r.ok) throw new Error((await r.json()).error || 'Change failed')
      setPwd({ current: '', next: '', confirm: '' })
      toast.success('Password changed')
    } catch (e: any) {
      toast.error(e?.message || 'Error changing password')
    } finally {
      setLoading(false)
    }
  }

  async function setup2FA() {
    setLoading(true)
    try {
      const r = await fetch('/api/user/2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'setup' }),
      })
      if (!r.ok) {
        const error = await r.json()
        throw new Error(error.error || '2FA setup failed')
      }
      const data = await r.json()
      setTwoFA((prev) => ({ ...prev, secret: data.secret, qr: data.qrCode }))
      toast.success('2FA setup initialized! Scan the QR code with your authenticator app.')
    } catch (e: any) {
      console.error('2FA setup error:', e)
      toast.error(e?.message || 'Error setting up 2FA')
    } finally {
      setLoading(false)
    }
  }

  async function verify2FA() {
    if (!twoFA.secret || !twoFA.token) return toast.error('Enter the 6-digit code from your authenticator app')
    setLoading(true)
    try {
      const r = await fetch('/api/user/2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'verify', secret: twoFA.secret, token: twoFA.token }),
      })
      if (!r.ok) {
        const error = await r.json()
        throw new Error(error.error || 'Verification failed')
      }
      setTwoFA({ enabled: true, secret: '', qr: '', token: '' })
      toast.success('2FA enabled successfully! Your account is now more secure.')
    } catch (e: any) {
      console.error('2FA verification error:', e)
      toast.error(e?.message || 'Error verifying 2FA')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Toaster position="top-right" />
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-600 mt-2">Manage your account settings and preferences</p>
      </div>

      <div className="border-b border-slate-200">
        <nav className="-mb-px flex space-x-8">
          {(['profile', 'security'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                tab === t
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              {t === 'profile' ? 'Profile' : 'Security'}
            </button>
          ))}
        </nav>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        {tab === 'profile' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-slate-900">Profile Information</h2>
            <div className="flex items-center space-x-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
              <div className="relative group">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {session?.user?.image ? (
                  <img
                    src={session.user.image}
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover ring-4 ring-white shadow-lg"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center ring-4 ring-white shadow-lg">
                    <span className="text-white text-xl font-bold">{session?.user?.name?.[0]?.toUpperCase() || 'U'}</span>
                  </div>
                )}
                <button
                  onClick={() => fileRef.current?.click()}
                  disabled={loading}
                  className="absolute bottom-0 right-0 bg-blue-600 text-white p-2.5 rounded-full disabled:opacity-50 hover:bg-blue-700 transition-all shadow-lg group-hover:scale-110"
                  aria-label="Change profile photo"
                >
                  <CameraIcon className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{session?.user?.name || 'Your Name'}</h3>
                <p className="text-gray-600 mb-4">{session?.user?.email}</p>
                <button
                  onClick={() => fileRef.current?.click()}
                  disabled={loading}
                  className="bg-blue-600 text-white px-6 py-2.5 rounded-lg disabled:opacity-50 hover:bg-blue-700 transition-colors font-medium shadow-sm"
                >
                  {loading ? 'Uploading...' : 'Change Photo'}
                </button>
                <p className="text-sm text-gray-500 mt-2">JPG, GIF or PNG. Max size 2MB.</p>
                <input ref={fileRef} className="hidden" type="file" accept="image/*" onChange={uploadPhoto} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Full Name</label>
                <input
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-gray-900 shadow-sm"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Email Address</label>
                <input
                  value={profile.email}
                  disabled
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-500 shadow-sm"
                />
                <p className="text-xs text-gray-500 mt-2 flex items-center">
                  <CheckIcon className="w-3 h-3 mr-1" />
                  Email cannot be changed
                </p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Company</label>
                <input
                  value={prefs.company}
                  onChange={(e) => setPrefs({ ...prefs, company: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-gray-900 shadow-sm"
                  placeholder="Enter your company"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Timezone</label>
                <select
                  value={prefs.timezone}
                  onChange={(e) => setPrefs({ ...prefs, timezone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white text-gray-900 shadow-sm"
                >
                  <option value="UTC">UTC</option>
                  <option value="America/New_York">Eastern Time</option>
                  <option value="Europe/London">London</option>
                  <option value="Europe/Paris">Paris</option>
                  <option value="Asia/Tokyo">Tokyo</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={savePrefs}
                disabled={loading}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 transition-colors"
              >
                Save Preferences
              </button>
              <button
                onClick={saveProfile}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:opacity-50"
              >
                Save Profile
              </button>
            </div>
          </div>
        )}

        {tab === 'security' && (
          <div className="space-y-8">
            <h2 className="text-xl font-semibold text-slate-900">Security</h2>
            {profile.hasPassword ? (
              <div className="bg-slate-50 p-6 rounded-lg space-y-4 border border-slate-200">
                <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wide">Password</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="md:col-span-1 space-y-1">
                    <label className="block text-sm font-medium text-slate-700">Current</label>
                    <input
                      type="password"
                      value={pwd.current}
                      onChange={(e) => setPwd({ ...pwd, current: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-slate-700">New</label>
                    <input
                      type="password"
                      value={pwd.next}
                      onChange={(e) => setPwd({ ...pwd, next: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-slate-700">Confirm</label>
                    <input
                      type="password"
                      value={pwd.confirm}
                      onChange={(e) => setPwd({ ...pwd, confirm: e.target.value })}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={changePassword}
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
                  >
                    Change Password
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wide">Password</h3>
                  <p className="text-sm text-slate-600 mt-1 max-w-md">Your account uses Google sign in. Password management is handled by your Google Account.</p>
                </div>
                <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-1 rounded">Google OAuth</span>
              </div>
            )}

            <div className="bg-slate-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-slate-900 mb-2">Two-Factor Authentication</h3>
              {!twoFA.enabled ? (
                <div className="space-y-4">
                  {!twoFA.qr ? (
                    <button
                      onClick={setup2FA}
                      disabled={loading}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
                    >
                      Enable 2FA
                    </button>
                  ) : (
                    <div className="space-y-4">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={twoFA.qr} alt="QR" className="w-48 h-48" />
                      <input
                        placeholder="6-digit code"
                        value={twoFA.token}
                        onChange={(e) => setTwoFA({ ...twoFA, token: e.target.value })}
                        className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                      />
                      <button
                        onClick={verify2FA}
                        disabled={loading}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
                      >
                        Verify & Enable
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3 text-green-600">
                  <CheckIcon className="w-5 h-5" /> <span>2FA is enabled</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
