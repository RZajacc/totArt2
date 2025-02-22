# Totart

### Version information:

Previous version of the project that you might find in my repository differs significantly from this one. Starting with being built with React + Vite, and styled Bootstrap. I kept it just as reminder of the work I did before, to appreciate the the progress I've made, but nevertheles this version of the project is considered as main one. If you would still like to take a look at previous version you'll find it [here](https://github.com/RZajacc/totArt).

### Description:

Project is made for users the users to share some interesting locations around Berlin. It is not about the fancy places that everyone knows, quite the contrary, more about small things that draws our attention and we find cool. Small things that get forgotten few minutes after they are being seen but we think desire some attention. The name refers to the tip of The Tongue phenomenon, where a person fails to retrieve some word or term from memory, combined with partial recall and feeling that retrieval is imminent. Here it refers to those places and this app aims to adress this issue and keep the memory alive.

> [!NOTE]
> Before you start using the application check README files in corresponding sections of the app (client and server).

### Tech Stack

> [!IMPORTANT]
> The application is made to run both with docker, and locally. In both cases you need to add .env files to client and server app, so please take a look into corresponding README files inside client and server app. If you have this one ready, then simply run the application with:
> `docker-compose up`

- **Client** side of the application is built with Next.js (App router), Typescript, and styled with TailwindCSS. For data fetching I'm using SWR library. For routes protection I decided for middleware based authentication. JWT token sent from the backend is stored as a cookie in a browser, and middleware checks users status with each request. Currently Im adding tests to the application using Jest.
- **Server** side is built with Node.js with Typescript (ts-node as runner), Express.js and MongoDB. User is authenticated with the use JWT tokens.

> [!NOTE]
> Main goal of the project is to learn, so any tips are welcome!
