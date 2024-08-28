const {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} = require("class-validator");

class CreateStudentDto {
  @IsNotEmpty()
  @IsString()
  name;

  @IsNotEmpty()
  @IsString()
  email;

  @IsNotEmpty()
  @IsNumber()
  @Min(18)
  age;
}
module.exports = CreateStudentDto;
