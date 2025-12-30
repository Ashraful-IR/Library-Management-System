"use client";
import { useState, FormEvent } from "react";
import Head from "next/head";
import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/router";
import Title from "../../Content/Title";
import NavBar from "../../Content/NavBar";
import { title } from "process";
import type { Metadata } from "next";
import Header from "@/Content/Header";
import Footer from "@/Content/Footer";
export default function Books() {
    return (
        <>
            <Title title="Books"></Title>
            <h1>Books Page</h1>
            All available books:
            <ul>
                <li><Link href="/Book/1">Book 1</Link></li>
                <li><Link href="/Book/2">Book 2</Link></li>
                <li><Link href="/Book/3">Book 3</Link></li>
            </ul>
        </>
    );
}