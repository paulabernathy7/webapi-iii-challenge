const express = require("express");
const postRouter = require("./posts/postRouter");
const userRouter = require("./users/userRouter");
const helmet = require("helmet"); //yarn added helmet for better security
const morgan = require("morgan"); // added morgan
const server = express();

server.use(express.json());

server.use(morgan("dev"));
server.use("/api/users", userRouter);
server.use("/api/posts", postRouter);
server.use(helmet());
server.use(logger);

server.get("/", (req, res, next) => {
  res.send(`<h2>Let's write some middleware!</h2>`);

  next();
});

//custom middleware

function logger(req, res, next) {
  const date = new Date();
  const method = req.method;
  const url = req.url;
  console.log(`${date}, ${method}, ${url} it works!`);
  next();
}

module.exports = server;
