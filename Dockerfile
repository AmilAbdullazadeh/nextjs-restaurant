FROM node:16

# Create env variables
ENV DATABASE_URL=""
ENV SUPABASE_URL=""
ENV SUPABASE_KEY=""

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

# Expose port
EXPOSE 3000

# Run app
CMD [ "npm", "start" ]
