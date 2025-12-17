import { NotificationType } from "@prisma/client";
import { safeDbOperation } from "@/lib/db-health";
import { prisma } from "@/lib/prisma";

type CreateUserNotificationArgs = {
  userId?: string | null;
  type: NotificationType;
  title: string;
  message: string;
  data?: Record<string, unknown>;
};

export async function createUserNotification(args: CreateUserNotificationArgs) {
  const { userId, type, title, message, data } = args;
  if (!userId) return null;

  return safeDbOperation(async () => {
    const user = await (prisma as any).user?.findUnique?.({ where: { id: userId } });
    if (!user) return null;

    const notificationModel = (prisma as any).notification;
    if (!notificationModel?.create) return null;

    return notificationModel.create({
      data: {
        userId,
        type,
        title,
        message,
        data: data || {},
      },
    });
  });
}
