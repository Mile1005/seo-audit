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
  const [profile, setProfile] = useState({ name: '', email: '' })
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
          setProfile({ name: user?.name || '', email: user?.email || '' })
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
      await update({ name: user.name })
      toast.success('Profile updated')
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
      await update({ image: user.image })
      toast.success('Photo updated')
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
      if (!r.ok) throw new Error('2FA setup failed')
      const data = await r.json()
      setTwoFA((prev) => ({ ...prev, secret: data.secret, qr: data.qrCode }))
    } catch (e: any) {
      toast.error(e?.message || 'Error setting up 2FA')
    } finally {
      setLoading(false)
    }
  }

  async function verify2FA() {
    if (!twoFA.secret || !twoFA.token) return toast.error('Enter the 2FA code')
    setLoading(true)
    try {
      const r = await fetch('/api/user/2fa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'verify', secret: twoFA.secret, token: twoFA.token }),
      })
      if (!r.ok) throw new Error((await r.json()).error || 'Verification failed')
      setTwoFA({ enabled: true, secret: '', qr: '', token: '' })
      toast.success('2FA enabled')
    } catch (e: any) {
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
            <div className="flex items-center space-x-6">
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                {session?.user?.image ? (
                  <img
                    src={session.user.image}
                    alt="Profile"
                    className="w-20 h-20 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-20 h-20 bg-slate-200 rounded-full flex items-center justify-center">
                    <UserCircleIcon className="w-12 h-12 text-slate-400" />
                  </div>
                )}
                <button
                  onClick={() => fileRef.current?.click()}
                  disabled={loading}
                  className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full disabled:opacity-50"
                  aria-label="Change profile photo"
                >
                  <CameraIcon className="w-4 h-4" />
                </button>
              </div>
              <div>
                <button
                  onClick={() => fileRef.current?.click()}
                  disabled={loading}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
                >
                  Change Photo
                </button>
                <p className="text-sm text-slate-500 mt-1">JPG, GIF or PNG. Max size 2MB.</p>
                <input ref={fileRef} className="hidden" type="file" accept="image/*" onChange={uploadPhoto} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                <input
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                <input
                  value={profile.email}
                  disabled
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Company</label>
                <input
                  value={prefs.company}
                  onChange={(e) => setPrefs({ ...prefs, company: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Timezone</label>
                <select
                  value={prefs.timezone}
                  onChange={(e) => setPrefs({ ...prefs, timezone: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                className="px-4 py-2 border border-slate-300 rounded-lg disabled:opacity-50"
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
            <div className="bg-slate-50 p-6 rounded-lg space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Current Password</label>
                <input
                  type="password"
                  value={pwd.current}
                  onChange={(e) => setPwd({ ...pwd, current: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">New Password</label>
                <input
                  type="password"
                  value={pwd.next}
                  onChange={(e) => setPwd({ ...pwd, next: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Confirm New Password</label>
                <input
                  type="password"
                  value={pwd.confirm}
                  onChange={(e) => setPwd({ ...pwd, confirm: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>
              <button
                onClick={changePassword}
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg disabled:opacity-50"
              >
                Change Password
              </button>
            </div>

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
