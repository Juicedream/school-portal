"use client"
import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { SiteHeader } from "@/components/site-header";
import data from "../../data/data.json"; // Adjust the import path as necessary
const info = {
     title: "Report",
      description: "Updated 2 days ago",
      text1: "All Payments",
      text2: "Student Performance",
      text3: "Teacher Performance",
}
const cards = [
    {
        id: 1,
        description: "Account Balance",
        price: 20013332,
        trend: 20,
        update: "Updated 2 days ago"
    },
    {
        id: 2,
        description: "Total Teachers",
        price: 6,
        trend: 5,
        update: "Updated 1 hour ago"
    },
    {
        id: 3,
        description: "Total Students",
        price: 20,
        trend: 15,
        update: "Updated 1 hour ago"
    },
    {
        id: 4,
        description: "Current Term",
        price: 3,
        trend: 80,
        update: "Updated 1 hour ago"
    },
]

export const AdminDashboard = () => {
  return (
    <div className="font-inter">
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards card={cards} />
            <div className="px-4 lg:px-6">
              <ChartAreaInteractive info={info} />
            </div>
            {/* <DataTable data={data} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};
