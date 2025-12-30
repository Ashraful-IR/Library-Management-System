"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import Title from "@/Content/Title";
import Input from "@/Content/Input";
import Link from "next/link";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function LoginPage() {
  const router = useRouter();

  const [role, setRole] = useState<"admin" | "librarian">("admin");
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<any>({});

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});

    const result = loginSchema.safeParse(form);
    if (!result.success) {
      const err: any = {};
      result.error.issues.forEach(i => (err[i.path[0]] = i.message));
      setErrors(err);
      return;
    }

    if (role === "admin") router.push("/admin");
    else router.push("/librarian");
  }

  return (
    <div>
      <Title title="Login" />

      <label>Login as</label><br />
      <select value={role} onChange={e => setRole(e.target.value as any)}>
        <option value="admin">Admin</option>
        <option value="librarian">Librarian</option>
      </select>

      <form onSubmit={handleSubmit} noValidate>
        <Input label="Email" name="email" value={form.email} onChange={handleChange} error={errors.email} />
        <Input label="Password" name="password" type="password" value={form.password} onChange={handleChange} error={errors.password} />
        <button type="submit">Login</button>
        <p>Dont have an account? <Link href="/Registration">Register</Link></p>
      </form>
    </div>
  );
}