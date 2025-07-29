export async function fetchPlayground(id: string) {
  const res = await fetch(`/api/playground/${id}`);
  if (!res.ok) throw new Error("Failed to fetch playground");
  return await res.json();
}

export async function savePlayground(id: string, data: any) {
  const res = await fetch(`/api/playground/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to save playground");
  return await res.json();
}
