import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.ICONIC_SPRITE_CDN_URL": JSON.stringify("https://iconic.dynamic-static-assets.com/icons/sprite.svg"),
    "process.env.NEXT_PUBLIC_ICONIC_SPRITE_CDN_URL": JSON.stringify("https://iconic.dynamic-static-assets.com/icons/sprite.svg"),
    "process.env.REACT_APP_ICONIC_SPRITE_CDN_URLL": JSON.stringify("https://iconic.dynamic-static-assets.com/icons/sprite.svg"),
  },
});