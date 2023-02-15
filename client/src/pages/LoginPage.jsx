import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import {UserContext} from "../UserContext.jsx"; 
import axios from "axios";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUser} = useContext(UserContext);
    async function loginUser(e) {
        e.preventDefault();
        try {
            const {data} = await axios.post('/login', {email, password});
            setUser(data);
            alert('Login successful!');
            setRedirect(true);
        } catch (e) {
            alert('Login Failed!');
        }
    }
    
    if (redirect) {
        return <Navigate to={'/'} />
    }
    return(
        <div className="mt-40">
            <h1 className="text-4xl text-center mb-3">Login</h1>
            <form className="max-w-md mx-auto" onSubmit={loginUser}>
                <input  type='email' 
                        placeholder="your@email.com" 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        />
                <input  type='password' 
                        placeholder="password" 
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        />
                <button className="primary">Login</button>
                <div className="text-center text-gray-500 mt-2">Don't have an account yet?
                <Link className="underline text-blue-500 ml-3" to={'/register'}>Register</Link>
                </div>

            </form>
        </div>
    );
}