const { Router } = require('express');
const getTypesHandler = require("../handlers/GetTypesHanldler")
const router = Router();

router.get("/", getTypesHandler)





module.exports = router;
