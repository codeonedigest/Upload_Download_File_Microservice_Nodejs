const fileconfig = require('./fileconfig');
const util = require("util");
const multer  =   require('multer');
const maxSize = 2 * 1024 * 1024;
//const uploadlocation = "./uploads";


let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("Creating disk storage...");
      cb(null,  fileconfig.filelocation);
    },
    filename: (req, file, cb) => {
      console.log("File name - " + file.originalname);
      cb(null, file.originalname);
    },
  });


  let uploadFile = multer({
    storage: storage,
    limits: { fileSize: maxSize }
  }).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;