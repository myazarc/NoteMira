module.exports = {
  session: {
    secret: "you secret code"
  },

  cors: "http://127.0.0.1:8080",

  port: 8081,

  db: {
    dialect: "mysql",
    host: "localhost",
    database: "notes",
    user: "root",
    password: "12345"
  }
};
