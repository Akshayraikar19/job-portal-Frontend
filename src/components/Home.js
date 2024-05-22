// import { useAuth } from "../context/AuthContext"
// export default function Home() {
//     const { user } = useAuth() // useContext(AuthContext)
//     return (
//         <div>
//             <h2>Home Component</h2> 
//             { !user? <p>user is not logged in </p> : <p> Welcome { user.username}</p>} 
//         </div> // conditional rendering.
//     )
// }

import { useAuth } from "../context/AuthContext"
export default function Home() {
    const { user } = useAuth() 
    return (
        <div>
            <h2>Home Component</h2>
            { !user.isLoggedIn ? <p> user not loggedin </p> : <p>Welcome {user.account.username} </p>}
        </div>
    )
}
