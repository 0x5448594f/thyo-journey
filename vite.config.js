import { defineConfig } from "vite";
import { resolve } from "path";
import fs from "fs";

const input = {
  index: resolve(__dirname, "index.html"),
  about: resolve(__dirname, "about.html"),
  posts: resolve(__dirname, "posts.html"),
  add_post: resolve(__dirname, "add_post.html"),
};

const postsDir = resolve(__dirname, "posts");

if (fs.existsSync(postsDir)) {
  const files = fs.readdirSync(postsDir);

  files
    .filter(file => file.endsWith(".html"))
    .forEach(file => {
      input[`posts/${file.replace(".html", "")}`] = resolve(postsDir, file);
    });
}

export default defineConfig({
  build: {
    rollupOptions: {
      input,
    },
  },
});
