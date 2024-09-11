const express = require('express');
const {ObjectId} = require("mongodb");
const router = express.Router();


// Create student
router.post('/create', async (req, res) => {
    const db = req.db;
    const reqBody = req.body;

    try {
        const result = await db.collection("students").insertOne(reqBody)
        res.status(200).json(result)
    }catch (e) {
        res.status(500).json(e)
    }
})


//Get all data
router.get('/get', async (req, res) => {
    const db = req.db;
    try {
        const result = await db.collection("students").find().toArray()
        res.status(200).json(result)
    }catch (e) {
        res.status(500).json(e)
    }
})

//Get data by id
router.get('/get-single/:id', async (req, res) => {
    const db = req.db;
    const id = req.params.id;
    try {
        const result = await db.collection("students").findOne({_id:new ObjectId(id)})
        res.status(200).json(result)
    }catch (e) {
        res.status(500).json(e)
    }
})


// Update student data
router.post('/update/:id', async (req, res) => {
    const db = req.db;
    const id = req.params.id;
    const reqBody = req.body;
    try {
        const result = await db.collection("students").updateOne({_id:new ObjectId(id)},
            {$set: reqBody}
        )
        res.status(200).json(result)
    }catch (e) {
        res.status(500).json(e)
    }
})


// Delete student data
router.delete('/delete/:id', async (req, res) => {
    const db = req.db;
    const id = req.params.id;
    try {
        const result = await db.collection("students").deleteOne({_id:new ObjectId(id)})
        res.status(200).json(result)
    }catch (e) {
        res.status(500).json(e)
    }
})

// Delete all student data
router.delete('/all-delete/', async (req, res) => {
    const db = req.db;
    try {
        const result = await db.collection("students").deleteMany({})
        res.status(200).json(result)
    }catch (e) {
        res.status(500).json(e)
    }
})


module.exports = router;