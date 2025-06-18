"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Megaphone,
  Command,
  Frame,
  GalleryVerticalEnd,
  School,
  Map,
  Shapes,
  BookUser,
  ReceiptText,
  BookMarked,
  PieChart,
  Settings2,
  SquareTerminal,
  ClipboardPen,
  Headset,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";

// This is sample data.
const adminData = {
  user: {
    name: "Admin",
    email: "admin@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Edu School Portal",
      logo: School,
      plan: "Enterprise",
    },
    // {
    //   name: "Acme Corp.",
    //   logo: AudioWaveform,
    //   plan: "Startup",
    // },
    // {
    //   name: "Evil Corp.",
    //   logo: Command,
    //   plan: "Free",
    // },
  ],
  navMain: [
    {
      title: "Actions",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Manage Students",
          url: "/dashboard/admin/manage-students",
        },
        {
          title: "Manage Teachers",
          url: "/dashboard/admin/manage-teachers",
        },

        {
          title: "Manage Subjects",
          url: "/dashboard/admin/manage-subjects",
        },
        {
          title: "Manage Clubs & Subscriptions",
          url: "/dashboard/admin/manage-clubs",
        },
        {
          title: "Reports & Promotions",
          url: "/dashboard/admin/report",
        },
        {
          title: "Approve Grades",
          url: "/dashboard/admin/approve-grades",
        },
      ],
    },
    {
      title: "Payments",
      url: "#",
      icon: ReceiptText,
      items: [
        {
          title: "Fee Management",
          url: "/dashboard/admin/fee-management",
        },
        {
          title: "Teachers Payments",
          url: "/dashboard/admin/teachers-payments",
        },
        {
          title: "Show Records",
          url: "/dashboard/admin/show-records",
        },
      ],
    },
    {
      title: "Informations",
      url: "#",
      icon: Megaphone,
      items: [
        {
          title: "Send Notifications",
          url: "/dashboard/admin/send-notifications",
        },
        {
          title: "Announcements",
          url: "/dashboard/admin/announcements",
        },
        {
          title: "NewsLetter",
          url: "/dashboard/admin/newsletter",
        }
        
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Profile",
          url: "/dashboard/admin/profile",
        },
       
      ],
    },
  ],
  // projects: [
  //   {
  //     name: "Design Engineering",
  //     url: "#",
  //     icon: Frame,
  //   },
  //   {
  //     name: "Sales & Marketing",
  //     url: "#",
  //     icon: PieChart,
  //   },
  //   {
  //     name: "Travel",
  //     url: "#",
  //     icon: Map,
  //   },
  // ],
};
const studentData = {
  url: {
    dashboard: "/dashboard/student",
  },
  user: {
    name: "Student",
    email: "student@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Edu School Portal",
      logo: School,
      plan: "Enterprise",
    },
    // {
    //   name: "Acme Corp.",
    //   logo: AudioWaveform,
    //   plan: "Startup",
    // },
    // {
    //   name: "Evil Corp.",
    //   logo: Command,
    //   plan: "Free",
    // },
  ],
  navMain: [
    {
      title: "Classroom",
      url: "#",
      icon: Shapes,
      items: [
        {
          title: "Chats",
          url: "/dashboard/student/chats",
        },
        {
          title: "Attendance",
          url: "/dashboard/student/attendance",
        },
        {
          title: "Subjects",
          url: "/dashboard/student/subjects",
        },
        {
          title: "Clubs & Subscriptions",
          url: "/dashboard/student/clubs-and-subscriptions",
        },
      ],
    },

    {
      title: "Payments",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Fee Management",
          url: "/dashboard/student/fee-management",
        },
        {
          title: "Show Records",
          url: "/dashboard/student/show-records",
        },
      ],
    },

    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Profile",
          url: "/dashboard/student/profile",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Assignments",
      url: "/dashboard/student/assignments",
      icon: BookUser,
    },
    {
      name: "Examinations",
      url: "/dashboard/student/examinations",
      icon: BookUser,
    },
    {
      name: "Tests",
      url: "/dashboard/student/tests",
      icon: BookUser,
    },
    {
      name: "Report Card",
      url: "/dashboard/student/report-card",
      icon: ClipboardPen,
    },
    {
      name: "Contact IT Support",
      url: "/dashboard/student/contact-it-support",
      icon: Headset,
    },
  ],
};
const teacherData = {
  user: {
    name: "Teacher",
    email: "teacher@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Edu School Portal",
      logo: School,
      plan: "Enterprise",
    },
    // {
    //   name: "Acme Corp.",
    //   logo: AudioWaveform,
    //   plan: "Startup",
    // },
    // {
    //   name: "Evil Corp.",
    //   logo: Command,
    //   plan: "Free",
    // },
  ],
  navMain: [
    {
      title: "Actions",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Manage Students",
          url: "/dashboard/teacher/manage-students",
        },

        {
          title: "Mark Attendance",
          url: "/dashboard/teacher/mark-attendance",
        },
        {
          title: "Mark Examinations",
          url: "/dashboard/teacher/mark-examinations",
        },
        {
          title: "Mark Tests",
          url: "/dashboard/teacher/mark-tests",
        },
        {
          title: "Set Class Timetable",
          url: "/dashboard/teacher/set-class-timetable",
        },

        {
          title: "Upload Students Reports & Promotions",
          url: "/dashboard/teacher/upload-students-reports",
        },
        {
          title: "Upload Grades",
          url: "/dashboard/teacher/upload-grades",
        },
      ],
    },
    {
      title: "Classroom",
      url: "#",
      icon: Shapes,
      items: [
        {
          title: "Chats",
          url: "/dashboard/teacher/chats",
        },
        {
          title: "Setup Classroom",
          url: "/dashboard/teacher/setup-classroom",
        },

      
      ],
    },
    {
      title: "Payments",
      url: "#",
      icon: ReceiptText,
      items: [
        {
          title: "Request Payments",
          url: "/dashboard/teacher/request-payments",
        },
        {
          title: "View Payements",
          url: "/dashboard/teacher/view-payments",
        },
      ],
    },
    {
      title: "Resources",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Manage Lesson Notes",
          url: "/dashboard/teacher/manage-lesson-notes",
        },
        {
          title: "TextBooks & Materials",
          url: "/dashboard/teacher/textbooks-and-materials",
        },
        {
          title: "Tutorials",
          url: "/dashboard/teacher/tutorials",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Profile",
          url: "/dashboard/teacher/profile",
        }
      ],
    },
  ]
};

const roles = ["admin", "student", "teacher"];

export function AppSidebar({
  role,
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  if (!role) {
    return null;
  }

  if (role === "admin" && roles.includes(role)) {
    return (
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <TeamSwitcher plan="paid" teams={adminData.teams} />
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={adminData.navMain} />
          {/* <NavProjects projects={adminData.projects} /> */}
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={adminData.user} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    );
  }

  if (role === "teacher" && roles.includes(role)) {
    return (
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <TeamSwitcher plan="expired" teams={teacherData.teams} />
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={teacherData.navMain} />
          {/* <NavProjects projects={teacherData.projects} /> */}
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={teacherData.user} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    );
  }
  if (role === "student" && roles.includes(role)) {
    return (
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <TeamSwitcher plan="paid" teams={studentData.teams} />
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={studentData.navMain} />
          <NavProjects projects={studentData.projects} />
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={studentData.user} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    );
  }
}
