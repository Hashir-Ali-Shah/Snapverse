"use client";

import MainLayout from "./MainLayout";
import Navbar from "@/components/Navbar";

export default function GeneratorPage() {
  return (
    <div className="h-screen max-h-screen overflow-hidden">
      <Navbar />
      <MainLayout />
    </div>
  );
}
