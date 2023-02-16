import { UserContext } from "../UserContext.jsx";
import { useContext, useState} from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";

export default function AccountPage() {
    const [redirect, setRedirect] = useState(null);
    const {ready, user, setUser} = useContext(UserContext);
    const {subpage} = useParams();

    function getStyle(type=null) {
        let style = 'border py-2 px-4 rounded-full';
        if (type===subpage) {
            style += ' bg-primary text-white';
        }
        return style;
    }

    async function logout(){
        await axios.post('/logout');
        setRedirect('/');
        setUser(null);
       
        
    }

    if (!ready) {
        return 'Loading...';
    }
    if(redirect) {
        return <Navigate to={redirect}/>
    }


   
    if (ready && !user && !redirect) {
        <Navigate to={'/login'} />
    }

    
    return (
        <div>
            <nav className="mt-8 flex justify-center gap-8">
                <Link className={getStyle('profile')} to={'/account/profile'} >My Profile</Link>
                <Link className={getStyle('accomodation')} to={'/account/accomodation'}>My Accommodation</Link>
                <Link className={getStyle('bookings')} to={'/account/bookings'}>My Bookings</Link>
            </nav>

            {subpage === 'profile' && (
              <div className="mt-4 mx-auto text-center">
                    Logged in as {user?.name} <span className="text-gray-500">({user?.email})</span> <br/>
                    <button onClick={logout} className="mt-1 max-w-2xl border rounded-full px-20 py-2 bg-primary text-white">Logout</button>
              </div>
            )}
           
        </div>
    );
}