import Header from "@/components/header";
import MyNav from "@/components/mynav";
import Footer from "@/components/footer";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header title="Library Management System" />
        <MyNav />
        <main style={{ padding: "20px" }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
