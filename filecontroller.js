const uploadFile = require("./fileupload");
const fileconfig = require('./fileconfig');
const fs = require('fs');

exports.upload = async (req, res) => {
  try {
    console.log("Uploading file ... ");
    await uploadFile(req, res);
    if (req.file == undefined) {
      return res.status(400).send({ message: "Upload a file please!" });
    }    
    res.status(200).send({
      message: "The following file was uploaded successfully: " + req.file.originalname,
    });
  } catch (err) {  
    res.status(500).send({
      message: `Unable to upload the file: ${req.file.fieldname}. ${err}`,
    });
  }
};
 
exports.getListFiles = async (req, res) => {
  const directoryPath = __basedir + "\\" + fileconfig.filelocation;
  console.log("List all the files in directory - " + directoryPath);
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "There was an issue in scanning the files!",
      });
    }
    console.log("Total files available are - " + files);
    let fileInfos = [];
    files.forEach((file) => {
      console.log("Adding file fileInfo Array - " + file);
      fileInfos.push({
        name: file,
        url: __basedir + "\\" + file,
      });
    });
    res.status(200).send(fileInfos);
  });
};

exports.download = async (req, res) => {
  const fileName = req.params.name;  // define uploads folder path
  const directoryPath = fileconfig.filelocation;
  res.download(directoryPath + "\\" + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "There was an issue in downloading the file. " + err,
      });
    }
  });
};

 
