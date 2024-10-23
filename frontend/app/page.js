import { FloatingDock } from "@/components/Dock";
import Form from "@/components/Form";
import { FloatingNav, LampDemo } from "@/components/framer";
import Navbar from "@/components/Navbar";
import React  from "react";
export default function Home() {
  return (
    <div>
      <Navbar />
      {/* <FloatingDock /> */}
      {/* <Form /> */}
      <LampDemo />
    </div>
  )
}