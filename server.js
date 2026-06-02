const express = require("express");
const multer = require("multer");
const ffmpeg = require("fluent-ffmpeg");
const path = require("path");

const app = express();

app.use(express.static("public"));
app.use("/outputs", express.static("outputs"));

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/convert", upload.array("audios"), (req, res) => {
  const format = req.body.format;

  const convertedFiles = [];

  let completed = 0;

  req.files.forEach((file) => {
    const outputName = path.parse(file.filename).name + "." + format;

    const outputPath = "outputs/" + outputName;

    ffmpeg(file.path)
      .audioFrequency(48000)

      .toFormat(format)

      .save(outputPath)

      .on("end", () => {
        convertedFiles.push("/" + outputPath);

        completed++;

        if (completed === req.files.length) {
          res.json({
            files: convertedFiles,
          });
        }
      })

      .on("error", (err) => {
        console.error(err);
      });
  });
});

const PORT = 7000;

app.listen(PORT, () => {

  console.log(`Servidor iniciado em http://localhost:${PORT}`);

});