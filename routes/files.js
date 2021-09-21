const express = require("express");

const router = express.Router();

const {
    getPublicKey,
    getProjectId,
} = require("../controllers/files");

/**
 * @route GET api/publicKey
 * @description get Public Key
 */

router.get('/publicKey', getPublicKey);

/**
 * @route GET api/projectId
 * @description get Project Id
 */
 
router.get('/projectId', getProjectId);


module.exports = router;
