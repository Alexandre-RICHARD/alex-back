import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/**/*.test.ts"],
    exclude: [],
    reporters: [],
    outputFile: "./report/index.html",
    setupFiles: "vitest.setup.ts",
    passWithNoTests: true,
    coverage: {
      reportOnFailure: true,
      reportsDirectory: "./report/coverage",
      enabled: false,
      provider: "v8",
      reporter: "html",
      include: ["src/**/*.{ts,js}"],
      exclude: [
        "src/**/*.type.ts",
        "src/**/*.d.ts",
        "src/**/*.enum.ts",
        "src/**/*.test.*",
      ],
    },
  }
});
