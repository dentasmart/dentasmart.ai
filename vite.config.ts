import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "path";
import { defineConfig } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";

const plugins = [react(), tailwindcss(), jsxLocPlugin(), vitePluginManusRuntime()];

export default defineConfig({
  plugins,
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
    // Ensure only one copy of React is bundled — prevents "Invalid hook call" errors
    // when packages like @tiptap/react resolve their own React peer dep
    dedupe: ["react", "react-dom"],
  },
  optimizeDeps: {
    // This app has many lazy-loaded pages, including the original Blog Editor.
    // Scan their imports before the first browser request, otherwise Vite can
    // discover dependencies later, re-optimize them, and serve mixed hashes
    // for react-dom and hook consumers (wouter / Radix / TipTap).
    // Paths are relative to Vite's root ("client"), not the repository root.
    entries: ["index.html", "src/**/*.{ts,tsx}", "!src/**/*.test.{ts,tsx}", "!src/**/__tests__/**"],
    // Force Vite to pre-bundle react and react-dom as a single shared chunk.
    // Without this, Vite may create separate pre-bundled copies for packages
    // that list react as a peer dep (e.g. @tiptap/react, @trpc/react-query),
    // causing the "Invalid hook call" / "Cannot read properties of null" errors.
    // Include dependencies reached only after the lazy-loaded Blog Editor opens.
    // Avoid a second optimization cycle that can invalidate the React renderer
    // while Radix Tabs / TipTap initialize in the same browser session.
    include: [
      "react",
      "react-dom",
      "react-dom/client",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@radix-ui/react-tabs",
      "@tiptap/react",
      "wouter",
      "react-helmet-async",
    ],
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  publicDir: path.resolve(import.meta.dirname, "client", "public"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
    // Target modern browsers for smaller output
    target: 'es2020',
    // Increase chunk warning threshold (we have many lazy chunks by design)
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        // Manual chunk splitting for heavy vendor libraries
        manualChunks(id) {
          // Vendor: framer-motion (animation library)
          if (id.includes('framer-motion')) return 'vendor-framer';
          // Vendor: tiptap editor (only used in admin)
          if (id.includes('@tiptap')) return 'vendor-tiptap';
          // Vendor: recharts (only used in admin analytics)
          if (id.includes('recharts') || id.includes('d3-')) return 'vendor-recharts';
          // Vendor: React core
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) return 'vendor-react';
          // Vendor: tRPC + tanstack query
          if (id.includes('@trpc') || id.includes('@tanstack')) return 'vendor-trpc';
          // Vendor: radix-ui components
          if (id.includes('@radix-ui')) return 'vendor-radix';
          // Vendor: lucide icons
          if (id.includes('lucide-react')) return 'vendor-lucide';
        },
      },
    },
  },
  server: {
    host: true,
    hmr: {
      clientPort: 443,
      protocol: 'wss',
    },
    allowedHosts: [
      ".manuspre.computer",
      ".manus.computer",
      ".manus-asia.computer",
      ".manuscomputer.ai",
      ".manusvm.computer",
      "localhost",
      "127.0.0.1",
    ],
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
