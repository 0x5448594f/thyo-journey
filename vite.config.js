import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "about.html"),
        posts: resolve(__dirname, "posts.html"),
        add_post: resolve(__dirname, "add_post.html"),
      },
    },
  },
});
