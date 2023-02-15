import { Link } from "react-router-dom";
import { useState } from "react";
import axios, { Axios } from "axios";

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function registerUser(e) {
        e.preventDefault();
        try {
            await axios.post('/register', {
                name,
                email,
                password,
            });
            alert('Registration Successful!');
        } catch (e) {
            alert('Registration failed, please try again!');
        }
    }

    return(
        <div className="mt-40">
            <h1 className="text-4xl text-center mb-3">Register</h1>
            <form className="max-w-md mx-auto" onSubmit={registerUser}>
                <input  type="text" 
                        placeholder="NAME" 
                        value={name} 
                        onChange={e => setName(e.target.value)}/>
                <input  type='email' 
                        placeholder="EMAIL" 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                />
                <input  type='password' 
                        placeholder="PASSWORD" 
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                />
                <button className="primary">Register</button>
                <div className="text-center text-gray-500 mt-2">You already have an account?
                <Link className="underline text-blue-500 ml-3" to={'/login'}>Login</Link>
                </div>
            </form>
        </div>
    );
}