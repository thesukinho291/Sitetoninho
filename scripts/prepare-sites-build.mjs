import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const serverDirectory = resolve('dist/server');
const workerPath = resolve(serverDirectory, 'index.js');

const workerSource = `const worker = {
  async fetch(request, env) {
    const url = new URL(request.url);
    let response = await env.ASSETS.fetch(request);

    const isPageRequest = request.method === "GET" && !url.pathname.split("/").pop().includes(".");
    if (response.status === 404 && isPageRequest) {
      response = await env.ASSETS.fetch(new Request(new URL("/index.html", request.url), request));
    }

    const headers = new Headers(response.headers);
    headers.set("X-Content-Type-Options", "nosniff");
    headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};

export default worker;
`;

await mkdir(serverDirectory, { recursive: true });
await writeFile(workerPath, workerSource, 'utf8');
