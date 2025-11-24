"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function SessionSync() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const setToken = useAuthStore((state) => state.setToken);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    useEffect(() => {
        const tokenFromUrl = searchParams.get("token");

        if (tokenFromUrl) {
            // Si hay un token en la URL, lo guardamos en el store (y localStorage via persist)
            setToken(tokenFromUrl);

            // Limpiamos la URL para quitar el token visible
            const params = new URLSearchParams(searchParams.toString());
            params.delete("token");

            const newQuery = params.toString();
            const newUrl = newQuery ? `${pathname}?${newQuery}` : pathname;

            router.replace(newUrl);
        }
    }, [searchParams, setToken, router, pathname]);

    return null; // Este componente no renderiza nada visualmente
}
