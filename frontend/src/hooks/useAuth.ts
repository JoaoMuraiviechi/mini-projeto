import { useState } from "react";
import { api } from "../services/api";

export function useAuth() {
    const [token, setToken] = useState(localStorage.getItem("token"));

    async function login(email: string, password: string) {
        const res = await api("/login", "POST", { email, password });
        localStorage.setItem("token", res.token);
        setToken(res.token);
    }

    async function register(name: string, email: string, password: string) {
        await api("/register", "POST", { name, email, password });
    }

    function logout() {
        localStorage.removeItem("token");
        setToken(null);
    }

    return { token, login, register, logout };
}
