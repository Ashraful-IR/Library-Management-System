
"use client";

import { useState } from "react";
import { z } from "zod";
import Title from "@/Content/Title";
import  Input  from "@/Content/Input";
import React from "react";
import Link from "next/link";




const adminSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Email is not valid"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  phone: z.string().regex(/^\d+$/, "Phone must contain only digits"),
  age: z.coerce
    .number()
    .int("Age must be an integer")
    .min(18, "Age must be at least 18")
    .max(80, "Age must not exceed 80"),
  role: z
    .enum(["admin", "librarian"], { message: "Role must be admin or librarian" })
    .optional(),
  status: z
    .enum(["active", "inactive"], { message: "Status must be active or inactive" })
    .optional(),
});

const librarianSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters long"),
  lastName: z.string().min(2, "Last name must be at least 2 characters long"),
  email: z.string().email("Email is not valid"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  phone: z.string().regex(/^\d+$/, "Phone must contain only digits"),
  age: z.coerce
    .number()
    .int("Age must be an integer")
    .min(18, "Age must be at least 18")
    .max(70, "Age must not be more than 70"),
  designation: z.string().min(1, "Designation is required"),
  isActive: z.coerce.boolean(),
});


function zodToErrors(error: z.ZodError) {
  const err: Record<string, string> = {};
  error.issues.forEach((i) => {
    const key = String(i.path[0] ?? "form");
    err[key] = i.message;
  });
  return err;
}

export default function RegisterPage() {
  const [type, setType] = useState<"admin" | "librarian">("admin");
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

 
  const [form, setForm] = useState<any>({
    // admin
    fullName: "",
    email: "",
    password: "",
    phone: "",
    age: "",
    role: "",     // optional
    status: "",   // optional

    firstName: "",
    lastName: "",
    designation: "",
    isActive: true,
  });

  function handleChange(e: any) {
    const { name, value, type: inputType, checked } = e.target;
    setForm((prev: any) => ({
      ...prev,
      [name]: inputType === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});
    setSuccess(false);

    if (type === "admin") {
    
      const adminData = {
        fullName: form.fullName,
        email: form.email,
        password: form.password,
        phone: form.phone,
        age: form.age,
        
        role: form.role ? form.role : undefined,
        status: form.status ? form.status : undefined,
      };

      const result = adminSchema.safeParse(adminData);
      if (!result.success) {
        setErrors(zodToErrors(result.error));
        return;
      }

    
      setSuccess(true);

      setForm((prev: any) => ({
        ...prev,
        fullName: "",
        email: "",
        password: "",
        phone: "",
        age: "",
        role: "",
        status: "",
      }));
      return;
    }

    const librarianData = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      password: form.password,
      phone: form.phone,
      age: form.age,
      designation: form.designation,
      isActive: form.isActive,
    };

    const result = librarianSchema.safeParse(librarianData);
    if (!result.success) {
      setErrors(zodToErrors(result.error));
      return;
    }

    setSuccess(true);

    
    setForm((prev: any) => ({
      ...prev,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
      age: "",
      designation: "",
      isActive: true,
    }));
  }

  return (
    <div>
      <Title title="Register" />

      <div style={{ marginBottom: "12px" }}>
        <label>Register as</label>
        <br />
        <select
          value={type}
          onChange={(e) => {
            setType(e.target.value as any);
            setErrors({});
            setSuccess(false);
          }}
        >
          <option value="admin">Admin</option>
          <option value="librarian">Librarian</option>
        </select>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        {type === "admin" ? (
          <>
            <Input
              label="Full Name"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              error={errors.fullName}
            />

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

            <Input
              label="Phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              error={errors.phone}
            />

            <Input
              label="Age"
              name="age"
              value={String(form.age)}
              onChange={handleChange}
              error={errors.age}
            />

          </>
        ) : (
          <>
            <Input
              label="First Name"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              error={errors.firstName}
            />

            <Input
              label="Last Name"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              error={errors.lastName}
            />

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

            <Input
              label="Phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              error={errors.phone}
            />

            <Input
              label="Age"
              name="age"
              value={String(form.age)}
              onChange={handleChange}
              error={errors.age}
            />

            <Input
              label="Designation"
              name="designation"
              value={form.designation}
              onChange={handleChange}
              error={errors.designation}
            />

           
          </>
        )}

        {errors.form ? <p style={{ color: "red" }}>{errors.form}</p> : null}

        <button type="submit">Register</button>
        <p>Already have an account? <Link href="/LogIn">Login</Link></p>
      </form>

      {success ? (
        <p style={{ color: "green", marginTop: "10px" }}>
          Registration successful!
        </p>
      ) : null}
    </div>
  );
}
