import { javascript, SampleFile, TextFile, typescript, YamlFile } from "projen";

const project = new typescript.TypeScriptProject({
  defaultReleaseBranch: "main",
  name: "app",
  packageManager: javascript.NodePackageManager.NPM,
  projenrcTs: true,

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.addTask("watch:ts", {
  exec: "tsc --watch",
});

project.addTask("watch:test", {
  exec: "jest --watchAll",
});

new SampleFile(project, "Dockerfile", {
  contents: `
# Stage 1: Build
FROM node:22.15.0-alpine3.20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Run
FROM node:22.15.0-alpine3.20
WORKDIR /app
COPY --from=build /app/lib ./lib
COPY package*.json ./
RUN npm install --omit=dev
CMD ["node", "lib/index.js"]
`.trim(),
});

new SampleFile(project, "Dockerfile.dev", {
  contents: `
FROM node:22.15.0-bookworm

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .
`.trim(),
});

new TextFile(project, ".dockerignore", {
  lines: [
    "node_modules",
    "dist",
    "coverage",
    "*.log",
    "Dockerfile",
    "docker-compose.yml",
  ],
});

new YamlFile(project, "compose.yml", {
  obj: {
    version: "3.8",
    services: {
      app: {
        build: {
          context: ".",
          dockerfile: "Dockerfile.dev",
        },

        volumes: [".:/app"],
        working_dir: "/app",
        command: "npm run watch:ts",
      },
    },
  },
});

project.synth();
