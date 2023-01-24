import React,{useContext,useEffect,useState} from 'react'
import Context from '../context/Context';
import {Link,useNavigate} from 'react-router-dom'
const host=`${process.env.REACT_APP_URL}`;

function Category() {
    const [category, setCategory] = useState([]);
    const navigator=useNavigate();
    const contet=useContext(Context);
    const {verifyUser}=contet;
    const fetchCategories=async ()=>{
        let response=await fetch(`${host}/api/category/fetchCat`);
        const data=await response.json();
        setCategory(data)
    }
    useEffect(() => {
        fetchCategories();
        verifyUser().then((val)=>{
            if(!val)
            {
                navigator('/login')
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return (
        <div className='d-flex' style={{marginTop:'20vh'}}>
           {category.map((val,index)=>{
               return (<div key={index} className="card" style={{width: "18rem"}}>
               {/* <img className="card-img-top" src={val.name} alt={`Card image cap ${index}`} /> */}
               <div className="card-body">
                 <h5 className="card-title">{val.name}</h5>
                 <p className="card-text">{val.description}</p>
                 <Link to={`/categories?cat=${val.name}`} className="btn btn-primary">{localStorage.getItem('auth-token')? `Explore ${val.name}`:"Login To Continue."}</Link>
               </div>
             </div>
               )
           })}           
        </div>
    )
}

export default Category
