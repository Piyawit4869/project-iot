# === Stage 1: Development dependencies ===
FROM node:20-alpine AS development-dependencies-env
RUN npm install -g pnpm
COPY . /app
WORKDIR /app
RUN pnpm install --frozen-lockfile

# === Stage 2: Production dependencies (no dev deps) ===
FROM node:20-alpine AS production-dependencies-env
RUN npm install -g pnpm
COPY ./package.json ./pnpm-lock.yaml /app/
WORKDIR /app
RUN pnpm install --frozen-lockfile --prod

# === Stage 3: Build stage ===
FROM node:20-alpine AS build-env
RUN npm install -g pnpm
COPY . /app/
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
WORKDIR /app
RUN pnpm run build

# === Stage 4: Runtime image ===
FROM node:20-alpine
RUN npm install -g pnpm

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and pnpm-lock.yaml
COPY ./package.json ./pnpm-lock.yaml /app/

# Copy production dependencies and the build output from previous stages
COPY --from=production-dependencies-env /app/node_modules /app/node_modules
COPY --from=build-env /app/build /app/build

EXPOSE 3000

# Set the entrypoint to the run.sh script
CMD ["pnpm", "start"]
