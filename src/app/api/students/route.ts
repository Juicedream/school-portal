// app/api/students/route.ts
import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

// Get all students
// GET /api/students
export async function GET() {
  const students = await prisma.student.findMany({
    include: {
      user: true,
      class: true,
    },
  });

  return Response.json(students);
}


//create a new student
// POST /api/students
export async function POST(req: NextRequest) {
  const body = await req.json();

  const {
    name,
    email,
    password,
    admisionNumber,
    classId,
    compulsoryClub,
    electiveClub,
  } = body;

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password,
      role: "STUDENT",
    },
  });

  const student = await prisma.student.create({
    data: {
      userId: user.id,
      classId,
      admisionNumber,
      compulsoryClub,
      electiveClub,
    },
  });

  return Response.json({ message: "Student created", student });
}