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

router.delete("/:id", validatePostId, (req, res) => {
  const { id } = req.params;

  DB.remove(id)
    .then(post => {
      if (post) {
        res.status(200).json({ message: "The post was deleted" });
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The post could not be removed" });
    });
});

router.put("/:id", (req, res) => {
  console.log(req.params);
  const { id } = req.params;
  const { text } = req.body;

  if (!text) {
    res.status(400).json({ errorMessage: "Please provide changes to post." });
  } else {
    DB.update(id, req.body)
      .then(post => {
        if (post) {
          res.status(200).json(post);
        } else {
          res.status(404).json({
            message: "The post with the specified ID does not exist"
          });
        }
      })
      .catch(err => {
        res.status(500).json({
          errorMessage: "The post information count not be modified"
        });
      });
  }
});

// custom middleware
// tried async await and try catch
async function validatePostId(req, res, next) {
  try {
    const { id } = req.params;
    const post = await DB.getById(id);
    // console.log(req.params);
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
