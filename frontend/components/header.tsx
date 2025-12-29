type HeaderProps = {
  title: string;
};

export default function Header({ title }: HeaderProps) {
  return (
    <header style={{ padding: "15px", background: "#f5f5f5" }}>
      <h1>{title}</h1>
    </header>
  );
}
