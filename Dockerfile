# Stage 1: Build with caching
FROM node:22-alpine AS builder
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy lockfile and manifest to install dependencies (enables better caching)
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application
COPY . .

# Build the app
RUN pnpm build

# Stage 2: Production image
FROM node:22-alpine AS runner
WORKDIR /app

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Only copy the necessary files from builder
COPY --from=builder /app .

ENV NODE_ENV=production

# Cloud Run expects app to listen on port 8080
EXPOSE 8080

# Start the app
CMD ["pnpm", "start"]
