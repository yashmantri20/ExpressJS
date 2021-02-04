const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Bear = require('../models/Bear');

var bears = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


bears
    .route('/')
    .get(async (req, res) => {
        try {
            const bear = await Bear.find();
            res.json({ message: "Bear Fetched", data: bear })
        } catch (error) {
            console.log(error)
        }
    })

    .post(async (req, res) => {
        try {
            const bear = await Bear.create(req.body);

            res.json({ message: 'Bear created!', data: bear });
        }
        catch (err) {
            console.log(err)
        }

    });

bears
    .route('/:bearId')
    .get(async (req, res) => {
        try {
            const bear = await Bear.findById(req.params.bearId);
            res.json({ message: "Single Bear Fetched", data: bear })
        } catch (error) {
            console.log(error)
        }
    })
    .put(async (req, res) => {
        try {
            const bear = await Bear.findByIdAndUpdate(req.params.bearId, {
                $set: req.body
            }, {
                new: true
            })
            res.json(bear)
        }
        catch (error) {
            console.log(error)
        }
    })
    .delete(async (req, res) => {
        try {
            const bear = await Bear.findById(req.params.bearId);
            bear.remove();
            res.json({ message: "Single Bear Deleted", data: bear })
        } catch (error) {
            console.log(error)
        }
    })

module.exports = bears;