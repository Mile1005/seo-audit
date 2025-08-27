import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET() {
  const session = await auth()
  
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      projects: {
        include: {
          _count: {
            select: {
              members: true,
              audits: true,
              crawls: true
            }
          }
        }
      },
      memberships: {
        include: {
          project: {
            include: {
              _count: {
                select: {
                  members: true,
                  audits: true,
                  crawls: true
                }
              }
            }
          }
        }
      }
    }
  })

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  return NextResponse.json({
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.createdAt
    },
    projects: user.projects,
    memberships: user.memberships
  })
}
