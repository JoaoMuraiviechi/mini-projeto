export const API_URL = "http://localhost:3000";

export async function api(endpoint: string, method = "GET", data?: any, token?: string) {
    const headers: any = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(`${API_URL}${endpoint}`, {
        method,
        headers,
        body: data ? JSON.stringify(data) : undefined,
    });

    const json = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(json.error || "Erro desconhecido");
    return json;
}
