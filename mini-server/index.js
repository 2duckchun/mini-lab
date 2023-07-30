const express = require("express");
const { v4 } = require("uuid");
const app = express();

let visitor = 0;

app.get("/redirect", (req, res) => {
  res.redirect(302, "/to-location");
});

app.get("/to-location", (req, res) => {
  res.send("<h1>하이롱</h1>");
});

app.get("/user-count", (req, res) => {
  console.log(req.ip);
  const cookie = req.get("cookie") || "";
  const guidStr =
    cookie.split(";").find((str) => {
      return str.includes("guid=");
    }) || "";
  let guid = guidStr.split("=")[1];
  if (guidStr) {
    return res.send(`
    <h1>당신은 여기에 들어오신 적이 있습니다.</h1>
    <h2>${guid}</h2>
    <h3>방문자수 ${visitor} </h3>
    `);
  }
  visitor++;
  guid = v4();
  res.set("set-cookie", `guid=${guid}`);
  res.send(`
  <h1>guid가 할당되었습니다.</h1>
  <h2>${guid}</h2>
  <h3>방문자수: ${visitor} </h3>`);
});

app.get("/set", (req, res) => {
  res.cookie("name", "2dc");
  res.cookie("hello", "myworld");
  res.send("<h1>Cookie has been set </h1>");
});

app.get("/cache", (req, res) => {
  res.set("Cache-control", "max-age=120");
  setTimeout(() => {
    res.send("<h1>Cached Page</h1>");
  }, 5000);
});

app.get("/", (req, res) => {
  res.send(`
        <h1>Welcome ${req.get("cookie")}</h1>
    `);
});

app.options("/cors", (req, res) => {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Credentials"
  );
});

app.get("/cors", (req, res) => {
  res.send("<h1>받았다.</h1>");
});

app.listen(3000);
