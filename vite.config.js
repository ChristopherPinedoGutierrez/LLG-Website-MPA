/* eslint-disable prettier/prettier */
import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig(({ mode }) => {
    const isProduction = mode === 'production' // Detecta si es producción

    return {
        base: isProduction ? '/LLG-Website-MPA/' : '/', // Cambia la base solo en producción
        root: 'src', // Carpeta raíz del proyecto
        build: {
            outDir: '../dist', // Carpeta de salida
            emptyOutDir: true, // Vaciar la carpeta de salida
            rollupOptions: {
                input: {
                    main: path.resolve(__dirname, 'src/index.html'),
                    about: path.resolve(__dirname, 'src/about.html'),
                },
            },
        },
    }
})
