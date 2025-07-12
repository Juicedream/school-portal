"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
  icon: any;
  student: {
    id: string;
    userId: string;
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
    };
    admisionNumber: string;
    classId: string;
    class: {
      id: string;
      name: string;
    };
  };
};

const UpdateStudent = ({ icon, student }: Props) => {
  const [allClasses, setAllClasses] = useState([]);
  const [classRoom, setClassRoom] = useState(student.classId);

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

  function updateStudent(id: string) {
    console.log("Updated user", id);
    toast.success(`Updated user id: ${id} successfully`);
  }
  useEffect(() => {
    fetchClasses();
  }, []);
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">{icon}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to this profile here. Click update when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Full Name</Label>
              <Input
                id="name-1"
                name="name"
                className="bg-gray-200 cursor-not-allowed"
                defaultValue={student.user.name}
                readOnly
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email-1">Email</Label>
              <Input
                id="email-1"
                name="email"
                className="bg-gray-200 cursor-not-allowed"
                defaultValue={student.user.email}
                readOnly
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="admissionNum-1">Admission Number</Label>
              <Input
                id="admissionNum-1"
                name="admissionNum"
                className="bg-gray-200 cursor-not-allowed"
                defaultValue={student.admisionNumber}
                readOnly
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="class-1">Class</Label>
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
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="destructive">Cancel</Button>
            </DialogClose>
            <Button
              className="bg-blue-500"
              type="submit"
              onClick={() => updateStudent(student.id)}
            >
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
export default UpdateStudent;
