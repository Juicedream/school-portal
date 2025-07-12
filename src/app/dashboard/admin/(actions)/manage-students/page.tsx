"use client"
import UpdateStudent from "@/components/dashboards/admin/UpdateStudent"
import { Button } from "@/components/ui/button"
import { Table } from "@/components/ui/table"
import { ArrowLeft, Edit, Trash2Icon } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { toast } from "sonner"



type Student = {
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
  class:{
    id: string;
    name: string;
  }
};

const ManageStudents = () => {
 const [students, setStudents ] = useState<Student[]>([]);
 const [loading, setLoading] = useState(true);
 // This would typically be fetched from an API or database
  const fetchStudents = async () => {
    try {
          const response = await fetch("/api/students"); // Example API endpoint
          if (!response.ok) {
            toast.error("Failed to fetch students data");
            console.error("Failed to fetch students data");
            return;
          }
          const data = await response.json();
          setStudents(data) // Assuming data is an array of student objects
          console.log("Fetched students data:", data);
    }catch(err){
      toast.error("An error occurred while fetching students data");
      console.error("Error fetching students data:", err);
    }
  }
  function deleteStudent(id: string){
    console.log("Deleted user",id);
  }


  useEffect(() => {
    // Fetch students data from an API or database

    // Assuming the response is successful, you would set the students state here
    
    console.log("Fetching students data...");
    fetchStudents();
    setLoading(false);
  }, []);
  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Link href="/dashboard/admin">
          <ArrowLeft />
        </Link>
        <h1 className="font-bold uppercase">Manage Students</h1>
      </div>
      <p>This is the manage students page for the admin dashboard.</p>
      <p>Here you can add, edit, or remove students from the system.</p>
      <Link
        className="flex items-center justify-center"
        href="/dashboard/admin/manage-students/register"
      >
        <Button
          variant="default"
          className="mt-4 bg-green-700 text-xl hover:bg-green-600 cursor-pointer"
        >
          Add Student
        </Button>
      </Link>

      <div className="mt-8">
        {/* list of all students */}
        <h2 className="text-lg font-semibold">List of Students</h2>
        <p>Here you will see all the students registered in the system.</p>
        {/* Placeholder for student list */}
        <div className="mt-4">
          {loading ? (
            <p className="text-gray-500">Loading students...</p>
          ) : students.length > 0 ? (
            <Table className="w-full border border-gray-400">
              <thead>
                <tr>
                  <th className="text-left">Name</th>
                  <th className="text-left">Email</th>
                  <th className="text-left">Admission Number</th>
                  <th className="text-left">Class</th>
                  <th className="text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className="text-center">
                    <td className="border outline-2">{student.user.name}</td>
                    <td className="border outline-2">{student.user.email}</td>
                    <td className="border outline-2">
                      {student.admisionNumber}
                    </td>
                    <td className="border outline-2">{student.class.name}</td>
                    <td className="flex gap-2 border outline-2 items-center justify-center py-4">
                      <div
                        className="cursor-pointer"
                        title={`Update ${student.user.name} information`}
                      >
                       <UpdateStudent
                          icon={<Edit className="text-blue-500" size="16" />}
                          student={student}
                        />
                      </div>
                      <div
                        className="cursor-pointer"
                        title={`Delete ${student.user.name}`}
                        onClick={() => deleteStudent(student.id)}
                      >
                        <Trash2Icon className="text-red-500" size="16" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p className="text-gray-500">No students registered yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ManageStudents