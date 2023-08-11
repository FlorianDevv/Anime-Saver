# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages
RUN npm install

# Make port 3000 available to the world outside this container
EXPOSE 3000

ENV JWT_SECRET=secret_key

ENV DB_HOST=postgres
ENV DB_PORT='5432'
ENV DB_NAME=postgres
ENV DB_USER=postgres
ENV DB_PASS=mon-mot-de-passe

# Run the app when the container launches
CMD ["npm", "start"]