import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [react()],
    // Only expose VITE_ prefixed env vars to the client
    define: Object.keys(env).filter(k => k.startsWith('VITE_')).reduce((acc, key) => {
      acc[`process.env.${key}`] = JSON.stringify(env[key]);
      return acc;
    }, {} as Record<string, string>),
    base: mode === 'production' ? (env.VITE_BASE_URL || '/gameline-aistudio/') : '/',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
