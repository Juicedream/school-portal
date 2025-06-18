"use client";
import { Button } from "@/components/ui/button";

export default function Home() {
  function handleClick() {
    console.log("Button Clicked");
  }
  return (
    <>
      <h1 className="font-inter">Welcome to school</h1>
      <Button onClick={handleClick}>Click me</Button>
    </>
  );
}
