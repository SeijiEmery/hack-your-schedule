cd appnpm install
WORKDIR /app/app
RUN npm install

(cd app;npm start; echo Client server Has Closed) & (cd server; npm start;echo Dev Server Has Closed) &