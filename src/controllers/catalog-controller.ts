import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";
const prisma = new PrismaClient();

export async function showAllCatalog(req: Request, res: Response) {
  const userId = (req as any).user;
  if (!userId) {
    return res.status(403).json({ message: "Unauthorized" });
  }
  try {
    const allCatalog = await prisma.catalog.findMany({
      select: {
        name: true,
        vendorId: true,
      },
    });
    return res
      .status(201)
      .json({ message: "Showing All Catalog", catalog: allCatalog });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
}

export async function showCatalogbyId(req: Request, res: Response) {
  const userId = (req as any).user;
  const { id } = req.params;
  if (!userId) {
    return res.status(403).json({ message: "Unauthorized" });
  }
  try {
    const catalog = await prisma.catalog.findUnique({
      where: {
        id: id,
      },
      select: {
        name: true,
        vendorId: true,
      },
    });
    if (!catalog) {
      return res.status(404).json({ message: "Not Found" });
    }
    return res.status(201).json({ message: "Found Catalog", catalog: catalog });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
}

export async function addCatalog(req: Request, res: Response) {
  const userId = (req as any).user;
  const { name } = req.body;
  if (!userId) {
    return res.status(403).json({ message: "Unauthorized" });
  }
  if (!name) {
    return res.status(400).json({ message: `Name can't be empty` });
  }
  try {
    const currentVendor = await prisma.vendors.findUnique({
      where: {
        userId: userId.id,
      },
    });
    if (!currentVendor) {
      return res.status(404).json({ message: "Vendors not found" });
    }
    const insertCatalog = await prisma.catalog.create({
      data: {
        name: name,
        vendorId: currentVendor.id,
      },
    });
    return res
      .status(200)
      .json({ message: "Catalog created!", catalog: insertCatalog });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
}

export async function updateCatalog(req: Request, res: Response) {
  const userId = (req as any).user;
  const { id } = req.params;
  const { name } = req.body;
  if (!userId) {
    return res.status(403).json({ message: "Unauthorized" });
  }
  try {
    const currentVendor = await prisma.vendors.findUnique({
      where: {
        userId: userId.id,
      },
    });
    if (!currentVendor) {
      return res.status(404).json({ message: "Vendors not found" });
    }
    const catalog = await prisma.catalog.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        vendorId: true,
      },
    });
    if (!catalog) {
      return res.status(404).json({ message: "Not Found" });
    }
    if (catalog.vendorId != currentVendor.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    const update = await prisma.catalog.update({
      where: {
        id: catalog.id,
      },
      data: {
        name: name,
      },
    });

    return res
      .status(201)
      .json({ message: "Catalog Updated", catalog: update });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
}

export async function deleteCatalog(req: Request, res: Response) {
  const userId = (req as any).user;
  const { id } = req.params;
  if (!userId) {
    return res.status(403).json({ message: "Unauthorized" });
  }
  try {
    const currentVendor = await prisma.vendors.findUnique({
      where: {
        userId: userId.id,
      },
    });
    if (!currentVendor) {
      return res.status(404).json({ message: "Vendors not found" });
    }
    const catalog = await prisma.catalog.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        name: true,
        vendorId: true,
      },
    });
    if (!catalog) {
      return res.status(404).json({ message: "Not Found" });
    }
    if (catalog.vendorId != currentVendor.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    const deleted = await prisma.catalog.delete({
      where: {
        id: catalog.id,
      },
    });

    return res
      .status(201)
      .json({ message: "Catalog Deleted", catalog: deleted });
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error", error });
  }
}
