import React from "react";
import NavBar from "./NavBar";

export default function Header() {
  return (
    <header className="static top-0 left-0 right-0 bg-red-700 shadow z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-gray-900">LM</h1>
          </div>
          <NavBar />
        </div>
      </div>
    </header>
  );
}
