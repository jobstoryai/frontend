FROM node:22-alpine
LABEL org.opencontainers.image.source https://github.com/jobstoryai/frontend

ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production
ENV PORT 3000

WORKDIR /app

COPY . .
RUN npm ci
EXPOSE 3000

CMD ["./entrypoint.sh"]
