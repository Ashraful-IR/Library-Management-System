"use client";

import { useParams } from "next/navigation";
import Title from "@/components/title";

export default function LibrarianPage() {
  const { id } = useParams();

  return (
    <div>
      <Title text="Librarian Page" />
      <p>Librarian ID: {id}</p>
    </div>
  );
}
