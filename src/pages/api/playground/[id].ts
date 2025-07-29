import type { APIRoute } from "astro";
import { readFile, writeFile } from "fs/promises";
import { resolve } from "path";

// Make sure this path is absolute and points to your data directory
const DATA_PATH = resolve(process.cwd(), "data", "playgrounds.json");

export const GET: APIRoute = async ({ params }) => {
  const data = JSON.parse(await readFile(DATA_PATH, "utf-8"));
  const playground = data.find((p: any) => p.id === params.id);
  return new Response(JSON.stringify(playground), { status: 200 });
};

export const PUT: APIRoute = async ({ params, request }) => {
  const data = JSON.parse(await readFile(DATA_PATH, "utf-8"));
  const body = await request.json();
  const idx = data.findIndex((p: any) => p.id === params.id);
  if (idx !== -1) data[idx] = { ...data[idx], ...body };
  await writeFile(DATA_PATH, JSON.stringify(data, null, 2));
  return new Response(JSON.stringify(data[idx]), { status: 200 });
};
