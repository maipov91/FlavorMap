const BASE = import.meta.env.VITE_API_BASE;

export async function api<T>(path: string): Promise<T> {
    const res = await fetch(`${BASE}${path}`);
    if (!res.ok) throw new Error(await res.text());
    return (await res.json()) as T;
}
