import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import React from "react";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
    </main>
  )
}