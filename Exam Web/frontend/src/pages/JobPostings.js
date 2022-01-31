import React from 'react';
import { Link } from 'react-router-dom'
import {useState, useEffect} from 'react'


const JobPostings = ({fromInput, addJOb, deleteJob}) => {
    const [showJobs, setJobs] = useState(false)
    return(
        <>
            <div className='container'>
                <h2>Create a job posting</h2>
                <form>
                    <label>Add description</label>
                    <input type="text"></input>
                    <label>Add deadline</label>
                    <input type="date"></input>

                </form>
            </div>
        </>
    )
}

export default JobPostings;