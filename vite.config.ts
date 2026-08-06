import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'api-server-middleware',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/api/health' && req.method === 'GET') {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ status: 'ok', server: 'AstroLive Dev Server' }));
            return;
          }

          if (req.url === '/api/cosmic-reading' && req.method === 'POST') {
            let body = '';
            req.on('data', (chunk) => {
              body += chunk.toString();
            });
            req.on('end', () => {
              try {
                const parsed = JSON.parse(body || '{}');
                const milestonesCount = (parsed.milestones || []).length;
                const reading = {
                  title: "The Aligned Trajectory of Purpose",
                  summary: `Synthesizing ${milestonesCount} constellation star nodes across your life timeline. Your map reflects a distinct pivot into creative sovereignty and planetary alignment.`,
                  theme: "The Path of Luminous Transformation",
                  insights: [
                    "Your early milestone foundation forged structural resilience that now fuels your current major decisions.",
                    "The Rahu-Ketu nodal axis aligns with your career pivot star, indicating accelerated expansion across international boundaries.",
                    "Upcoming 2028-2030 trajectory nodes mark a peak convergence of spiritual purpose and global impact."
                  ],
                  astrologicalAnalogy: "Like Jupiter transiting your 10th house of legacy, your life constellation shines with exalted clarity."
                };
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ reading, isFallback: true }));
              } catch (e) {
                res.statusCode = 500;
                res.end(JSON.stringify({ error: 'Failed to parse request' }));
              }
            });
            return;
          }

          next();
        });
      },
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
})
