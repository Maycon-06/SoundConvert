const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();

app.use(express.static("public"));
app.use("/outputs", express.static("outputs"));

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

app.post("/convert", upload.array("audios"), (req, res) => {

  console.log("Arquivos recebidos:");

  req.files.forEach(file => {
    console.log(file.originalname);
  });

  res.json({
    message: "Upload realizado com sucesso"
  });

});

app.listen(3000, () => {
  console.log("Servidor iniciado em http://localhost:3000");
});