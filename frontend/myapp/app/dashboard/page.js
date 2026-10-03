"use client"
import Sidebar from "../componets/Sidebar";
export default function DashboardPage() {
  return (
    <>
    
        <Sidebar />
      <div className="ml-64 p-6">
      <h1 className="text-3xl font-bold">
        Dashboard
      </h1>

      <p className="mt-4">
        Welcome to your dashboard.
      </p>
    </div>
    </>
  );
}