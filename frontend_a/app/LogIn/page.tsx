"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import axios from "axios";
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
  const [loading, setLoading] = useState(false);

  const API = process.env.NEXT_PUBLIC_API_ENDPOINT;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function getAxiosErrorMessage(error: unknown) {
    if (axios.isAxiosError(error)) {
      const data: any = error.response?.data;
      const msg = data?.message ?? data?.error ?? error.message;
      return Array.isArray(msg) ? msg.join(", ") : String(msg);
    }
    return "Something went wrong";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});

    // ✅ keep Zod validation
    const result = loginSchema.safeParse(form);
    if (!result.success) {
      const err: any = {};
      result.error.issues.forEach((i) => (err[i.path[0]] = i.message));
      setErrors(err);
      return;
    }

    if (!API) {
      setErrors({ form: "Missing NEXT_PUBLIC_API_ENDPOINT in .env/.env.local" });
      return;
    }

    setLoading(true);

    try {
      const url =
        role === "admin" ? `${API}/admin/login` : `${API}/librarian/login`;

      // ✅ Axios POST (PPT style)
      const response = await axios.post(url, result.data);

      // ✅ extract AXIOS response.data (PPT style)
      const jsonData = response.data;
      console.log("LOGIN RESPONSE:", jsonData);

      const token = jsonData?.accessToken;
      if (!token) {
        setErrors({ form: "No accessToken returned from server" });
        return;
      }

      localStorage.setItem("accessToken", token);
      localStorage.setItem("role", role);

      router.push(role === "admin" ? "/admin" : "/librarian");
    } catch (error) {
      setErrors({ form: getAxiosErrorMessage(error) });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Title title="Login" />

      <label>Login as</label>
      <br />
      <select value={role} onChange={(e) => setRole(e.target.value as any)}>
        <option value="admin">Admin</option>
        <option value="librarian">Librarian</option>
      </select>

      <form onSubmit={handleSubmit} noValidate>
        <Input
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
        />

        {/* ✅ backend error message */}
        {errors.form ? <p style={{ color: "red" }}>{errors.form}</p> : null}

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        <p>
          Dont have an account? <Link href="/Registration">Register</Link>
        </p>
      </form>
    </div>
  );
}
