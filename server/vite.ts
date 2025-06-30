import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import { nanoid } from "nanoid";
import viteConfig from "../vite.config.js"; // ✅ Make sure vite.config has .js extension after esbuild build

const viteLogger = createLogger();

/** Logging helper */
export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}

/** Setup Vite in development mode */
export async function setupVite(app: Express, server: Server) {
  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: {
      middlewareMode: true,
      hmr: { server },
      allowedHosts: "all",
    },
    appType: "custom",
  });

  app.use(vite.middlewares);

  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path.resolve(
          __dirname,
          "..",
          "client",
          "index.html"
      );

      // Read index.html fresh on each request
      let template = await fs.promises.readFile(clientTemplate, "utf-8");

      // Add a cache-busting query param to the entry file
      template = template.replace(
          'src="/src/main.tsx"',
          `src="/src/main.tsx?v=${nanoid()}"`
      );

      const html = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

/** Serve static files in production */
export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");

  if (!fs.existsSync(distPath)) {
    throw new Error(
        `Could not find build directory at ${distPath}. Make sure to build the client first.`
    );
  }

  app.use(express.static(distPath));

  // Fallback for single-page app (SPA)
  app.use("*", (_req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}
