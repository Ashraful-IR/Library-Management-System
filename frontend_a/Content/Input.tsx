import React from "react";

type Props = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
};

export default function Input({
  label,
  name,
  value,
  onChange,
  error,
  type = "text",
}: Props) {
  return (
    <div style={{ marginBottom: "10px" }}>
      <label>{label}</label><br />
      <input name={name} type={type} value={value} onChange={onChange} />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}