import Link from "next/link";

export default function NavBar() {
  return (
    <nav style={{ padding: "1rem" }}>
      <div
        style={{
          display: "flex",
          gap: "2rem",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <Link href="Home">Home</Link>
        <Link href="/Dashboard">Dashboard</Link>
        <Link href="/Books">View available books</Link>
        <Link href="/IssueBook">Issue a book</Link>
        <Link href="/ReturnBook">Return a book</Link>
        <Link href="/AddBook">Add a new book</Link>
        <Link href="/Arival">New Arival</Link>
        <Link href="/about">About</Link>
        <Link href="/services">Services</Link>
        <Link href="/contact">Contact</Link>
      </div>
    </nav>
  );
}
