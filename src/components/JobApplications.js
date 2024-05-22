import { useNavigate, useParams } from "react-router-dom"
import axios from '../config/axios';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function JobApplications(){
    const navigate = useNavigate()
    const {id, appId} = useParams();
    const [job, setJob] = useState([])

    useEffect(() => {
        const fetchApplications = async () => {
            const response = await axios.get(`/api/jobs/${id}/applications`,
                {
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }

                }
            );
            console.log(response.data)
            setJob(response.data);
        };
        fetchApplications();
    }, [])


    const handleClick = (id,appId) => {
        navigate(`/api/jobs/${id}/single-application/${appId}`)
    }

    return (
        <div>
             <h2>Job Applications </h2>
             <table border={1}>
              <thead>
                <tr>
                    <th>candidates</th>
                    <th>status</th>
                    <th>Action</th>
                    
                </tr>
              </thead>
              <tbody>
                 {job.map((ele)=>{
                    return ( // creating dynamic url
                        // <tr key={ele._id}> 
                        <tr key={ele._id}>
                            <td ><Link to={`/api/jobs/${ele.job}/single-application/${ele._id}`}> {ele?.candidate?.username}</Link></td> 
                            <td>{ele.status}</td>
                            <td><button onClick={() => {handleClick(ele.job, ele._id)}}>view</button></td>

                        </tr>
                    )
                 })}
              </tbody>
            </table>
            
        </div>
    )
}