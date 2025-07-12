import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";
import validateEmail from "../functions/validate-email";

const prisma = new PrismaClient();

export async function register(req: Request, res: Response) {
  const userId = (req as any).user;
  if (!userId) {
    return res.status(403).json({ message: "No user found" });
  }
  const { username, email, name } = req.body;
  if (!username || !validateEmail(email) || !name) {
    return res.status(400).json({ message: "All fields required" });
  }
  try {
    const currentUser = await prisma.users.findUnique({
      where: {
        id: userId.id,
      },
      select: {
        id: true,
      },
    });
    if (!currentUser) {
      return res.status(403).json({ message: "No user found" });
    }
    const registeredUser = await prisma.vendors.create({
      data: {
        username: username,
        email: email,
        name: name,
        userId: currentUser?.id,
      },
      select: {
        username: true,
        email: true,
        name: true,
      },
    });
    return res
      .status(201)
      .json({ message: "User Registered!", registered: registeredUser });
  } catch (err) {
    return res.status(500).json({ message: "Internal Server error", err });
  }
}
