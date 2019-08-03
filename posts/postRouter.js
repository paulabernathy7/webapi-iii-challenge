const express = require("express");
DB = require("./postDb");

const router = express.Router();

router.get("/", (req, res) => {
  DB.get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({
        err: "The post information cannot be retrueved",
        message: err.message
      });
    });
});

router.get("/:id", validatePostId, (req, res) => {
  res.status(200).json(req.post);
  //   console.log(req.post);
});

router.delete("/:id", (req, res) => {});

router.put("/:id", (req, res) => {});

// custom middleware

async function validatePostId(req, res, next) {
  try {
    const { id } = req.params;
    const post = await DB.getById(id);
    if (post) {
      req.post = post;
      next();
    } else {
      next({
        status: 404,
        message: "The post with the specified ID does not exist."
      });
    }
  } catch {
    next({
      status: 500,
      message: "The post information could not be retrieved."
    });
  }
}

module.exports = router;
