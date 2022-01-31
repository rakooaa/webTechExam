const express = require("express")
const sequelize = require('./sequelize')
const cors = require('cors');
const JobPosting = require("./models/jobposting");
const Candidate = require("./models/candidate");

const app = express();
require('./models/jobposting');
require('./models/candidate');

app.use(express.urlencoded({
    extended: true,
}));

app.use(express.json());
app.use(cors());

app.use('/api', require('./routes/jobposting'));

app.put('/jobposting/:jobId', async function (req, res) {
    try {
        const job = await JobPosting.findByPk(req.params.jobId);
    if(job){
        await job.update(req.body, {fields: ['description']})
        return res.status(201).json({message: "updated"})
    }else{
        return res.status(500).json({message: "not found"})
    } 
    }catch (error) {
        console.warn(error);
        return res.status(500).json(error);
    } 
})

app.delete('/jobposting/:jobId', async (req, res) =>{
    try {
        const job = await JobPosting.findByPk(req.params.jobId);
    if(job){
        await job.destroy();
        res.status(201).json({message: "deleted"})
    }else{
        res.status(500).json({message: "not found"})
    } 
    }catch (error) {
        console.warn(error);
        return res.status(500).json(error);
    } 
    
})

app.get('/jobposting/:jobId/candidates', async(req, res)=>{
    try{
        const job = await JobPosting.findByPk(req.params.jobId, {
        include: Candidate
    })
    if(job){
        const candidates = await job.getCandidates();
        res.status(201).json(candidates)
    }else{
        res.status(500).json({message: "not found"})
    } 
    }catch (error) {
        console.warn(error);
        return res.status(500).json(error);
    }  
})

app.post('/jobposting/:jobId/candidates/:cid', async(req, res)=>{
    try{
        const job = await JobPosting.findByPk(req.params.jobId, {
        include: Candidate
    })
    if(job){
        const candidate = req.body;
        candidate.jobId = candidate.id;
        await Candidate.create(candidate)
        res.status(201).json({message: "done"})
    }else{
        res.status(500).json({message: "not found"})
    } 
    }catch (error) {
        console.warn(error);
        return res.status(500).json(error);
    }
})

app.get('/jobposting/:jobId/candidates/:cid', async(req, res)=>{
    try{
        const job = await JobPosting.findByPk(req.params.jobId)
    if(job){
        const candidates = await job.getCandidates({where: {id: req.params.cid}});
        const candidate = candidates.shift() 
            if(candidate){
                res.status(201).json(candidates)}else{res.status(500).json({message: "candidate not found"})}
    }else{
        res.status(500).json({message: "not found"})
    } 
    }catch (error) {
        console.warn(error);
        return res.status(500).json(error);
    }  
})

app.put('/jobposting/:jobId/candidates/:cid', async(req, res)=>{
    try{
        const job = await JobPosting.findByPk(req.params.jobId)
    if(job){
        const candidates = await job.getCandidates({where: {id: req.params.cid}});
        const candidate = candidates.shift() 
            if(candidate){
                await job.update(req.body)
                res.status(201).json({message:"accepted"})
            }else{res.status(500).json({message: "candidate not found"})}
    }else{
        res.status(500).json({message: "not found"})
    } 
    }catch (error) {
        console.warn(error);
        return res.status(500).json(error);
    }  
})

app.delete('/jobposting/:jobId/candidates/:cid', async(req, res)=>{
    try{
        const job = await JobPosting.findByPk(req.params.jobId)
    if(job){
        const candidates = await job.getCandidates({where: {id: req.params.cid}});
        const candidate = candidates.shift() 
            if(candidate){
                await job.destroy()
                res.status(201).json({message:"accepted"})
            }else{res.status(500).json({message: "candidate not found"})}
    }else{
        res.status(500).json({message: "not found"})
    } 
    }catch (error) {
        console.warn(error);
        return res.status(500).json(error);
    } 
})

app.get('/jobposting/new', async (req, res) =>{
    try {
        const jobPostings = await JobPosting.findAll(
            {where : {"deadline" : {[Op.between] : ["2020-02-01" , "2022-02-01"]}}});
        return res.status(201).json(jobPostings);
        
    } catch (error) {
        console.warn(error);
        return res.status(500).json({message: "some error occured"});
    }
})

app.listen(7000, async () =>{
    console.log("Server started on port:7000");
    try {
        await sequelize.authenticate();
        console.log("Connection has been established");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
})