import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard/DashboardHeader"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Temporarily use mock session for homepage development
  const session = {
    user: {
      id: "mock-user",
      email: "mock@example.com",
      name: "Mock User",
    }
  }

  return (
    <div className="min-h-screen bg-[#0B0F14]">
      <DashboardHeader user={session.user} />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}
