import type { Metadata } from "next";

export default function Title(props: { title: string }) {
  const metadata: Metadata = {
    title: props.title,
    description: "...",
  };

  return <title>{props.title}</title>;
}
