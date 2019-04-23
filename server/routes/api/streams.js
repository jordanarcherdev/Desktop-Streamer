//@route    /api/streams/
const express = require('express');
const router = express.Router();
const passport = require('passport');

// Database Models
const Stream = require('../../models/Stream');
const User = require('../../models/User');

// Server side validation modules
const validateStreamInput = require('../../validation/stream');

//GET all streams
router.get('/', (req, res) => {
  Stream.find()
    .sort({ date: -1 })
    .then(streams => res.json(streams))
    .catch(err => res.status(404).json({ nostreamsfound: 'No Streams Found' }));
});

//GET individual stream
router.get('/show/:id', (req, res) => {
  Stream.findById(req.params.id)
    .populate('user', ['name'])
    .then(stream => res.json(stream))
    .catch(err => res.status(404).json({ nopostfound: 'No post found' }));
});

//POST new stream
router.post(
  '/add',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    //Server side validation
    const { errors, isValid } = validateStreamInput(req.body);
    if(!isValid){
      return res.status(400).json(errors);
    }

    //Create new stream
    const newStream = new Stream({
      title: req.body.title,
      description: req.body.description,
      user: req.user.id
    });

    newStream.save().then(stream => res.json(stream));
  }
);

//DELETE Stream
router.delete(
  '/delete/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    Stream.findById(req.params.id).then(stream => {
      if (stream.user.toString() !== req.user.id){
        return res
          .status(401)
          .json({ notauth: 'User not authorized' });
      }

      //Delete the stream
      stream.remove().then(() => res.json({ success: true }));
    })
    .catch(err => res.status(404).json({ streamnotfound: 'No Stream Found!' }));
  }
);

//Edit Stream
router.patch(
  '/edit/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {

    console.log(req.body)

    const { errors, isValid } = validateStreamInput(req.body);
    if(!isValid) {
      return res.status(400).json(errors);
    }

    const editFields = {};
    if (req.body.title) editFields.title = req.body.title;
    if (req.body.description) editFields.description = req.body.description;

    Stream.findOneAndUpdate(
      { _id: req.params.id },
      { $set: editFields },
      { new: true }
    ).then(stream => {
      res.json(stream);
    });
  }
)



module.exports = router;
