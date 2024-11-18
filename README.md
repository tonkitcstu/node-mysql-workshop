
# Node MySQL Workshop

This repository provides resources for learning how to connect a database to an backend application.

The application is designed with dependency injection in mind. As a result, you can find the application's dependencies injected into the router in `src/app.ts`




## Installation & Run Without MySQL Connection

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
## Approach #1: Running MySQL in the same docker container as the Node.js Web server

**NOTE**: If you want to run & test this approch go ahead to this [run approach #1](https://github.com/tonkitcstu/node-mysql-workshop#run-approach-1) and skip section below.

### Let's talk

Personally, I'd like to call this approach "**a shameful sin**" (Lord please forgive for what I have done). However, it worth exploring why you should not do it at all.

Typically, when running Docker container, you should think of each container as handling a single process. This means a container should host either a webserver or a database, but not both within the same container.

Theoretically, you can do it if you want to, but at least please stop for once and think you should do it or not?

Okay, I'm going to stop whining now. Let's take a look how this can be done.

First, you will need a base container that mimic an operating system, allow you to set up required software stack without much effort.

For me, I picked Debian Docker image for my base container.

You can found it in this link: https://hub.docker.com/_/debian

### Run approach #1

Ensure you are in root of project directory.

For example, when your output from `ls` command should look similar to below.

```bash
Dockerfile  docker-compose-approach  package.json    src
README.md   node_modules             scripts         tsconfig.json
package-lock.json        shame-approach
```

Now build a Docker image with this command:

```bash
    docker build -f shame-approach/Dockerfile -t node-mysql-shame:test .
```

Because MySQL database is installed inside a container, I have no choice but to set up a default password to the database which is `12345`


That's why we will need to create `.env` file with the following variables:
```bash
HOST=0.0.0.0
PORT=3000
DATABASE_HOST=0.0.0.0
DATABASE_PORT=3306 
DATABASE_USER=root
DATABASE_PASSWORD=12345
DATABASE_NAME=my_database
```

Now we have `node-mysql-shame:test` image (To verify, run `docker images | grep node-mysql-shame:test`) and `.env` file, we are ready to run a container.

To start a container, run this command:

```bash
docker run -p 3307:3306 -p 3000:3000 --env-file=.env --name=node-mysql  node-mysql-shame:test
```

**NOTE**: Notice that I map a container port "3306" to the local machine port "3307". The reason is the default port of MySQL is 3306 and to avoid conflicts with existing MySQL database running on your machine.

To test APIs of the server, try run:

```bash
curl localhost:3000/users
```

The result should be the same as follow:
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "age": 35
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "email": "jane.smith@example.com",
    "age": 28
  }
]
```

Or try this `curl`

```bash
curl localhost:3000/users/1
```

The result should be the same as follow:
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john.doe@example.com",
    "age": 35
  }
]
```

## Tech Stack

**Server:** Node, Express, Typescript

