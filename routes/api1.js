`use strict`

const express = require(`express`);
const equationController = require(`../controllers/equationController`);
const router = express.Router();

router.get(`/quadratic`, equationController.quadraticEquation);
router.get(`/cubic`, equationController.cubicEquation);
router.get(`/quartic`, equationController.quarticEquation);
router.get(`/vectors-space`, equationController.vectorsSpace);

module.exports = router;