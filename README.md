
# Node MySQL Workshop

This repository provides resources for learning how to connect a database to an backend application.

The application is designed with dependency injection in mind. As a result, you can find the application's dependencies injected into the router in `src/app.ts`


## Installation

Ensure that npm and node are installed on your local machine. If they are not, please install them first.


Once `npm` and `node` are installed, go install libraries for this project.

```bash
   npm install
```

Try start with below command

```bash
   npm run dev
```

**NOTE:** If you would like to specific a HOST and PORT, you can just create `.env` file and copy content in `.env.example` to the file and configure your desire values.

Example:

```bash
   cp .env.example .env
```

Use your prefer editor to edit the file, for me it's definitely VIM.

```bash
   vim .env

    \\ Content in .env 
      HOST=0.0.0.0
      PORT=3001
    \\
```

Once you have finished, go run this command
```bash
   export $(cat .env)
```

Then run `npm run dev` again


## Tech Stack

**Server:** Node, Express, Typescript


