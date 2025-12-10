import { build } from "esbuild";

await build({
  entryPoints: ["src/index.ts"],
  outfile: "build/build.server.js",
  bundle: true,
  platform: "node",
  target: "node22",
  packages: "bundle",

  plugins: [
    {
      name: "ignore-optional-sequelize",
      setup(build) {
        build.onResolve({ filter: /(pg-hstore|pg|mysql2|sqlite3|tedious)$/ }, () => ({
          path: "noop",
          namespace: "ignore",
        }));

        build.onLoad({ filter: /.*/, namespace: "ignore" }, () => ({
          contents: "export default {};",
          loader: "js",
        }));
      },
    },
  ],
});
