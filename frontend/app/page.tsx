import Link from "next/link";
import Title from "@/components/title";

export default function Home() {
  return (
    <div>
      <Title text="Home Page" />
      <p>This is the landing page.</p>

      <Link href="/login">Login</Link>
      <br />
      <Link href="/register">Register</Link>
    </div>
  );
}
