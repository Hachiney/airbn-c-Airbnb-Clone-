import { Link } from "react-router-dom";
export default function LoginPage() {
    return(
        <div className="mt-40">
            <h1 className="text-4xl text-center mb-3">Login</h1>
            <form className="max-w-md mx-auto">
                <input type='email' placeholder="your@email.com" />
                <input type='password' placeholder="password" />
                <button className="primary">Login</button>
                <div className="text-center text-gray-500 mt-2">Don't have an account yet?
                <Link className="underline text-blue-500 ml-3" to={'/register'}>Register</Link>
                </div>

            </form>
        </div>
    );
}