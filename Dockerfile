FROM node:20.10.0 as base
WORKDIR /app

FROM node:20.10.0 as builder
RUN mkdir -p /app
WORKDIR /app
COPY package.json package-lock.json ./

RUN npm install --omit=optional && npm cache clean --force

COPY . .
ENV NODE_ENV=production

RUN npm run compile && rm -rf src node_modules tsconfig.json  *.d.ts

FROM base as final

ENV NODE_ENV=production
COPY --from=builder /app/package.json ./

RUN npm install --omit=dev && npm cache clean --force

COPY --from=builder /app ./

CMD ["npm", "run", "start"]
