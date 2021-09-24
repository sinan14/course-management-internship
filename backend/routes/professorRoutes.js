const express = require("express");
const wrapAsync = require("../util/wrapAsync");
const router = express.Router();
const jwt = require("jsonwebtoken");
const empData = require("../model/employee");
const { verifyToken } = require("../middleware");

router.post(
  "/register",
  wrapAsync(async function (req, res) {
    console.log(req.body);
    const employee = new empData(req.body);
    console.log(employee);
    employee
      .save()
      .then(function (data) {
        res.send(true);
      })
      .catch(function (error) {
        console.log(error);
        res.send(false);
      });
  })
);
//******************************************************************* */
router.put(
  "/reset",
  wrapAsync(async (req, res) => {
    console.log(req.body);
    const { Email, Password } = req.body;
    const employee = await empData.findOneAndUpdate(Email, { Password });
    if (employee) {
      res.status(200).send({ status: true });
    } else {
      res.send({ status: false });
    }
  })
);
//************************************************************************* */

router.post(
  "/login",
  wrapAsync(async function (req, res) {
    console.log(req.body);
    // console.log(Email);
    const { Email, Password } = req.body;
    if (Email == "admin@ictak.com" && Password == "Admin@11") {
      req.session.role = "admin";
      // console.log("admin login success");
      const payload = { subject: Email, admin: true };
      const token = jwt.sign(payload, "secretKey", { expiresIn: "1h" });
      const Name = "Admin";
      res.send({ status: 200, token, Name, role: req.session.role });
    } else if (Email != "admin@ictak.com") {
      const foundUser = await empData.findOne({ Email, Password });

      if (foundUser) {
        const id = foundUser._id;
        const Name = foundUser.Name;
        console.log("an employee loginned");
        req.session.role = "employee";
        const payload = { subject: Email, admin: false };
        const token = jwt.sign(payload, "secretKey", { expiresIn: "1h" });
        res.send({ status: true, token, Name, id, role: req.session.role });
      } else {
        res.send(false);
      }
    } else {
      res.send(false);
    }
  })
);

//***************************    Getting all employee      *************************/

router.get(
  "",
  wrapAsync(async (req, res) => {
    const Employees = await empData.find();
    console.log(Employees);
    if (Employees) {
      res.send(Employees);
    } else {
      res.send(false);
    }
  })
);

//***************            employee fetching By Id      *****************************/

router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    const Employee = await empData.findById(req.params.id);
    // console.log(Employee)
    if (Employee) {
      return res.send(Employee);
    } else {
      return res.send(false);
    }
  })
);

//************************        profile update        ******************************/
router.put(
  "/:id",
  wrapAsync(async (req, res) => {
    const { id } = req.params;

    console.log(req.body);
    const Employee = await empData.findByIdAndUpdate(id, {
      ...req.body,
    });
    console.log(Employee);
    if (Employee) {
      return res.send(true);
    } else {
      return res.send(false);
    }
  })
);

//*************************    delete the employee profile     *************************/

router.delete(
  "/:id",
  wrapAsync(async (req, res) => {
    const deletedStudent = await empData.findByIdAndDelete(req.params.id);
    if (deletedStudent) {
      return res.status(200).send(true);
    } else {
      return res.send(false);
    }
  })
);
//************************************************************** */

module.exports = router;
