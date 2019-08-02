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

router.get("/:id", (req, res) => {});

router.delete("/:id", (req, res) => {});

router.put("/:id", (req, res) => {});

// custom middleware

function validatePostId(req, res, next) {}

module.exports = router;
