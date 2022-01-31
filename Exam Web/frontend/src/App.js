import logo from './logo.svg';
import './App.css';
import {Route, Routes, BrowserRouter} from "react-router-dom"
import {useState, useEffect} from 'react'
import jobForm from './components/jobForm';
import JobPostings from './pages/JobPostings';



const fetchJobs = async()=>{
  const res = await fetch('localhost:7000/api/jobpostings')
  const data = await res.json()
  return data
}

const addJob = async(job)=>{
  var jobStringify = JSON.stringify(job)
  const res = await fetch('localhost:7000/api/jobpostings', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
      body: jobStringify
    }
  )
  const data = await res.json()
  return data
}

function App() {
  return (
    <BrowserRouter>
        <Route path ='/jobs' element={<JobPostings/>} />
    </BrowserRouter>
    
  );
}

export default App;
