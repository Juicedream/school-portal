"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Circle } from "lucide-react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { defaultPasswords } from "@/lib/stores";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
// import { useForm } from "react-hook-form"

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [admissionNumber, setAdmissionNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);
  const [allClasses, setAllClasses] = useState([]);
  const [classRoom, setClassRoom] = useState("");

  async function generateAdmissionNumber() {
    const randomNumber = Math.floor(Math.random() * 1000000) + 1; // Generates a random number between 1 and 1000000
    const data = await fetch("/api/students");
    const students = await data.json();
    students.forEach((student: any) => {
      if (
        student.admisionNumber ===
        `edu-${randomNumber.toString().padStart(6, "0")}`
      ) {
        toast.info("Admission number already exists, generating a new one...");
        return generateAdmissionNumber(); // Recursively call to generate a new number if it exists
      }
    });
    setAdmissionNumber(`edu-${randomNumber.toString().padStart(6, "0")}`);
    setLoading(false);
    toast.success("Admission number generated successfully");
  }

  function defaultPasswordGenerator() {
    let allowedPasswords = defaultPasswords;

    const randomIndex = Math.floor(Math.random() * allowedPasswords.length);
    setPassword(allowedPasswords[randomIndex]);
    setLoading(false);
    toast.success("Default password generated successfully");
  }
  function studentEmailGenerator(name: string) {
    const emailPrefix = name.toLowerCase().replace(/\s+/g, "."); // Replace spaces with dots and convert to lowercase
    setEmail(`${emailPrefix}@edu.school`);
    // toast.success("Email generated successfully");
}
 const fetchClasses = async () => {
   try {
     const response = await fetch("/api/class");
     if (!response.ok) {
       toast.error("Failed to fetch classes");
       throw new Error("Failed to fetch classes");
     }
     const data = await response.json();
     console.log("Fetched classes:", data);
     setAllClasses(data);
   } catch (error) {
     console.log("Error fetching classes:", error);
   }
 };
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistering(true);
    if (!name || !email || !admissionNumber || !password || !classRoom) {
      toast.error("Please fill in all fields");
      setIsRegistering(false);
      return;
    }
    if (!email.includes("@")) {
      toast.error("Please enter a valid email address");
      setIsRegistering(false);
      return;
    }
    try {
      const response = await fetch("/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          admisionNumber: admissionNumber,
          classId: classRoom,
          compulsoryClub: "", // Assuming default value for compulsory club
        }),
      });
        const data = await response.json();
        console.log("Response data:", data);
        if (!response.ok) {
            toast.error(data.message || "Failed to register student");
            setIsRegistering(false);
            return;
        }

        toast.success("Student registered successfully");
         console.log("Student registered successfully!", data);
          setEmail("");
          setName("");
          setAdmissionNumber("");
          setPassword("");
          setAllClasses([]);
         setTimeout(() => {
             generateAdmissionNumber();
             defaultPasswordGenerator();
             fetchClasses();
             setClassRoom("");
         }, 3000);

      
    
    } catch (error) {
        toast.error("Failed to register student. Please try again.");
        console.log("Registration error:", error);
    } finally {
      setIsRegistering(false);
    }
  };

  useEffect(() => {
   
    generateAdmissionNumber();
    defaultPasswordGenerator();
  }, []);

  useEffect(() => {
    if (name) {
      studentEmailGenerator(name);
    }
}, [name]);

  useEffect(() => {
   
    fetchClasses();
  }, [])

  return (
    <Card className="max-w-md mx-auto my-auto mt-10">
      <CardHeader>
        <CardTitle className="flex justify-center items-center gap-4">
          <Link
            href="/dashboard/admin/manage-students"
            className=" text-blue-600 hover:underline"
          >
            <ArrowLeft className="size-4" />
          </Link>
          <div className="">Register New Student</div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center items-center">
            <span>
              <Circle size="65" className="animate-spin" />
            </span>
          </div>
        ) : (
          <form onSubmit={handleRegister} className="grid gap-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="text"
                value={email}
                readOnly
                className="bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div className="space-y-2">
              <Label>Admission Number</Label>
              <Input
                type="text"
                value={admissionNumber}
                readOnly
                className="bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div className="space-y-2">
              <Label>Password</Label>
              <Input
                type="text"
                value={password}
                readOnly
                className="bg-gray-100 cursor-not-allowed"
              />
            </div>
            <div className="space-y-2">
              <Label>Class</Label>

              <Select
                value={classRoom}
                onValueChange={(value) => setClassRoom(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>

                <SelectContent>
                  {allClasses.map((classItem: any) => (
                    <SelectItem key={classItem.id} value={classItem.id}>
                      {classItem.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              className={
                `w-full mt-4` +
                (isRegistering
                  ? " bg-blue-600 cursor-not-allowed"
                  : " bg-blue-600 hover:bg-blue-700")
              }
            >
              {isRegistering ? "Registering..." : "Register Student"}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default Register;
