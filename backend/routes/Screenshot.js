const express = require('express');
const router  = express.Router();
const Screenshot = require('../models/Screenshot');

const fs = require('fs');
const path = require('path');

router.get('/',async(req,res) => {
    try{
        const data = await Screenshot.find().sort({createdAt: -1});
        res.json(data);
    }catch(err){
        console.log(err.message);
        res.status(500).send('serverError');
    }
});

router.post('/', async(req,res) => {
    const adminPass = req.headers['x-admin-key'];
    if (adminPass !== process.env.SECRET_ADMIN_KEY){
        return res.status(401).json({message : 'Unauthorized: Invalid Key'});
    }

    try {
        const logData = JSON.stringify(req.body, null, 2);
        const logEntry = logData;
        const logFilePath = path.join(__dirname, '..', 'submission.log');

        fs.appendFile(logFilePath, logEntry, (err) => {
            if (err) {
                console.error("Failed to write to log file:", err);
            }
        });
    } catch (logErr) {
        console.error("Error creating log entry:", logErr);
    }

    const {title, description, rating, imageURL, category} = req.body;
    if (! title || !imageURL || !rating || !category){
        return res.status(400).json({ msg: 'Please enter all required fields' });
    }

    try {
        const newScreenshot = new Screenshot({ title, description, rating, imageURL,category});
        const screenshot = await  newScreenshot.save()    
        res.json(screenshot);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


router.delete('/:id', async(req,res) => {
    const {id} = req.params;
    try{
        const deleted = await Screenshot.findByIdAndDelete(id);
        if(!deleted){
            return res.status(404).json({message:'Screenshot not Found'});
        }
        res.json({message: 'Data deleted Successfully',deleted});
    } catch(err){
        console.error(err.message);
        res.status(500).send('server Error');
    }   
});

module.exports = router;