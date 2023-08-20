FROM node:16

# Create env variables
ENV DATABASE_URL=postgres://postgres:dsvRJiVC1UzsPLPZ@db.qpzduuvakgdqmexnbsgz.supabase.co:6543/postgres
ENV SUPABASE_URL=https://db.qpzduuvakgdqmexnbsgz.supabase.co
ENV SUPABASE_KEY=dsvRJiVC1UzsPLPZ

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
