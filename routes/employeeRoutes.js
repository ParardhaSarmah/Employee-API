const express = require("express");
const router = express.Router();
const employeeController = require("./../controllers/employeeController");
router.route("/bySeniority").get(employeeController.getBySeniority);
router.route("/all").get(employeeController.getAllEmployees);
router.route("/count").get(employeeController.getCount);
router.route("/promote/").get(employeeController.promoteSeniors);
router.route("/delete").delete(employeeController.deleteEmployee);
router.route("/add").post(employeeController.addEmployee);
router.route("/update/").patch(employeeController.updateAddressEmployee);
router.route("/deleteold").delete(employeeController.maintainTable);
router.route("/srdesupdate").patch(employeeController.getSrAndUpdateDes);
router.route("/deleteold").delete(employeeController.maintainTable);

module.exports = router;
