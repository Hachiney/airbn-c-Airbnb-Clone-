import { Link } from "react-router-dom";
export default function RegisterPage() {
    return(
        <div className="mt-40">
            <h1 className="text-4xl text-center mb-3">Register</h1>
            <form className="max-w-md mx-auto">
                <input type="text" placeholder="NAME" />
                <input type='email' placeholder="EMAIL" />
                <input type='password' placeholder="PASSWORD" />
                <button className="primary">Register</button>
                <div className="text-center text-gray-500 mt-2">You already have an account?
                <Link className="underline text-blue-500 ml-3" to={'/login'}>Login</Link>
                </div>
            </form>
        </div>
    );
}