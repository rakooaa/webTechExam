const { restart } = require('nodemon');
const JobPosting = require('../models/jobposting');

const router = require('express').Router();


router.route("/jobpostings")
    .get(async (req, res) =>{
        try {
            const jobPostings = await JobPosting.findAll({
                order: [
                    ['id', 'DESC'],
                ],
            });
            return res.status(201).json(jobPostings);
            
        } catch (error) {
            console.warn(error);
            return res.status(500).json({message: "some error occured"});
        }
    })

    
    .post(async (req, res) =>{
        try {
            const jobPost = req.body;
            await JobPosting.create(jobPost);
            return res.status(201).json(jobPost);
        } catch (error) {
            console.warn(error);
            return res.status(500).json(error);
        }
    })
    


module.exports = router;
