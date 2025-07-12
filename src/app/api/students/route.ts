// app/api/students/route.ts
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

// Get all students
// GET /api/students
export async function GET() {
  const students = await prisma.student.findMany({
    include: {
      user: true,
      class: true,
    },
  });

  return NextResponse.json(students);
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
    compulsoryClub = "",
    electiveClub = null,
  } = body;
if(!(name && email && password && admisionNumber)){
  return NextResponse.json({success: false, message: "All fields are required"}, { status: 400 });
}



 try{
    // Check if the student already exists
    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      return NextResponse.json(
        { success: false, message: "Student already exists" },
        { status: 400 }
      );
    }

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
       admisionNumber,
       user: {
         connect: {
           email
         },
        },
         class:{
          connect:{
            id: classId,
          }
         },
         compulsoryClub,
         electiveClub,
     },
   });

   return NextResponse.json({ success:true, message: "Student created", student });

 }catch(error){
  return NextResponse.json({
    error: "Failed to create student",
    message: error instanceof Error ? error.message : "Unknown error",
  }, { status: 500 });
 }
}