import { useState } from 'react'
import { Link } from 'react-router-dom'
import validator from 'validator'
import { useNavigate } from 'react-router-dom'
import axios from '../config/axios'
import _ from 'lodash'
import { useAuth } from '../context/AuthContext' // to use we have to import it.

export default function Login() {
    //const { handleLogin} = useAuth() // destructure it.
    const {dispatch} = useAuth()
    const navigate = useNavigate()

    const [form, setForm] = useState({
        email: '',
        password: '',
        serverErrors: null, 
        clientErrors: {}// create a state variable
    })

    const errors = {} //create a local variable

    const runValidations = () => {// Declare a run validations
        if(form.email.trim().length == 0) {
            errors.email = 'email is required'
        } else if(!validator.isEmail(form.email)) {// isEmail returns true or false
            errors.email = 'invalid email format'
        }

        if(form.password.trim().length == 0) {
            errors.password = 'password is required'
        } else if(form.password.trim().length < 8 || form.password.trim().length > 128) {
            errors.password = 'invalid password length'
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault() 
        const formData = _.pick(form, ['email', 'password'])// another approach of extracting form data. Defining form elements in array.


        runValidations()//we can pass state variable or pass a formData.


        if(Object.keys(errors).length == 0 ) {// checking for a condition
            try {  
                const response = await axios.post('/users/login', formData) 
                localStorage.setItem('token', response.data.token)
                const userResponse = await axios.get('/users/account', { // Protected route so we are passing it as a second argument.
                    headers: {
                        Authorization: localStorage.getItem('token') // api call to get account info
                    }
                })
                //handleLogin(userResponse.data)
                console.log(userResponse.data)
                let url // Based on role we have use api address
                if(userResponse.data.role == 'candidate') {
                    url = '/api/candidates/profile'
                } else {
                    url = '/api/recruiters/profile'
                }
                const profileResponse = await axios.get(url, { // instead of hardcoding we will pass url as argument
                    headers: {
                        Authorization: localStorage.getItem('token')
                    }
                })
                console.log(profileResponse.data)
                dispatch({ type: "LOGIN", payload: { account: userResponse.data, profile: profileResponse.data } }) // update user login status.
                navigate('/')// redirect the user.
            } catch(err) {
                setForm({...form, serverErrors: err.response.data.errors, clientErrors: {} })
            }
        } else {
            setForm({...form, clientErrors: errors})
        }
    }

    const handleChange = (e) => {
        const { value, name } = e.target 
        setForm({...form, [name]: value })
    }

    const displayErrors = () => {
        let result 
        if(typeof form.serverErrors == 'string') { // server errors if string display this
            result = <p> { form.serverErrors } </p>
        } else {
            result = (
                <div>
                    <h3>Theses errors prohibitted the form from being saved: </h3>
                    <ul>
                        { form.serverErrors.map((ele, i) => {
                            return <li key={i}> { ele.msg } </li>
                        })}
                    </ul>
                </div>
            )
        }
        return result 
    }
    
    return (
        <div>
            <h2>Login</h2>
            { form.serverErrors && displayErrors() } 
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Enter email</label><br />
                <input 
                    type="text" 
                    value={form.email} 
                    onChange={handleChange}
                    name="email" 
                    id="email"
                />
                { form.clientErrors.email && <span> { form.clientErrors.email } </span>}
                 <br />

                <label htmlFor="password">Enter password</label><br />
                <input 
                    type="password" 
                    value={form.password} 
                    onChange={handleChange} 
                    name="password"
                    id="password"
                /> 
                { form.clientErrors.password && <span> { form.clientErrors.password } </span> }
                <br />

                <input type="submit" /> 
            </form>

            <Link to="/register">Create an account</Link>
        </div>
    )
}
