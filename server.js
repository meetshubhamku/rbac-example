const express = require("express");
const AccessControl = require("accesscontrol");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// List to be fetched from database
// Role, Resource and Action all are mandatory fields
const AccessList = [
  { role: "user", resource: "video", action: "create:own" },
  { role: "user", resource: "video", action: "read:any" },
  { role: "user", resource: "video", action: "update:own" },
  { role: "user", resource: "video", action: "delete:own" },
  { role: "admin", resource: "video", action: "create:any" },
  { role: "admin", resource: "video", action: "read:any" },
  { role: "admin", resource: "video", action: "update:any" },
  { role: "admin", resource: "video", action: "delete:any" },
];

const ac = new AccessControl(AccessList);

app.get("/readall", function (req, res, next) {
  // req.user.role="user"
  const permission = ac.can("user").readAny("video");
  if (permission.granted) {
    console.log("Access Granted");
    res.status(200).send("Access Granted").end();
  } else {
    res.status(403).send("Access Denied").end();
  }
});
app.get("/readown", function (req, res, next) {
  // req.user.role="user"
  const permission = ac.can("user").readOwn("video");
  if (permission.granted) {
    console.log("Access Granted");
    res.status(200).send("Access Granted").end();
  } else {
    res.status(403).send("Access Denied").end();
  }
});
app.get("/delete", function (req, res, next) {
  // req.user.role="user"
  const permission = ac.can("admin").deleteAny("video");
  if (permission.granted) {
    res.status(200).send("Access Granted").end();
  } else {
    res.status(403).send("Access Denied").end();
  }
});
