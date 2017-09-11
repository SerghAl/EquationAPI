`use strict`

const express = require(`express`);
const equationController = require(`../controllers/equationController`);
const router = express.Router();

router.get(`/quadratic`, equationController.quadraticEquation);
router.get(`/cubic`, equationController.cubicEquation);

module.exports = router;