"use client";
import Link from "next/link";
import React from "react";
import Head from "next/head";
import { useState } from "react";
import { FormEvent } from "react";
import Title from "@/Content/Title";
import NavBar from "@/Content/NavBar";
import Header from "@/Content/Header";
import Footer from "@/Content/Footer";

export default function Home() {
  return (
    <>
    <Title title="Home"></Title>
      <h1>Welcome to the Home Page</h1>
      <p>This is the main landing page of the application.</p>

      Go to <Link href="/LogIn">Login</Link>
      <br />
      Go to <Link href="/Registration">Registration</Link>
      
    </>
  );
}
