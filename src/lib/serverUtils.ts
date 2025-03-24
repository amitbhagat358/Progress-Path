"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import { JSDOM } from "jsdom";

export const getUserIdFromToken = async (): Promise<string | null> => {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  return session.user.id;
};

export const getAllImagesFromContent = async (
  content: string
): Promise<string[]> => {
  const dom = new JSDOM(content);
  const document = dom.window.document;

  const images: string[] = Array.from(document.querySelectorAll("img"))
    .map((img) => img.getAttribute("src"))
    .filter((src): src is string => src !== null);

  return images;
};
