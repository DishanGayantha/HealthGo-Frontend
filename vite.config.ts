import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

/**
 * Vite configuration file
 *
 * This file configures Vite for a React project with proxy settings.
 * The configuration defines the necessary plugins and server settings.
 *
 * @see https://vitejs.dev/config/ for full documentation
 */

export default defineConfig({
  // Plugins array
  // Adding the React plugin with SWC (a fast JavaScript/TypeScript compiler)
  plugins: [react()],

  // Resolve aliases
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Shortcut for importing from the 'src' directory
    },
  },

  // Server configuration
  server: {
    // Proxy configuration
    proxy: {
      /**
       * Proxy '/api' requests to the backend server at 'http://localhost:3000'
       * This ensures that any request to '/api/*' on the frontend will be forwarded
       * to the specified target, avoiding CORS issues during development.
       *
       * @param {string} target - The backend server URL to proxy to.
       * @param {boolean} changeOrigin - Changes the origin of the host header to the target URL.
       * @param {function} rewrite - Function to rewrite the path (optional).
       */
      "/api": {
        target: "http://localhost:3000", // Backend API base URL
        changeOrigin: true, // Change the origin of the host header to the target URL
        rewrite: (path) => path.replace(/^\/api/, ""), // Remove the '/api' prefix before forwarding the request
      },
    },
  },
});
