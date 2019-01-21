# Use an official Python runtime as a parent image
FROM node:10-slim

# Set the working directory to /app
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY ./ /app

# Install any needed packages for server.js
WORKDIR /app/server
RUN npm install

# install packages for node client server
WORKDIR /app/app
RUN npm install

WORKDIR /app
# Make port 80 available to the world outside this container
EXPOSE 3000
EXPOSE 8000
# Define environment variable
ENV NAME World

# start client and server here

# CMD ["/bin/bash", "-c","(cd app;npm start; echo Client server Has Closed) & (cd server; npm start;echo Dev Server Has Closed) &"]

WORKDIR /app/app
CMD ["/bin/bash", "-c","npm start"]

















#CMD ["dockerrun.sh"]
# Run app.py when the container launches
#CMD ["(cd","app",";","npm","start",";","echo","Client server Has Closed",")","&","(","cd","server",";","npm","start",";","echo","Dev Server Has Closed",")","&"]
# CMD ["(cd app;npm start; echo Client server Has Closed) & (cd server; npm start;echo Dev Server Has Closed) &"]
# run command
# docker run -p 3000:3000 -p 8000:8000 -p 27017:27017 --rm --name hackerschedule-running hack_your_schedule_image:v0.0.1