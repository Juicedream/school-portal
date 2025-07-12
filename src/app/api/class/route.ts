// app/api/classes/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// Get all classes
// GET /api/classes
export async function GET() {
  const classes = await prisma.class.findMany({
    include: {
      teacher: true,
      students: true,
    },
  });

  return NextResponse.json(classes);
}

