const users = [];
let nextId = 1;

function registerUser(name, email) {
  const user = {
    id: nextId++,
    name,
    email,
    createdAt: new Date().toISOString()
  };
  users.push(user);
  return user;
}

function listUsers() {
  return users;
}

module.exports = { registerUser, listUsers };
