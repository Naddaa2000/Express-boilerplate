const express = require("express");
const router = express.Router();
const Students = require("../controller/student");
router.get("/getAll", Students.getStudent);
router.get("/getSingle/:_id", Students.getSingleStudent);
router.post("/create", Students.createStudent);
router.delete("/delete/:_id", Students.deleteStudent);

module.exports = router;
