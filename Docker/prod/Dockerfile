FROM node:22-alpine AS base
LABEL org.opencontainers.image.source https://github.com/jobstoryai/frontend

ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production
ENV PORT 3000

WORKDIR /app

RUN corepack enable && corepack prepare yarn@4.5.0 --activate
COPY . .
RUN yarn --frozen-lockfile
RUN yarn build -- --no-lint

EXPOSE 3000

CMD ["yarn", "start"]
