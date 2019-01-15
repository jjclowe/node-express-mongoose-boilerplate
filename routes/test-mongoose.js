const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

mongoose.connect('mongodb://localhost:27017/test');

const Schema = mongoose.Schema;
const TempDataSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    name: String
  },
  { collection: 'temp-data' }
);

const TempData = mongoose.model('TempData', TempDataSchema);

// CREATE
router.post('/', (req, res) => {
  const item = {
    email: req.body.email,
    name: req.body.name
  };

  const data = new TempData(item);
  data.save().then(
    doc => {
      res.json(doc);
    },
    err => {
      res.json(createError(500, err));
    }
  );
});

// READ
router.get('/:id', (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id);

  TempData.findById(id).then(
    doc => {
      res.json(doc);
    },
    err => {
      res.json(createError(500, err));
    }
  );
});

// UPDATE
router.put('/:id', (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id);

  const item = {
    email: req.body.email,
    name: req.body.name
  };

  TempData.findByIdAndUpdate(id, item, { new: true }).then(
    doc => {
      res.json(doc);
    },
    err => {
      res.json(createError(500, err));
    }
  );
});

// DELETE
router.delete('/:id', (req, res) => {
  const id = mongoose.Types.ObjectId(req.params.id);

  TempData.findByIdAndRemove(id).then(err => {
    res.json(createError(500, err));
  });
});

module.exports = router;
