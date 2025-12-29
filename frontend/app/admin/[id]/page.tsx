"use client";

import { useParams } from "next/navigation";
import Title from "@/components/title";

export default function AdminPage() {
  const { id } = useParams();

  return (
    <div>
      <Title text="Admin Page" />
      <p>Admin ID: {id}</p>
    </div>
  );
}
