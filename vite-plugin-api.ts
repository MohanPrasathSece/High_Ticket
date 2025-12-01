// Vite plugin to handle API routes during development
import { defineConfig } from 'vite';
import { resolve } from 'path';
import type { ViteDevServer } from 'vite';

export function apiPlugin() {
  return {
    name: 'api-plugin',
    configureServer(server: ViteDevServer) {
      // Order confirmation email endpoint
      server.middlewares.use('/api/send-email', async (req: any, res: any, next: any) => {
        if (req.method !== 'POST') {
          res.writeHead(405, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        try {
          // Import the email handler
          const { default: handler } = await import('./src/api/send-email.ts');
          
          // Create a Request object from the Node.js request
          const body = await new Promise<string>((resolve, reject) => {
            let data = '';
            req.on('data', (chunk: any) => data += chunk);
            req.on('end', () => resolve(data));
            req.on('error', reject);
          });

          const request = new Request('http://localhost:5173/api/send-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...req.headers,
            },
            body,
          });

          const response = await handler(request);
          const responseData = await response.text();

          res.writeHead(response.status, {
            'Content-Type': 'application/json',
            ...Object.fromEntries(response.headers.entries()),
          });
          res.end(responseData);
        } catch (error) {
          console.error('API Error:', error);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ 
            error: 'Internal server error',
            details: error instanceof Error ? error.message : 'Unknown error'
          }));
        }
      });

      // Contact form email endpoint
      server.middlewares.use('/api/send-contact-email', async (req: any, res: any, next: any) => {
        if (req.method !== 'POST') {
          res.writeHead(405, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        try {
          // Import the contact email handler
          const { default: handler } = await import('./src/api/send-contact-email.ts');
          
          // Create a Request object from the Node.js request
          const body = await new Promise<string>((resolve, reject) => {
            let data = '';
            req.on('data', (chunk: any) => data += chunk);
            req.on('end', () => resolve(data));
            req.on('error', reject);
          });

          const request = new Request('http://localhost:5173/api/send-contact-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              ...req.headers,
            },
            body,
          });

          const response = await handler(request);
          const responseData = await response.text();

          res.writeHead(response.status, {
            'Content-Type': 'application/json',
            ...Object.fromEntries(response.headers.entries()),
          });
          res.end(responseData);
        } catch (error) {
          console.error('Contact API Error:', error);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ 
            error: 'Internal server error',
            details: error instanceof Error ? error.message : 'Unknown error'
          }));
        }
      });
    },
  };
}
