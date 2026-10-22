# https://fintlabs.medium.com/optimized-multi-stage-docker-builds-with-turborepo-and-pnpm-for-nodejs-microservices-in-a-monorepo-c686fdcf051f

# Base Alpine image
FROM node:24-alpine AS alpine
RUN apk add --no-cache libc6-compat

# Setup yarn (pinned by .yarnrc.yml yarnPath) and turbo (1.x reads turbo.json's
# `pipeline`)
FROM alpine AS base
RUN corepack enable \
    && npm install -g turbo@1.12.5

# Prune projects to isolate subworkspace
FROM base AS pruner
WORKDIR /app
COPY . .
RUN turbo prune --scope=@inter-club-league/server --docker

# Build stage
FROM base AS builder

WORKDIR /app

# Copy only lockfile, yarn release and pruned workspace manifests first
COPY --from=pruner /app/out/json/ .

# Install dependencies (layer cached by Docker if lockfile unchanged)
RUN yarn install --immutable

# Copy full source for the isolated workspace
COPY --from=pruner /app/out/full/ .

# Turbo codegen and build
RUN turbo run build --filter=@inter-club-league/server

# Runner stage
FROM alpine AS runner
RUN addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nodejs
USER nodejs

WORKDIR /app
COPY --from=builder --chown=nodejs:nodejs /app .

# The server reads database/ and src/generated/schema.graphql relative to here
WORKDIR /app/apps/server

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Port comes from @inter-club-league/config
EXPOSE 8080

CMD ["node", "dist/index.mjs"]
