"use client";

import { useParams } from "next/navigation";
import Title from "@/Content/Title";

export default function Books() {
  const { BookId } = useParams();

  return (
    <div>
      <Title title="Book Details Page" />
      <p>Book ID: {BookId}</p>
      <h1>Details for Book {BookId}</h1>
      <p>This page contains detailed information about Book {BookId}.</p>
      
    </div>
  );
}