const express = require('express');
const wrapAsync = require('../util/wrapAsync');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Professor = require('../model/professor');
const { verifyToken } = require('../middleware');
const multer = require('multer');
var imagedest = __dirname;
var upload = multer({ dest: imagedest });
const fs = require('fs');

router.post(
  '/register',
  wrapAsync(async function (req, res) {
    var pro = {
      fname: req.body.fname,
      lname: req.body.lname,
      address: req.body.address,
      email: req.body.email,
      phno: req.body.phno,
      qual: req.body.qual,

      skill: req.body.skill,
      comp: req.body.comp,
      desgn: req.body.desgn,
      course: req.body.course,
      Gender: req.body.Gender,
      DOB: req.body.DOB,
      State: req.body.State,
      District: req.body.District,
      Post: req.body.Post,
      PinCode: req.body.PinCode,
      Password: req.body.Password,
    };
    console.log(pro);

    const professor = new Professor(pro);
    professor
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
  '/reset',
  wrapAsync(async (req, res) => {
    console.log(req.body);
    const { email, Password } = req.body;
    const professor = await Professor.findOneAndUpdate(email, { Password });
    if (professor) {
      res.status(200).send({ status: true });
    } else {
      res.send({ status: false });
    }
  })
);
//************************************************************************* */

router.post(
  '/login',
  wrapAsync(async function (req, res) {
    console.log(req.body);
    console.log('hi bro');
    const { Email, Password } = req.body;
    const user = await Professor.findOne({ email: Email, Password: Password });
    console.log(user);
    if (user) {
      req.session.role = 'admin';
      const payload = { subject: Email + Password, admin: true };
      const token = jwt.sign(payload, 'secretKey', { expiresIn: '24h' });
      const Name = 'Admin';
      res.status(200).json({
        data: 'success',
        status: 'success',
        token,
        Name,
        role: req.session.role,
      });
    } else {
      res.status(404).json({ status: 'fail' });
    }
  })
);

//***************************    Getting all professor      *************************/

router.get(
  '',
  wrapAsync(async (req, res) => {
    const professors = await Professor.find();
    console.log(professors);
    if (professors) {
      res.send(professors);
    } else {
      res.send(false);
    }
  })
);

//***************            professor fetching By Id      *****************************/

router.get(
  '/:id',
  wrapAsync(async (req, res) => {
    const professor = await Professor.findById(req.params.id);
    // console.log(professors)
    if (professor) {
      return res.send(professor);
    } else {
      return res.send(false);
    }
  })
);

//************************        profile update        ******************************/
router.put(
  '/:id',
  wrapAsync(async (req, res) => {
    const { id } = req.params;

    console.log(req.body);
    const professors = await Professor.findByIdAndUpdate(id, {
      ...req.body,
    });
    console.log(professors);
    if (professors) {
      return res.send(true);
    } else {
      return res.send(false);
    }
  })
);

//*************************    delete the professor profile     *************************/

router.delete(
  '/:id',
  wrapAsync(async (req, res) => {
    const deleted = await Professor.findByIdAndDelete(req.params.id);
    if (deleted) {
      return res.status(200).send(true);
    } else {
      return res.send(false);
    }
  })
);
//************************************************************** */

module.exports = router;
