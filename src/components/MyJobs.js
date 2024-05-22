import axios from '../config/axios'
import { useEffect, useState } from "react"
import { Link, useNavigate } from 'react-router-dom'

export default function MyJob(){
    const[job,setJob] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
       async function fetchingJob(){
            try {
                  const response = await axios.get('/api/jobs/my', {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                  })
                  console.log(response.data)
                  setJob(response.data)
            }
            catch(error){
                console.log(error)
            }
        }
        fetchingJob()
    },[])

    const handleRemove= async(id)=>{
        try{
            const response = await axios.delete(`/api/jobs/${id}`, {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                })  
            const newArr = job.filter(ele => {
                if(ele._id !=id){
                    return ele
                }
        })
     setJob(newArr)
    } catch(err) {
        console.log(err.response.data)
    }
}

    const handleClick =(id) => {
        navigate(`/api/jobs/${id}/view-applications`)
    }



    return (
        <div>
            <h2>MyJob</h2>
            <table border={1}>
              <thead>
                <tr>
                    <th>title</th>
                    <th>description</th>
                    <th>openings</th>
                    <th>location</th>
                    <th>jobType</th>
                    <th>minExp</th>
                    <th>maxExp</th>
                    <th>skills</th>
                    <th>dueDate</th>
                    <th>minSalary</th>
                    <th>maxSalary</th>
                    <th>Action</th>
                </tr>
              </thead>
              <tbody>
                 {job.map((ele)=>{
                    return ( // creating dynamic url
                        <tr key={ele._id}> 
                            <td > <Link to={`/api/jobs/${ele._id}/view-applications`}>{ele.title}</Link></td> 
                            <td>{ele.description}</td>
                            <td>{ele.openings}</td>
                            <td>{ele.location}</td>
                            <td>{ele.jobType}</td>
                            <td>{ele.experience.minExp}</td>
                            <td>{ele.experience.maxExp}</td>
                            <td>{ele.skills}</td>
                            <td>{ele.dueDate}</td>
                            <td>{ele?.salary?.minSalary}</td> 
                            <td>{ele?.salary?.maxSalary}</td>
                            <td>
                                <button onClick={()=>{handleRemove(ele._id)}}>Delete</button> <br/>
                                <button onClick={()=> {handleClick(ele._id)}}>ViewApplications</button> 
                                </td>

                        </tr>
                    )
                 })}
              </tbody>
            </table>
        </div>
    )
}   



