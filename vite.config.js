/* eslint-disable prettier/prettier */
import { defineConfig } from 'vite'

export default defineConfig({
    base: '/NOMBRE_DEL_REPOSITORIO/',
    root: 'src/pages', // Cambia la raíz del proyecto
    build: {
        outDir: '../../dist', // Ajusta la salida relativa
        rollupOptions: {
            input: {
                main: 'index.html',
                about: 'about.html',
                contact: 'contact.html',
            },
        },
    },
})
