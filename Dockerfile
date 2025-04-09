# Stage 1: Install dependencies and build the project
FROM node:22.12.0-alpine AS builder

# Install pnpm globally via npm (instead of Corepack)
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the application files
COPY . .

# Build the Next.js project
RUN pnpm build

# Install only production dependencies
RUN pnpm install --frozen-lockfile --prod --ignore-scripts

# Stage 2: Create optimized production image
FROM node:22.12.0-alpine AS runner

# Install pnpm globally
RUN npm install -g pnpm

# Set environment variables
ENV NODE_ENV=production
ENV PORT=80

# Set working directory
WORKDIR /app

# Copy necessary files from the builder stage
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Expose the port for GCP Cloud Run
EXPOSE 80

# Start the application
CMD ["pnpm", "start"]
