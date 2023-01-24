import React,{useEffect,useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import Context from '../context/Context'
function About() {
    const navigator=useNavigate();
    const contet=useContext(Context);
    const {verifyUser}=contet;
    useEffect(() => {
       
        verifyUser().then((val)=>{
            if(!val)
            {
                navigator("/login")
            }
        })
       
        // eslint-disable-next-line react-hooks/exhaustive-deps
     },[verifyUser])
    return (
        <div className='my-4 p-4 bg-light'>
            <h1 className='text-dark'>Post your doubts and wait for others to respond. You can also respond to other queries.</h1>
        </div>
    )
}

export default About