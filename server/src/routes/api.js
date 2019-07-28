const express = require("express");
const router = express.Router();

const models = require("./../model");

const Output = require("./../helper/output");

router.use((req, res, next) => {
  console.log(req.path);
  if (req.path != "/login") {
    if (!req.session.user) {
      res.sendStatus(401);
    } else {
      next();
    }
  } else {
    next();
  }
});

router.get("/userlogin", async (req, res) => {
  const output = new Output();

  output.setData(req.session.user);

  res.send(output.getResponse());
});

router.post("/login", async (req, res) => {
  const output = new Output();

  const dataRows = await models.login(req.body.username, req.body.userpass);
  if (dataRows.length) {
    const data = dataRows[0];
    const response = {
      isLogin: true,
      ...data
    };
    const department = await models.getDepartment(data.DEPARTMENTID);
    if (department.length) {
      response.DEPARTMENTNAME = department[0].DEPARTMENTNAME;
    }
    req.session.user = response;

    output.setData(response);
  }

  res.send(output.getResponse());
});

//#region main

router.get("/allgroups", async (req, res) => {
  const output = new Output();

  const response = await models.getMains();
  if (response) {
    const allPromise = [];
    response.forEach(async (item, index) => {
      allPromise.push(
        new Promise((resolve, reject) => {
          models
            .getSeconds(item.ID)
            .then(res => {
              response[index].child = res;
              resolve(res);
            })
            .catch(reject);
        })
      );
    });
    const res2 = await Promise.all(allPromise);
    output.setData(response);
  } else {
    output.setError();
  }

  res.send(output.getResponse());
});

router.get("/main", async (req, res) => {
  const output = new Output();

  const response = await models.getMains();
  if (response) {
    output.setData(response);
  } else {
    output.setError();
  }

  res.send(output.getResponse());
});

router.get("/main/:id", async (req, res) => {
  const output = new Output();
  const id = req.params.id;
  const response = await models.getMains(id);
  if (response) {
    output.setData(response);
  } else {
    output.setError();
  }
  res.send(output.getResponse());
});

router.post("/main", async (req, res) => {
  const output = new Output();
  const id = req.body.ID || 0;
  delete req.body.ID;
  const response = await models.saveMains(req.body, id);
  if (response) {
    output.setData(response);
  } else {
    output.setError();
  }

  res.send(output.getResponse());
});

router.delete("/main/:id", async (req, res) => {
  const output = new Output();
  const id = req.params.id;
  const response = await models.deleteTable("maingroups", id);
  if (response) {
    output.setData(response);
  } else {
    output.setError();
  }
  res.send(output.getResponse());
});

router.get("/second", async (req, res) => {
  const output = new Output();

  const response = await models.getSeconds();
  if (response) {
    output.setData(response);
  } else {
    output.setError();
  }

  res.send(output.getResponse());
});

router.get("/second/:id", async (req, res) => {
  const output = new Output();

  const id = req.params.id;
  const response = await models.getSeconds(id);
  if (response) {
    output.setData(response);
  } else {
    output.setError();
  }

  res.send(output.getResponse());
});

router.post("/second", async (req, res) => {
  const output = new Output();
  const id = req.body.ID || 0;
  delete req.body.ID;
  const response = await models.saveSeconds(req.body, id);
  if (response) {
    output.setData(response);
  } else {
    output.setError();
  }

  res.send(output.getResponse());
});

router.delete("/second/:id", async (req, res) => {
  const output = new Output();
  const id = req.params.id;
  const response = await models.deleteTable("secondgroups", id);
  if (response) {
    output.setData(response);
  } else {
    output.setError();
  }
  res.send(output.getResponse());
});
//#endregion

//#region department
router.get("/department", async (req, res) => {
  const output = new Output();

  const response = await models.getDepartment();
  if (response) {
    output.setData(response);
  } else {
    output.setError();
  }

  res.send(output.getResponse());
});

router.get("/department/:id", async (req, res) => {
  const output = new Output();
  const id = req.params.id;
  const response = await models.getDepartment(id);
  if (response) {
    output.setData(response);
  } else {
    output.setError();
  }
  res.send(output.getResponse());
});

router.delete("/department/:id", async (req, res) => {
  const output = new Output();
  const id = req.params.id;
  const response = await models.deleteTable("departments", id);
  if (response) {
    output.setData(response);
  } else {
    output.setError();
  }
  res.send(output.getResponse());
});

router.post("/department", async (req, res) => {
  const output = new Output();
  const id = req.body.ID || 0;
  delete req.body.ID;
  const response = await models.saveDepartment(req.body, id);
  if (response) {
    output.setData(response);
  } else {
    output.setError();
  }

  res.send(output.getResponse());
});
//#endregion

//#region user
router.get("/user", async (req, res) => {
  const output = new Output();

  const response = await models.getUser();
  if (response) {
    output.setData(response);
  } else {
    output.setError();
  }

  res.send(output.getResponse());
});

router.get("/user/:id", async (req, res) => {
  const output = new Output();
  const id = req.params.id;
  const response = await models.getUser(id);
  if (response) {
    output.setData(response);
  } else {
    output.setError();
  }
  res.send(output.getResponse());
});

router.delete("/user/:id", async (req, res) => {
  const output = new Output();
  const id = req.params.id;
  const response = await models.deleteTable("users", id);
  if (response) {
    output.setData(response);
  } else {
    output.setError();
  }
  res.send(output.getResponse());
});

router.post("/user", async (req, res) => {
  const output = new Output();
  const id = req.body.ID || 0;
  delete req.body.ID;
  const response = await models.saveUser(req.body, id);
  if (response) {
    output.setData(response);
  } else {
    output.setError();
  }

  res.send(output.getResponse());
});
//#endregion

//#region note
router.get("/note", async (req, res) => {
  const output = new Output();

  const response = await models.getNote(null, req.session.user);
  if (response) {
    output.setData(response);
  } else {
    output.setError();
  }

  res.send(output.getResponse());
});

router.get("/note/:id", async (req, res) => {
  const output = new Output();
  const id = req.params.id;
  const response = await models.getNote(id, req.session.user);
  if (response) {
    output.setData(response);
  } else {
    output.setError();
  }
  res.send(output.getResponse());
});

router.delete("/note/:id", async (req, res) => {
  const output = new Output();
  const id = req.params.id;
  const response = await models.deleteTable("notes", id);
  if (response) {
    output.setData(response);
  } else {
    output.setError();
  }
  res.send(output.getResponse());
});

router.post("/note", async (req, res) => {
  const output = new Output();
  const id = req.body.ID || 0;
  delete req.body.ID;
  if (id == 0) {
    req.body.CREATETIME = parseInt(Date.now() / 1000);
  }
  req.body.USERID = req.session.user.ID;
  req.body.DEPARTMENTID = req.session.user.DEPARTMENTID;
  const response = await models.saveNote(req.body, id);
  if (response) {
    output.setData(response);
  } else {
    output.setError();
  }

  res.send(output.getResponse());
});
//#endregion

module.exports = router;
