import axios from "axios";
import { useState } from "react";
import { Link, useParams } from "react-router-dom"

export default function AccommodationPage(){
    const [title,setTitle] = useState('');
    const [address,setAddress] = useState('');
    const [addedPhotos,setAddedPhotos] = useState([]);
    const [description,setDescription] = useState('');
    const [photoLink, setPhotoLink] = useState('');
    const [perks,setPerks] = useState([]);
    const [extraInfo,setExtraInfo] = useState('');
    const [checkIn,setCheckIn] = useState('');
    const [checkOut,setCheckOut] = useState('');
    const [maxGuests,setMaxGuests] = useState(1);
    const [price,setPrice] = useState(100);
    const [redirect,setRedirect] = useState(false);
    const {action} = useParams();

    async function uploadPhotoFromLink(e) {
        e.preventDefault();
        const {data:filename} = await axios.post('/upload-from-link', {link: photoLink});
        setAddedPhotos(prev => {
            return [...prev, filename];
        });
        setPhotoLink('');

    }
    
    async function addNewPlace(e){
        e.preventDefault();
       
        await axios.post('/places', {
            title, address, addedPhotos, 
            description, perks, extraInfo, 
            checkIn, checkOut, maxGuests
        });
        setRedirect(true);
        
    }

    function uploadPhoto(e){
        e.preventDefault();
        const files = e.target.files;
        const data = new FormData();
        for ( let i = 0; i <files.length; i++) {
            data.append('photos', files[i]);
        }
        
        axios.post('/upload', data, {
            headers: {'Content-type': 'multipart/form-data'}
            }).then(response => {
                const {data:filenames} = response;
                setAddedPhotos(prev => [...prev, ...filenames]);
            })    
    }

    function handleCbClick(e, ){
        const{checked, name} = e.target;
        if (checked) {
            setPerks([...perks, name]);
        } else {
            setPerks([...perks.filter(selectedName => selectedName !== name)])
        }
    }

    if (redirect) {
        
    }

   


    return( 
        <div>
            {action !== 'new' && (
                <div className="text-center mt-14">
                    <Link className="inline-flex gap-2 bg-primary text-white py-2 px-4 rounded-full mt-3" to={'/account/accommodation/new'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add new place
                    </Link>
                </div>
            )}
            {action === 'new' && (
                <div className="mt-6">
                    <form onSubmit={addNewPlace}>
                        {/* Title */}
                        <h2 className="text-2xl">Title</h2>
                        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title for this place" />
                        
                         {/* Address */}
                        <h2 className="text-2xl mt-3">Address</h2>
                        <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="Address for this place" />
                        
                         {/* Photos */}
                        <h2 className="text-2xl mt-3">Photos</h2>
                        <p className="text-gray-400">Add photos</p>
                        <div className="flex gap-2">
                            <input  type="text" 
                                    placeholder="Add a link or photo url"
                                    value={photoLink} 
                                    onChange={e => setPhotoLink(e.target.value)}
                                    
                            />
                            <button onClick={uploadPhotoFromLink} className="border rounded-xl px-6 bg-gray-200">Add&nbsp;photo</button>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 m-2">
                            {addedPhotos.length > 0 && addedPhotos.map(link => (
                                <div className="h-32 flex">
                                    <img className="rounded-2xl w-full object-cover" src={'http://localhost:4000/uploads/'+link} alt='' />
                                </div>
                            ))}
                            <label className="h-32 flex gap-2 justify-center border rounded-xl bg-transparent items-center text-gray-400 text-2xl mt-2 cursor-pointer">
                                <input className="hidden" type='file' onChange={uploadPhoto}/>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
                                </svg>
                                Upload
                            </label>
                            
                        </div>

                        {/* Description */}
                        <h2 className="text-2xl mt-5">Description</h2>
                        <p className="text-gray-400">Add description of the place</p>
                        <textarea value={description} onChange={e => setDescription(e.target.value)}/>

                        {/* Perks */}
                        <h2 className="text-2xl mt-5">Perks</h2>
                        <p className="text-gray-400">Select all available perks</p>
                        <div className="grid grid-cols-2 md:grid-cols-3">
                            <label className="inline-flex gap-3 border py-2 px-3 m-1 rounded-xl">
                                <input type="checkbox" name="wifi" onChange={handleCbClick}/>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
                                    </svg>
                                <span> Wifi</span>
                            </label>
                            <label className="inline-flex gap-3 border py-2 px-3 m-1 rounded-xl">
                                <input type="checkbox" name="parking" onChange={handleCbClick}/>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                                </svg>
                                <span> Free parking</span>
                            </label>
                            <label className="inline-flex gap-3 border py-2 px-3 m-1 rounded-xl">
                                <input type="checkbox" name="tv" onChange={handleCbClick}/>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z" />
                                </svg>
                                <span> TV</span>
                            </label>
                            <label className="inline-flex gap-3 border py-2 px-3 m-1 rounded-xl">
                                <input type="checkbox" name="ac" onChange={handleCbClick}/>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                                </svg>
                                <span> AC</span>
                            </label>
                            <label className="inline-flex gap-3 border py-2 px-3 m-1 rounded-xl">
                                <input type="checkbox" name="self-chck-in" onChange={handleCbClick}/>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                                </svg>
                                <span> Self Check-in</span>
                            </label>
                            <label className="inline-flex gap-3 border py-2 px-3 m-1 rounded-xl">
                                <input type="checkbox" name="support" onChange={handleCbClick}/>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0l6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z" />
                                </svg>
                                <span> 24/7 Support</span>
                            </label>
                        </div>

                        {/* Extra Information */}
                        <h2 className="text-2xl mt-5">Extra Info</h2>
                        <p className="text-gray-400">Additional information, house rules, etc..</p>
                        <textarea value={extraInfo} onChange={e => setExtraInfo(e.target.value)}/>

                        

                        {/* Service Instruction */}
                        <h2 className="text-2xl mt-5">Service Instruction</h2>
                        <p className="text-gray-400">Add check-in time, check-out time and maximum allowed guests number.</p>
                        <div className="grid grid-cols-3 gap-2 mt-2">
                            <div>
                                <h3>Check-in time</h3>
                                <input value={checkIn} onChange={e => setCheckIn(e.target.value)} type="text" placeholder="16:00" />
                            </div>
                            <div>
                                <h3>Check-out time</h3>
                                <input value={checkOut} onChange={e => setCheckOut(e.target.value)}type="text" placeholder="10:00" />
                            </div>
                            <div>
                                <h3>Maximum guests</h3>
                                <input value={maxGuests} onChange={e => setMaxGuests(e.target.value)} type="number" placeholder="6" />
                            </div>
                        </div>

                        {/* Save */}
                        <button className="primary m-4">Save</button>                        
                    </form>
                </div>
            )}
        </div>
    );
}