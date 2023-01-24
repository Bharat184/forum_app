import React, { useState, useEffect, useContext } from 'react'
import Context from '../context/Context'
import { Link } from 'react-router-dom';
import UpdateNote from './UpdateNote';
function FetchThread(props) {

    const contet = useContext(Context)
    const { getUsersById, uid,setLoading } = contet;
    const host = `${process.env.REACT_APP_URL}`;

   

    const [data, setData] = useState([{ 'user_id': '', 'title': '', 'description': '', 'date': '' }]);
    const [t_id, setT_id] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const fetchThread = async () => {
        setLoading(true);
        const url = `${host}/api/thread/fetchThread/${props.cat_id}`;
        let response = await fetch(url, {
            method: "GET",
            headers: {
                "content-type": "application/json",
                "auth-token": localStorage.getItem('auth-token')
            }
        })
        let json = await response.json();
        if (json) {
            setData(json.thd);
        }
        setLoading(false);

       
    }

    const handleDelete = async (id) => {
        console.log(data);
        console.log(id)
        let resp = window.confirm("Are you sure you want to delete?")
        if (resp) {
          setLoading(true);
            const response = await fetch(`${process.env.REACT_APP_URL}/api/thread/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "content-type": "application/json",
                    "auth-token": localStorage.getItem('auth-token')
                }
            })
            const json = await response.json();
            setLoading(false);
            if (json.success) {
                setData((data)=>{
                    return data.filter((e)=>e._id.toString()!==id);
                });
                alert("Deleted Successfully");
            }
        }

    }

    const handleEdit = (id, title, description) => {

        setTitle(title);
        setDescription(description);
        setT_id(id);
        setTimeout(() => {
            setT_id("");
        }, 500);

    }

    useEffect(() => {
        fetchThread();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.cat_id])
    
    return (
        <>
            <UpdateNote _id={t_id} title={title} description={description} />
            {data.length===0 && <h1 className='text-light'>No thread found.</h1>}
            {data.map((val, i) => {
                return (
                    <div className="card my-3 bg-dark text-light" style={{ background: "2px solid black" }} key={i}>
                        <div className="card-header">
                            <h2>{props.cat_name} Question</h2>
                        </div>
                        <div className="card-body">
                            <h4 style={{ float: "right", padding: "5px", display: "block", clear: "left" }}>Posted By: {getUsersById(val.user_id)}</h4>
                            <p style={{ float: "right", padding: "3px", clear: "both" }}>{val.date.substring(0, 10)}</p>
                            <h5 className="card-title">{val.title}</h5>
                            <p className="card-text">{val.description}</p>
                            <Link to={`/comment?id=${val._id}`} style={{ float: "right", marginTop: "3vh", clear: "both" }} className="btn btn-primary">View Comments.</Link>
                            {uid === val.user_id ? (<div style={{ marginTop: "11vh", display: "inline-block" }}><i className="fa fa-trash" style={{ cursor: "pointer" }} onClick={() => handleDelete(val._id)}></i><i className="fas fa-edit mx-3" style={{ cursor: "pointer" }} onClick={() => handleEdit(val._id, val.title, val.description)}></i></div>) : (<i></i>)}
                        </div>
                    </div>
                );
            })}

        </>
    )
}

export default FetchThread
