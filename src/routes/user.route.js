const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");

router.get("/",controller.get);
router.get("/register",controller.register);
router.post("/register",controller.create);
router.get("/edit/:id",controller.editForm);
router.post("/edit/:id",controller.update);
router.post("/delete/:id",controller.delete);

module.exports = router;
