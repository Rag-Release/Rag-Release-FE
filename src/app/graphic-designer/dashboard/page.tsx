"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bar, Line } from "react-chartjs-2";
import {
  Book,
  Briefcase,
  DollarSign,
  Star,
  Palette,
  Clock,
  ChevronRight,
  Plus,
} from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { LightCard } from "../../../components/card/LightCard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Link from "next/link";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface Project {
  id: string;
  title: string;
  author: string;
  coverImage: string;
  deadline: string;
  progress: number;
}

interface RecentActivity {
  id: string;
  action: string;
  project: string;
  timestamp: string;
}

const projects: Project[] = [
  {
    id: "1",
    title: "The Silent Echo",
    author: "Elena Martínez",
    coverImage: "/assets/images/book1.png?height=180&width=120",
    deadline: "2023-07-15",
    progress: 75,
  },
  {
    id: "2",
    title: "Quantum Dreams",
    author: "Dr. Aiden Chen",
    coverImage: "/assets/images/book2.png?height=180&width=120",
    deadline: "2023-07-22",
    progress: 40,
  },
  {
    id: "3",
    title: "Echoes of Eternity",
    author: "Olivia Blackwood",
    coverImage: "/assets/images/book1.png?height=180&width=120",
    deadline: "2023-07-30",
    progress: 10,
  },
];

const recentActivities: RecentActivity[] = [
  {
    id: "1",
    action: "Submitted final design for",
    project: "Whispers in the Wind",
    timestamp: "2 hours ago",
  },
  {
    id: "2",
    action: "Received feedback for",
    project: "The Silent Echo",
    timestamp: "5 hours ago",
  },
  {
    id: "3",
    action: "Started new project",
    project: "Echoes of Eternity",
    timestamp: "1 day ago",
  },
  {
    id: "4",
    action: "Completed revision for",
    project: "Quantum Dreams",
    timestamp: "2 days ago",
  },
];

export default function DesignerDashboard() {
  const [completedProjects] = useState(42);
  const [activeProjects] = useState(3);
  const [averageRating] = useState(4.8);
  const [totalEarnings] = useState(15750);

  const projectCompletionData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Completed Projects",
        data: [4, 6, 8, 7, 10, 7],
        backgroundColor: "rgba(124, 58, 237, 0.5)",
        borderColor: "rgb(124, 58, 237)",
        borderWidth: 1,
      },
    ],
  };

  const earningsData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Monthly Earnings",
        data: [2100, 2400, 2800, 2600, 3200, 2650],
        borderColor: "rgb(34, 197, 94)",
        tension: 0.1,
        fill: false,
      },
    ],
  };

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <main className="container mx-auto max-w-6xl px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <LightCard className="text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Completed Projects
                </CardTitle>
                <Briefcase className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{completedProjects}</div>
                <p className="text-xs text-muted-foreground">
                  +2 from last month
                </p>
              </CardContent>
            </LightCard>
            <LightCard className="text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Projects
                </CardTitle>
                <Book className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeProjects}</div>
                <p className="text-xs text-muted-foreground">
                  +1 new this week
                </p>
              </CardContent>
            </LightCard>
            <LightCard className="text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Average Rating
                </CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{averageRating}</div>
                <p className="text-xs text-muted-foreground">
                  +0.2 from last month
                </p>
              </CardContent>
            </LightCard>
            <LightCard className="text-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Earnings
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${totalEarnings}</div>
                <p className="text-xs text-muted-foreground">
                  +$1,250 from last month
                </p>
              </CardContent>
            </LightCard>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7 mt-6">
            <LightCard className="col-span-4 text-white">
              <CardHeader>
                <CardTitle>Project Completion Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <Bar data={projectCompletionData} />
              </CardContent>
            </LightCard>
            <LightCard className="col-span-3 text-white">
              <CardHeader>
                <CardTitle>Monthly Earnings</CardTitle>
              </CardHeader>
              <CardContent>
                <Line data={earningsData} />
              </CardContent>
            </LightCard>
          </div>

          <div className="grid gap-6 md:grid-cols-2 mt-6">
            <LightCard className="col-span-1 text-white">
              <CardHeader>
                <CardTitle>Active Projects</CardTitle>
                <CardDescription>
                  Your ongoing book cover designs
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] w-full rounded-md border">
                  {projects.map((project) => (
                    <Link
                      key={project.id}
                      href={`/graphic-designer/upload-work?projectId=${project.id}`}
                      passHref
                      target="_blank"
                    >
                      <div className="flex items-center space-x-4 p-4 border-b last:border-b-0 cursor-pointer hover:bg-gray-800 transition">
                        <img
                          src={project.coverImage}
                          alt={project.title}
                          className="w-16 h-24 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">{project.title}</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {project.author}
                          </p>
                          <div className="flex items-center mt-2">
                            <Clock className="w-4 h-4 mr-1 text-gray-500 dark:text-gray-400" />
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              Due {project.deadline}
                            </span>
                          </div>
                          <Progress value={project.progress} className="mt-2" />
                        </div>
                        <Button variant="ghost" size="icon">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </Link>
                  ))}
                </ScrollArea>
              </CardContent>
            </LightCard>
            <LightCard className="col-span-1 text-white">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Your latest actions and updates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[400px] w-full rounded-md border">
                  {recentActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start space-x-4 p-4 border-b last:border-b-0"
                    >
                      <div className="rounded-full bg-red-200 p-2 shadow-md">
                        <Palette className="h-4 w-4 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {activity.action}{" "}
                          <span className="font-semibold">
                            {activity.project}
                          </span>
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {activity.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </CardContent>
            </LightCard>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
