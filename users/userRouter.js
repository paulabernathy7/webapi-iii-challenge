const express = require("express");
DB = require("./userDb");

const router = express.Router();

router.post("/", (req, res) => {});

router.post("/:id/posts", validateUserId, (req, res) => {});

router.get("/", (req, res) => {
  DB.get()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: "The user information cannot be retrieved" });
    });
});

router.get("/:id", validateUserId, async (req, res) => {
  try {
    const user = await DB.getById(req.params.id);

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id/posts", validateUserId, (req, res) => {});

router.delete("/:id", validateUserId, (req, res) => {});

router.put("/:id", validateUserId, (req, res) => {});

//custom middleware

async function validateUserId(req, res, next) {
  try {
    const { id } = req.params;
    const user = await DB.getById(id);

    if (user) {
      req.user = user;
      next();
    } else {
      res.status(400).json({ message: "invalid user id" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
}

function validateUser(req, res, next) {}

function validatePost(req, res, next) {}

module.exports = router;
