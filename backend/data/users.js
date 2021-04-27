import bcrypt from "bcryptjs";

const users = [
  {
    name: "Yves Loeys",
    email: "yves.loeys@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Fathia Muridi",
    email: "fathia.muridi@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Jane Doe",
    email: "jane.doe@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
