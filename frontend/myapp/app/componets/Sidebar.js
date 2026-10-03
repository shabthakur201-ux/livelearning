"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
   <aside className="fixed left-0 top-0 h-screen w-64 bg-gray-900 text-white">
      

<nav className="flex flex-col gap-4">
       
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/externalclient">External client</Link>
        <Link href="/cron">Cron</Link>
        <Link href="/users">Users</Link>
        <Link href="/Order">Order</Link>
      </nav>
    </aside>
  );
}