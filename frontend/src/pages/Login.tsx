import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate, Link } from "react-router-dom"; // <-- IMPORTA O LINK AQUI

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            await login(form.email, form.password);
            navigate("/dashboard");
        } catch (err: any) {
            setError(err.message);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded w-96">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                {error && <p className="text-red-500 mb-2">{error}</p>}

                <input
                    type="email"
                    placeholder="Email"
                    className="border p-2 w-full mb-3"
                    onChange={e => setForm({ ...form, email: e.target.value })}
                />

                <input
                    type="password"
                    placeholder="Senha"
                    className="border p-2 w-full mb-3"
                    onChange={e => setForm({ ...form, password: e.target.value })}
                />

                <button className="bg-green-500 text-white p-2 w-full rounded">
                    Entrar
                </button>

                {/* 🆕 AQUI O BOTÃO PARA REGISTRAR */}
                <p className="text-center text-sm mt-4 text-gray-600">
                    Não tem conta?{" "}
                    <Link to="/register" className="text-blue-600 hover:underline">
                        Criar conta
                    </Link>
                </p>
            </form>
        </div>
    );
}