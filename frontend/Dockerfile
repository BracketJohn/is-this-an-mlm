FROM node:14-alpine AS dependency-base

# Create app directory
RUN mkdir /app
WORKDIR /app

# Install dependencies
COPY package.json .
COPY package-lock.json .
RUN npm ci

FROM dependency-base AS production-raw

# Configure nuxt environment
ENV NODE_ENV production
ENV NUXT_HOST 0.0.0.0
ENV NUXT_PORT 3000

# Configure other environment settings
ARG GOOGLE_ID
ENV GOOGLE_ID=${GOOGLE_ID}

FROM production-raw AS production

# Copy over app content, build
COPY . .
RUN npm run generate

CMD ["npm", "run", "start"]
