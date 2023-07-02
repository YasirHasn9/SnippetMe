# Data Flow

- Controller
  - Client makes a request from the controller
  - Controller has a direct relationship with the client request
- Middleware
  - Request goes through middleware
  - Validate the request
  - Check
    - If a healthy request then move to services(next middleware)
    - If a bad request then send error to the controller and end the process
- Services
  - Receives the request
  - Call the model
  - Wait for model for response
  - Send back the response to the controller
- Models
  - Receives the request from the service
  - Save the model into the db
  - Receive a response from the db
  - Send back the response to the service

To run the project, pnpm

```shell
pnpm install
```

If you don't have pnpm installed on your system then you can install it using brew.

- remember before you install it, you need to update and upgrade your brew packages.

```shell
brew update
.
.
brew upgrade
```

and then run

```shell
pnpm dev
```

you need to on node version 16, to see what version you have run the terminal

```shell
node -version
```

If you want to change the node version look at [How to Change Node.js Version Between Projects Using NVM](https://betterprogramming.pub/how-to-change-node-js-version-between-projects-using-nvm-3ad2416bda7e)

https://www.youtube.com/watch?v=rOh-OgKL48o

Side project setup

1. Pnpm as a package manager
2. Typescript for type checking. But honestly, the only reason I use it is because it provides self-documentation to my code, and I wanna be good at it, so I'm im gonna abuse it.
3. Config lib to configure environment variables which in return makes me use Dotenv to store configuration variables in a .env file to save/manage sensitive data
4. Chalk @4.1.2 to format and style the terminal output with colors (Improved and emphasize information)
5. Nodemon for restarting the application whenever changes are made in the source code. It makes development faster.
6. Eslint for diagnosing code errors, enforces coding style conventions and helps maintain code quality
7. Husky for providing a Git hook. I set up a pre-commit hook that triggers the TypeScript linter to check my code style.
   Note: Never used it in production, nor have I used it before
8. Finally, use Mongoose to connect to the database(MongoDB). I'm using Mongoose because I'm pretty sure I'm gonna make many changes to my models, so I believe it's better to use Mongoose because it's flexible and cheaper. Also, one of the goals of this project is to migrate to a different database(SQL) at the end of it.

read
https://www.chrisdpadilla.com/mvcinaspdotnet
[asp.net tutorial](https://www.youtube.com/watch?v=yQrl9tYon_Q&list=PLB2pNkhw8PWWJdXXjdMg3KSYg-oKMYTBj&index=3)
[curious mind] (https://dimosr.github.io/shared-nothing-architectures/)

[C# ](https://www.youtube.com/watch?v=BgwbcCXDwsk&list=PLsV97AQt78NT0H8J71qe7edwRpAirfqOI&index=17)

[onion architecture ](https://code-maze.com/onion-architecture-in-aspnetcore/)
[asp.net](https://www.youtube.com/watch?v=PmDJIooZjBE&t=896s)
[unit test](https://www.youtube.com/watch?v=aq3IbO0RwAQ&list=PL82C6-O4XrHeyeJcI5xrywgpfbrqdkQd4)
[asp.net](https://www.youtube.com/watch?v=sdlt3-ptt9g&list=PLUOequmGnXxOgmSDWU7Tl6iQTsOtyjtwU)
[restapi](https://www.youtube.com/watch?v=72_5_YuDCNA)

### the cycle life of ts

- Design time
  - when you start to write code
- Complier Time
  - Code goes through a compiler
  - The compiler analyze the code
  - Then the compiler covert ts js
- Run time
  - the code gets executed on a browser or a command line interface like node of deno

Ts is a superset of JavaScript, which means that everything js can do, ts can also do

```ts
// To create a relationship between a User/Parent and Something/Child, on Child model we have to add a reference to its Parent:

const ChildSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: “User/Parent” },
    ....
  },
);
```

Blockers I ran into

1. the version of pnpm I use was wrong

- so I learned how to use different versions of pnpm for different projects

2. Database connection error because IP isn't whitelisted

- if I wrote better error message, I would have found faster and easier.
- The lesson here is next time I write better error message and not being lazy about it.
- the good thing, I learned how to whitelist IP addresses.

## Todo:

- [ ] validate duplicate data
- [x] hash password
- [x] Whitelist IP addresses
- [ ] cover test cases
- [ ] Remove the password once you send the user.
- [ ] come back here if you remember something that needs to be here
