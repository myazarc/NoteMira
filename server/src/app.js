const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);

const configs = require("./config");

const store = new KnexSessionStore();

const app = express();
app.use(morgan("combined"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(
  session({
    secret: configs.session.secret,
    resave: false,
    saveUninitialized: true,
    store: store
  })
);
app.use(cors({ origin: configs.cors, credentials: true }));

const apiRoute = require("./routes/api");

app.use(express.static(path.join(__dirname, "../../client/dist/")));
app.use("/api/", apiRoute);

app.use((req, res) => {
  res.sendfile(path.join(__dirname, "../../client/dist/index.html"));
});

app.listen(process.env.PORT || configs.port);
