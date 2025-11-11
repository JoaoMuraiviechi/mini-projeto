import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const { register } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            await register(form.name, form.email, form.password);
            navigate("/login");
        } catch (err: any) {
            setError(err.message);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded w-96">
                <h2 className="text-2xl font-bold mb-4">Criar Conta</h2>
                {error && <p className="text-red-500">{error}</p>}
                <input
                    type="text"
                    placeholder="Nome"
                    className="border p-2 w-full mb-3"
                    onChange={e => setForm({ ...form, name: e.target.value })}
                />
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
                <button className="bg-blue-500 text-white p-2 w-full rounded">Cadastrar</button>
            </form>
        </div>
    );
}
