FROM node:20-alpine
# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app

# Install any needed packages
RUN npm install

# Make port 3000 available to the world outside this container
EXPOSE 3001

# Define environment variable
ENV VITE_URL=http://localhost:3000

# Run the app when the container launches
CMD ["npm", "run", "dev", "--", "--host", "--port", "3001"]