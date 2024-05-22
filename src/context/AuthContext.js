import { createContext, useContext,useReducer } from 'react' 

const AuthContext = createContext() // create context

export const useAuth = () => { // useAuth custom hook 
    return useContext(AuthContext)
}

const reducer = (state, action) => { // reducer function
    switch(action.type) {
        case 'LOGIN' : {
            return {...state, isLoggedIn: true, account: action.payload.account, profile: action.payload.profile} // payload = passing data to reducer.
        } // spreading state
        case 'LOGOUT' : {
            return {...state, isLoggedIn: false, account: null, profile: null } 
        }
        case 'SET_PROFILE' : {
            return {...state, profile: action.payload}
        }
        case 'JOB':{
            return {...state, isLoggedIn:true,job:action.payload}
        }
        default: {
            return {...state} 
        }
    }
}

export const AuthProvider = ({ children }) => {// AuthProvider component.
    const [user, dispatch] = useReducer(reducer, { //create state using useReducer hook,value is not null it is having some values.
        isLoggedIn: false, 
        account: null,
        profile: null,
        job: null
    })
    // const [user, setUser] = useState(null)

    // const handleLogin = (user) => {
    //     setUser(user)
    // }
    
    // const handleLogout = () => {
    //     setUser(null) 
    // }

    return (
        // <AuthContext.Provider value={{ user, handleLogin, handleLogout}}> // passing state + dispatch through provider.
        <AuthContext.Provider value={{ user, dispatch}}> 
            { children }
        </AuthContext.Provider>
    )
}