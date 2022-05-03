const express = require("express");
const app = express();
const https = require("https");
const fs = require("fs");

const port = 3000;

app.use(requireHTTPS);

https.createServer({
    key: fs.readFileSync("/etc/ssl/private/cloudflare_prvkey_lsacbucuresti.ro.pem"),
    cert: fs.readFileSync("/etc/ssl/certs/cloudflare_lsacbucuresti.ro.pem")}, app)
  .listen(port, function () {	
      console.log(`[server.js] Server running fine on ${port}!`);
})

function requireHTTPS(req, res, next) {
  if (!req.secure) {
    return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
}

app.enable('trust proxy');

app.use(function(req, res, next) {
  if (req.secure){
      return next();
  }
  res.redirect("https://" + req.headers.host + req.url);
});

app.get("/", (req, res) => {
	res.send("Hello World!");
})
