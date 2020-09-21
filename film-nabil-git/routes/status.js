const express = require('express');
const router = express.Router();
const {Status} = require('../models/status');
const {auth} = require('../middleware/auth');

router.post('/savestatus', auth, async (req, res) => {
  const status = new Status(req.body);

  const newStatus = await status.save();
  if (newStatus) {
    res.send('berhasil gan');
  } else {
    res.status(401).send({message: 'Invalid User Data.'});
  }
});

router.post('/getstatus', async (req, res) => {
  const dataKomen = await Status.find().populate('writer');
  res.send(dataKomen);
});

module.exports = router;
