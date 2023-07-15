const express = require('express');

const router = express.Router();

const filecontroller = require('./filecontroller');

router.post('/upload', filecontroller.upload);
router.get("/files", filecontroller.getListFiles);
router.get("/files/:name", filecontroller.download);
 

module.exports = router;