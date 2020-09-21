const express = require('express');
const router = express.Router();
const {Comment} = require('../models/comment');
const {auth} = require('../middleware/auth');

router.post('/savecomment', auth, async (req, res) => {
  const comment = new Comment(req.body);

  const newComment = await comment.save();
  if (newComment) {
    res.send('berhasil gan');
  } else {
    res.status(401).send({message: 'Invalid User Data.'});
  }
});

router.post('/getcomments', async (req, res) => {
  const dataKomen = await Comment.find({'postId': req.body.id}).populate(
    'writer'
  );
  res.send(dataKomen);
});

module.exports = router;
