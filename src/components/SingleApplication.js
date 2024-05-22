import { useParams } from "react-router-dom"
import axios from '../config/axios'
import { useState, useEffect } from "react"

export default function SingleApplication() {
    const {id, appId} = useParams(); // we are extracting two id's
    const [sin, setSin]=useState([])
    const [candidate, setCandidate] = useState()
    const [update, setUpdate] = useState(null)
    const [status, setStatus] = useState('');
    const [errors, setErrors] = useState(null)
    
    const statusTypes = [
        {name: 'accepted'},
        {name: 'under-review'},
        {name: 'rejected'}
    ]
    console.log(id, appId)

    useEffect(() => {
        const fetchApplications = async() => {
            const response = await axios.get(`/api/jobs/${id}/applications/${appId}`, {
                headers: 
                {
                    Authorization: localStorage.getItem("token")
                }
                
            })
             console.log(response.data)
             setSin(response.data)
             console.log(sin)
         }
        fetchApplications()
    }, [])


    useEffect(() => {
        const fetchApplications = async() => {
            const response = await axios.get(`/api/jobs/${id}/applications/${appId}`, {
                headers: 
                {
                    Authorization: localStorage.getItem("token")
                }
                
            })
             console.log(response.data)
             setCandidate(response.data)
             console.log(sin)
         }
        fetchApplications()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/api/jobs/${id}/applications/${appId}`, {
                status: status
            }, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            });
             console.log(response.data);
            
            setUpdate(response.data.status);
            setErrors(null)
        } catch (error) {
            console.error(error);
            setErrors(error.response.data.errors)   
           
        }
        
    };

    const handleChange = (e) => { //e = event
        const { value } = e.target;
        // console.log(value);
        setStatus(value);
    };

    
    return ( // if sin is the truthy value thin display additional information.
        <div> 
            <h2>Job info </h2> 
            {sin &&
             <> 
             <h3>jobId:{sin.job}</h3>
             <h3>appId:{sin._id}</h3>
             <h3>status:{sin.status}</h3>
            </>}

            <h4><strong>Status:</strong> { update ? update :sin?.status}</h4>
            <form onSubmit={handleSubmit}>
                <select value={status} onChange={handleChange}>
                    <option value="">Select status:</option>
                    {statusTypes.map((ele, i) => (
                        <option key={i} value={ele.name}>{ele.name}</option>
                    ))}
                </select><br />
                <button type="submit">Update</button>
            </form>
            <ul>
            {
                 errors && 
                 errors.map((ele,i) => {
                    return <li  key={i}> {ele.msg}</li>
                 })
            }
            </ul>

            <h2>candidate info </h2> 
            {candidate &&
             <> 
             <h3>username:{candidate.candidate.username}</h3>
             <h3>email:{candidate.candidate.email}</h3>
             <h3>role:{candidate.candidate.role}</h3>
            </>}

        </div>
    )
}