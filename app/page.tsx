"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomeRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/inicio");
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center text-center px-4">
      <p className="text-sm text-muted-foreground">Redirecionando para o início...</p>
    </div>
  );
}
