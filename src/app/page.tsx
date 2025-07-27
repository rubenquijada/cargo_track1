"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/login?tipo=cliente");
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
     
    </div>
  );
}
