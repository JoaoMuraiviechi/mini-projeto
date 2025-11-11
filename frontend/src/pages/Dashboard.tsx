import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const { token, logout } = useAuth();
    const [notes, setNotes] = useState<any[]>([]);
    const [title, setTitle] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }
        fetchNotes();
    }, [token]);

    async function fetchNotes() {
        const res = await api("/notes", "GET", undefined, token || undefined);
        setNotes(res.notes || []);
    }

    async function addNote() {
        await api("/notes", "POST", { title }, token || undefined);
        setTitle("");
        fetchNotes();
    }

    return (
        <div className="p-8">
            <div className="flex justify-between mb-4">
                <h1 className="text-2xl font-bold">Minhas Notas</h1>
                <button onClick={logout} className="bg-red-500 text-white px-3 py-1 rounded">Sair</button>
            </div>

            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    placeholder="Nova nota..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border p-2 flex-1"
                />
                <button onClick={addNote} className="bg-blue-500 text-white px-3 py-1 rounded">Adicionar</button>
            </div>

            <div className="grid gap-2">
                {notes.map((note) => (
                    <div key={note._id} className="border p-3 rounded bg-gray-50">
                        <p>{note.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
