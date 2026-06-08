import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    base: '/revisions/', // À adapter selon votre repo GitHub
    publicDir: 'public',
})
