FROM node:22-alpine AS base

ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production
ENV PORT 3000

WORKDIR /app

COPY . .
RUN yarn --frozen-lockfile
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
