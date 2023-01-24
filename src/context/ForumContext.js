import React,{useState,useEffect} from 'react'
import Context from './Context'
function ForumContext(props) {  

    const [loggedin, setLoggedin] = useState(null); 
    const [loading,setLoading]=useState(false);
    const [uid, setid] = useState("");
    const [name, setName] = useState("");
    const [users,setUsers]=useState([{
        "_id": "",
        "name": "",
        "email": "",
        "date": "",
        "__v": 0
      }]);
      const [err,setErr]=useState({});

  

    const verifyUser=async()=> {
        const url=`${process.env.REACT_APP_URL}/api/auth/verify`;
        if(localStorage.getItem('auth-token'))
        {
            let id=localStorage.getItem('auth-token');
            const response=await fetch(url,{
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify({authtoken:id})
            })
            const json=await response.json();
            if(json.count===1)
            {
                setLoggedin(true)
                return true
            }
           return false;
        }
        else
        {
            setLoggedin(false)
            return false
        }
    }

    const getUser=async ()=>{
        const url=`${process.env.REACT_APP_URL}/api/auth/getuser`;
        if(localStorage.getItem('auth-token'))
        {
            const response=await fetch(url,{
                method:"POST",
                headers:{
                    "content-type":"application/json",
                     "auth-token":localStorage.getItem('auth-token')
                }
            })
            const json=await response.json();
            setid(json._id);
            setName(json.name)
        }
    }

    const getUsers=async ()=>{
        const url=`${process.env.REACT_APP_URL}/api/auth/getusers`;
        const response=await fetch(url,{
            method:"GET",
            headers:{
                "content-type":"application/json",
                "auth-token":localStorage.getItem('auth-token')
            },
        })
        const json=await response.json();
        setUsers(json);
    }

    const getUsersById=(id)=>{
        if(users)
        {
           for(let i=0;i<users.length;i++)
           {
               if(users[i]._id===id)
               {
                   return users[i].name;
               }
           }
        }
    }
    
    useEffect(() => {
        getUsers();
    }, [loggedin])

    return (
       <Context.Provider value={{verifyUser,loggedin,getUser,name,users,getUsersById,uid,err,setErr,loading,setLoading}}>
           {props.children}
       </Context.Provider>
    )
}

export default ForumContext;
