import {defineConfig} from "vite";
import dts from "vite-plugin-dts";
import path from "path";
import string from 'vite-plugin-string';


export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
    string({
      include: ["**/*.css"]
    })
  ],
  build: {
    outDir: "dist",
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "eruda-tma-cloudstorage",
      formats: ["es"],
      fileName: () => `eruda-tma-cloudstorage.js`,
    },
  }
});
