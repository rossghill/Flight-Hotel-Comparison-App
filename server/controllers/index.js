const express           = require('express');
const router            = new express.Router();
const searchPageRouter  = require('./searchPageRouter');
const favouritesRouter  = require('./favouritesRouter');
const path              = require('path');
const AmadeusAPI        = require("./../api/AmadeusAPI");

router.use("/", searchPageRouter);

// router.get("/", function(req, res){
//
//
// });


module.exports = router;
