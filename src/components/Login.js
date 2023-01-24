import React,{useState,useContext,useEffect} from 'react'
import Context from '../context/Context'
import {useNavigate} from 'react-router-dom';

function Login() {

    const host =`${process.env.REACT_APP_URL}`;
    let navigator=useNavigate();
    const contet=useContext(Context);
    const {verifyUser,setErr,setLoading}=contet;

    useEffect(() => {
        verifyUser().then((val)=>{
            if(val)
            {
                navigator('/')
            }
            else
            {
                navigator('/login');
            }
        })
       
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const [credentials, setCredentials] = useState({email:"",password:""})

    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value});
    }

    const handleSubmit=async (e)=>{
        e.preventDefault();
        setLoading(true);
        let response=await fetch(`${host}/api/auth/login`,{
            method:"POST",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({email:credentials.email,password:credentials.password})
        })
        let json=await response.json();
        if(json.Success)
        {
            localStorage.setItem('auth-token',json.authToken)
            setErr({type:"success",msg:"Logged In Successfully."});
            setCredentials({email:"",password:""})
            navigator('/')
        }
        else
        {
            setErr({type:"danger",msg:"Invalid Credentials"});
        }
        setLoading(false);
    }

    return (
        <form  style={{marginTop:"5vh"}} onSubmit={handleSubmit} className="text-light">
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange} />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" name="password" className="form-control" id="password" value={credentials.password} onChange={onChange} autoComplete='off' />
            </div>
            <div className="mb-3 form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
            </div>
            <button type="submit" className="btn btn-dark">Login</button>
        </form>
    )
}

export default Login
