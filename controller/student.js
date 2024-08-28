const studentdata = require("../models/studentdata");
const mongoose = require("mongoose");

const successMessage = require("../libs/responseMessage/success");
const errorMessage = require("../libs/responseMessage/error");
const { validate } = require("class-validator");
const { plainToClass } = require("class-transformer");
const CreateStudentDto = require("../libs/dtos/studentDto/createStudent.dto");

const createStudent = async (req, res) => {
  try {
    const createStudentDto = plainToClass(CreateStudentDto, req.body);
    const errors = await validate(createStudentDto);

    if (errors.length > 0) {
      return errorMessage(res, errors, 400);
    }
    const { id, name, age, email } = req.body;
    const findStudentId = await studentdata.findOne({ where: { id: id } });

    const findStudent = await studentdata.findOne({ where: { name: name } });
    const findStudentEmail = await studentdata.findOne({
      where: { email: email },
    });
    if (findStudentId) {
      return errorMessage(res, "student id already exists", 404);
    }
    if (findStudent) {
      return errorMessage(res, "student name already exists", 404);
    }
    if (findStudentEmail) {
      return errorMessage(res, "student email already exists", 404);
    }
    const createStudent = await studentdata.create({
      name: name,
      age: age,
      email: email,
    });
    console.log(createStudent);
    // await Student.save(createStudent);
    return successMessage(res, "student created successfully", createStudent);
  } catch (error) {
    return errorMessage(res, error.message);
  }
};
const getStudent = async (req, res) => {
  try {
    const students = await studentdata.find();
    successMessage(res, "student fetched successfully", students);
  } catch (error) {
    return errorMessage(res, error.message);
  }
};
const deleteStudent = async (req, res) => {
  try {
    const { _id } = req.params;
    console.log("id", _id);
    const students = await studentdata.findOne({ _id: _id });
    console.log(students);

    if (!student) {
      return errorMessage(res, "student not found", 404);
    }
    await studentdata.findByIdAndDelete(_id);
    successMessage(res, `student deleted successfully`, 200);
  } catch (error) {
    return errorMessage(res, error.message);
  }
};
const getSingleStudent = async (req, res) => {
  try {
    const { _id } = req.params;
    console.log("id is", _id);

    const student = await studentdata.findOne({ _id: _id });
    console.log("student is", student);

    if (!student) {
      return errorMessage(res, "student not found", 404);
    }

    return successMessage(res, `student found`, student);
  } catch (error) {
    return errorMessage(res, error.message);
  }
};
module.exports = { createStudent, getStudent, deleteStudent, getSingleStudent };
