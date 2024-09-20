import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import babel from "@rollup/plugin-babel";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    babel({
      babelHelpers: "bundled",
      presets: ["@babel/preset-react"],
      exclude: "node_modules/**"
    })
  ],
  css: {
    modules: {
      // CSS Module 추가 설정
      generateScopedName: "[name]__[local]___[hash:base64:5]"
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
        // 파일 이름에 해시 추가하여 캐시된 버전이 아닌 최신 파일을 로드하도록 설정
        entryFileNames: "assets/[name].[hash].js",
        chunkFileNames: "assets/[name].[hash].js",
        assetFileNames: "assets/[name].[hash].[ext]"
      }
    },
    chunkSizeWarningLimit: 500 // 청크 사이즈 경고를 500kb로 설정
  },
  esbuild: {
    loader: "jsx" // JSX 파일을 처리할 로더로 설정
  }
});
