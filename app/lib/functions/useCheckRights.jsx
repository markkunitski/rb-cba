"use client";
import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext";
import { usePathname } from 'next/navigation'

export default function useCheckRights() {
  const { role, token } = useContext(AuthContext);
  const router = useRouter();
  const pathname = usePathname()
  useEffect(() => {
    // If the context does not have a role or token
    if (!role || !token) {
      router.replace("/");
      return;
    }

    // Define the routes that each role can access
    const clientRoutes = ["/client-bank", "/client-documents"];
    const keeperRoutes = ["/keeper-bank", "/keeper-documents"];

    // Check if the user's role matches the required role for the route they're trying to access
    if (
      (role === "client" && !clientRoutes.includes(pathname)) ||
      (role === "keeper" && !keeperRoutes.includes(pathname))
    ) {
      router.replace("/no-rights");
    } else {
    }
  }, [role, token, router]);
}
