# Step 1: Use the official Node.js image as the base
FROM node:21

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json to the container
COPY package*.json ./

# Step 4: Install the dependencies
RUN npm install

# Step 5: Copy the rest of the application files into the container
COPY . .

# Step 6: Expose the port that the app will run on
EXPOSE 3001

# Step 7: Command to run the application
CMD ["npm", "start"]
