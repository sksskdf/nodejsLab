var nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "sksskdf@gmail.com",
    pass: "",
  },
});

var mailOptions = {
  from: "sksskdf@gmail.com",
  to: "sksskdfg@yahoo.com",
  subject: "Sending Email using Node.js",
  text: "That was easy!",
};

const http = require("http");

const port = 8080;
const hostname = "localhost";

const server = http.createServer((req, res) => {
  if (req.url === "/sendingEmail") {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } else {
    res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
    res.write('<form action="sendingEmail" method="post">');
    res.write('<input type="submit" value="메일보내기">');
    res.write("</form>");
    return res.end();
  }
});

server.listen(port, hostname);
