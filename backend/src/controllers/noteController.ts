import { Request, Response } from "express";
import * as noteService from "../services/noteService";

const getUserId = (req: Request) => {
    return (req as any).user?.id;
};

export const create = async (req: Request, res: Response) => {
    try {
    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ error: "Usuário não autenticado." });

    const { title, content, tags, pinned } = req.body;
    if (!title || typeof title !== "string") {
        return res.status(400).json({ error: "Campo 'title' obrigatório e string." });
    }

    const note = await noteService.createNote(userId, { title, content, tags, pinned });
    return res.status(201).json({ message: "Nota criada com sucesso.", note });
    } catch (err: any) {
    console.error("noteController.create error:", err);
    return res.status(500).json({ error: "Erro ao criar nota." });
    }
};

export const list = async (req: Request, res: Response) => {
    try {
    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ error: "Usuário não autenticado." });

    const notes = await noteService.listNotes(userId, req.query);
    return res.json({ notes });
    } catch (err: any) {
    console.error("noteController.list error:", err);
    return res.status(500).json({ error: "Erro ao listar notas." });
    }
};

export const getById = async (req: Request, res: Response) => {
    try {
    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ error: "Usuário não autenticado." });

    const { id } = req.params;
    const note = await noteService.getNoteById(id);
    if (!note) return res.status(404).json({ error: "Nota não encontrada." });

    if (String((note as any).user) !== String(userId)) {
        return res.status(403).json({ error: "Acesso negado à nota de outro usuário." });
    }

    return res.json({ note });
    } catch (err: any) {
    console.error("noteController.getById error:", err);
    return res.status(500).json({ error: "Erro ao buscar nota." });
    }
};

export const put = async (req: Request, res: Response) => {
    try {
    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ error: "Usuário não autenticado." });

    const { id } = req.params;
    const { title, content, tags, pinned } = req.body;
    if (!title || typeof title !== "string") return res.status(400).json({ error: "Campo 'title' obrigatório." });

    const note = await noteService.getNoteById(id);
    if (!note) return res.status(404).json({ error: "Nota não encontrada." });
    if (String((note as any).user) !== String(userId)) return res.status(403).json({ error: "Acesso negado." });

    const updated = await noteService.replaceNote(id, { title, content, tags, pinned });
    return res.json({ message: "Nota atualizada.", note: updated });
    } catch (err: any) {
    console.error("noteController.put error:", err);
    return res.status(500).json({ error: "Erro ao atualizar nota." });
    }
};

export const patch = async (req: Request, res: Response) => {
    try {
    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ error: "Usuário não autenticado." });

    const { id } = req.params;
    const data = req.body;
    const note = await noteService.getNoteById(id);
    if (!note) return res.status(404).json({ error: "Nota não encontrada." });
    if (String((note as any).user) !== String(userId)) return res.status(403).json({ error: "Acesso negado." });

    const updated = await noteService.patchNote(id, data);
    return res.json({ message: "Nota parcialmente atualizada.", note: updated });
    } catch (err: any) {
    console.error("noteController.patch error:", err);
    return res.status(500).json({ error: "Erro ao atualizar nota." });
    }
};

export const remove = async (req: Request, res: Response) => {
    try {
    const userId = getUserId(req);
    if (!userId) return res.status(401).json({ error: "Usuário não autenticado." });

    const { id } = req.params;
    const note = await noteService.getNoteById(id);
    if (!note) return res.status(404).json({ error: "Nota não encontrada." });
    if (String((note as any).user) !== String(userId)) return res.status(403).json({ error: "Acesso negado." });

    await noteService.deleteNoteById(id);
    return res.status(204).send();
    } catch (err: any) {
    console.error("noteController.remove error:", err);
    return res.status(500).json({ error: "Erro ao remover nota." });
    }
};