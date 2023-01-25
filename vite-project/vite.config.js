import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, 'src/main.ts'),
            name: "myLib",
            fileName: "my-lib"
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                globals: {
                    vue: "Vue"
                }
            }
        }
    }
});