import Link from "next/link";

export default function MyNav() {
  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <Link href="/">Home</Link> |{" "}
      <Link href="/login">Login</Link> |{" "}
      <Link href="/register">Register</Link>
    </nav>
  );
}
