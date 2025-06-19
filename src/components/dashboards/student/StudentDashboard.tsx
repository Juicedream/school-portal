"use client";

import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import CalendarForDashboard from "@/components/CalendarForDashboard";
import data from "../../data/data.json"; // Adjust the import path as necessary
import { ChatDashboard } from "@/components/ChatDashboard";
import Countdown from "@/components/Countdown";

const info = {
  title: "Report",
  description: "Updated 2 days ago",
  text1: "All Payments",
  text2: "Student Performance",
  text3: "Teacher Performance",
};
const cards = [
  {
    id: 1,
    description: "Exams",
    price: 0,
    trend: 0,
    update: "Updated 2 days ago",
  },
  {
    id: 2,
    description: "Assignments",
    price: 14,
    trend: 25,
    update: "Updated 1 hour ago",
  },
  {
    id: 3,
    description: "Tests",
    price: 25,
    trend: 90,
    update: "Updated 1 hour ago",
  },
  {
    id: 4,
    description: "Current Term",
    price: 3,
    trend: 100,
    update: "Updated 1 hour ago",
  },
];
const messages = [
  {
    id: "1",
    senderId: "1",
    senderName: "John Doe",
    avatar: "https://i.pravatar.cc/150?img=3",
    content: "Hello, how are you?",
    timestamp: "8:12 AM",
  },
  {
    id: "2",
    senderId: "",
    senderName: "Jane Smith",
    avatar: "https://i.pravatar.cc/150?img=4",
    content: "I'm good, thanks! How about you?",
    timestamp: "12:45 PM",
  },
];



export const StudentDashboard = () => {
  return (
    <div className="font-inter">
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards card={cards} />
            <div className=" flex flex-row gap-4 px-4 lg:px-6">
              {/* <ChartAreaInteractive info={info} /> */}
              {/* studnt calendar */}
              <div>
                <h1 className="font-poppins">Calendar</h1>
                <CalendarForDashboard />
              </div>
              <div className="px-4 lg:px-6">
                <h2 className="">Updates</h2>
                <div className="card card-side bg-zinc-300 shadow-sm">
                  <figure>
                    <img src="https://picsum.photos/200/300" alt="Classroom" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title font-poppins">
                      Chat update from friends😁!
                    </h2>
                    {/* <p>Make sure to excel this new Term</p> */}
                    <div className="card-actions justify-end">
                      <ChatDashboard currentUserId="" messages={messages} />
                     
                      {/* <button className="btn btn-primary">Watch</button> */}
                    </div>
                  </div>
                </div>
                <div className="px-2 my-4">
                  <Countdown />
                </div>
              </div>
            </div>

            {/* <ChartAreaInteractive info={info} /> */}

            {/* <DataTable data={data} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};
