const users = [
  {
    id: "1",
    username: "אוגדה36",
    password: "12345",
    isAdmin: false,
    unitAccess: ["36"],
  },
  {
    id: "2",
    username: "אוגדה162",
    password: "12345",
    isAdmin: false,
    unitAccess: ["162"],
  },
  {
    id: "3",
    username: "אוגדה98",
    password: "12345",
    isAdmin: false,
    unitAccess: ["98"],
  },
  {
    id: "4",
    username: "david",
    password: "david123",
    isAdmin: true,
    unitAccess: ["36", "98", "777"],
  },
];

module.exports = {
  users,
};
