"use server";

import { connectToDatabase } from "@/lib/mongodb";
import { getUserIdFromToken } from "@/lib/serverUtils";
import NotificationSubscription from "@/schemas/NotificationSubscription";
import webpush, { PushSubscription } from "web-push";

webpush.setVapidDetails(
  "https://localhost:3000",
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
);

let subscription: PushSubscription | null = null;

export async function subscribeUser(sub: PushSubscription) {
  subscription = sub;

  await connectToDatabase();
  const userId = await getUserIdFromToken();
  const newSubscription = new NotificationSubscription({
    userId,
    ...subscription,
  });
  await newSubscription.save();

  return { success: true };
}

export async function unsubscribeUser() {
  subscription = null;

  await connectToDatabase();
  const userId = await getUserIdFromToken();
  await NotificationSubscription.deleteOne({ userId });

  return { success: true };
}

export async function sendNotification(message: string) {
  if (!subscription) {
    throw new Error("No subscription available");
  }

  try {
    await webpush.sendNotification(
      subscription,
      JSON.stringify({
        title: "Test Notification",
        body: message,
        icon: "/icon.png",
      })
    );
    return { success: true };
  } catch (error) {
    console.error("Error sending push notification:", error);
    return { success: false, error: "Failed to send notification" };
  }
}
