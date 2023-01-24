import React,{useState,useEffect,useContext} from 'react'
import {useNavigate,useParams} from 'react-router-dom'
import Context from '../context/Context'
import FetchThread from './FetchThread';

function Thread() {
    let navigator=useNavigate();
    const contet=useContext(Context);
    const {verifyUser,setLoading}=contet;
    const {cat}=useParams();
   
    // const queryParams = new URLSearchParams(window.location.search);
    // const cat = queryParams.get('cat');
    let arr=["javascript","php","java","python"];
    let bool=arr.indexOf(cat.toLowerCase());
    let ids=["63bbe74df57f0273f3019f65","63bbe773f57f0273f3019f68","63bbe78cf57f0273f3019f6b","63bbe794f57f0273f3019f6e","63bc18f28d3d7ff133e55c1d"];
    if(bool>=0)
    {
        bool=ids[bool];
    }
    else
    {
        bool=ids[4];
    }
    const [catid, setcatid] = useState(bool);  
    
    
    
    const host =`${process.env.REACT_APP_URL}`;
    const [credentials, setCredentials] = useState({title:"",description:""})
    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value});
    }
    const handleSubmit=async (e)=>{
        e.preventDefault();
        setLoading(true);
        let response=await fetch(`${host}/api/thread/create`,{
            method:"POST",
            headers:{
                "content-type":"application/json",
                "auth-token":localStorage.getItem('auth-token')
            },
            body:JSON.stringify({title:credentials.title,description:credentials.description,cat_id:catid})
        })
        let json=await response.json();
        setLoading(false);
        if(json.success)
        {
            alert("Thread Posted")
            setCredentials({title:"",description:""});
            window.location.reload();
        }
        else
        {
           alert(`${json.errors[0].param} ${json.errors[0].msg}`)
        }
    }

    useEffect(() => {
        if(cat.toLowerCase()==="javascript")
        {
            setcatid("63bbe74df57f0273f3019f65")
        }
        else if(cat.toLowerCase()==="php")
        {
            setcatid("63bbe773f57f0273f3019f68")
        }
        else if(cat.toLowerCase()==="java")
        {
            setcatid("63bbe78cf57f0273f3019f6b")
        }
        else if(cat.toLowerCase()==="python")
        {
            setcatid("63bbe794f57f0273f3019f6e")
        }
        else
        {
            setcatid("63bc18f28d3d7ff133e55c1d");
        }
        verifyUser().then((val)=>{
            if(!val)
            {
                navigator("/login");
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cat])

    return (
        <>
    

            <div className="container my-4 bg-light" style={{borderRadius:"10px",padding:"8px"}}>
                <div className="jumbotron">
                    <h1 className="display-4"> {arr.includes(cat.toLowerCase())?`${cat} related`:"Other topics"} Forums</h1>
                    <p className="lead"></p>
                    <hr className="my-4" />
                    <p> No Spam / Advertising / Self-promote in the forums. ...<br />
                        Do not post copyright-infringing material. ...<br />
                        Do not post “offensive” posts, links or images. ...<br />
                        Do not cross post questions. ...<br />
                        Do not PM users asking for help. ...<br />
                    </p>
                    <p>This is a peer-to-peer forum is for sharing knowledge with each other.<br /></p>
                    <p className="lead">
                    </p>
                </div>
            </div>

            <form style={{ marginTop: "5vh",padding:"20px",borderRadius:"5px",background:"#263159" }} onSubmit={handleSubmit}>
                <div className='my-2'>
                    <h5 className='mb-3 text-light'>Post a Question:</h5>
                </div>
                <div className="mb-3">
                    <input type="text" required name="title" className="form-control" id="title" placeholder='Enter Your Title' aria-describedby="emailHelp" value={credentials.title} onChange={onChange} />
                </div>

                <div className="mb-3">
                    <textarea className="form-control" required placeholder="Enter Your Description Here" id="description" style={{ height: "100px" }} name="description" value={credentials.description} onChange={onChange} ></textarea>
                </div>
                <button type="submit" className="btn btn-primary my-3">Submit</button>
            </form>
            <FetchThread cat_id={catid} cat_name={cat.toLowerCase()} />
        </>
    )
}

export default Thread
