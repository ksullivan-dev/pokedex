import { defineConfig } from "vite";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    testMatch: ["**/*.test.ts(x?)"],
    globals: true,
  },
});
