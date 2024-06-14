import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
process.env.NODE_ENV = 'development';
export default defineConfig({
    plugins: [react()],
    define: {
        'process.env.NODE_ENV': '"development"'
        //process.env,
    },
    server: {
        host: true,
    },
    base: './',
});
