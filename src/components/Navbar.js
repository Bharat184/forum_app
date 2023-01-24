import React,{useEffect,useContext,useState} from 'react'
import Context from '../context/Context'
import {Link,useNavigate} from 'react-router-dom'
function Navbar() {
    const contet=useContext(Context);
    const {verifyUser,loggedin,name,getUser}=contet;
    const [data, setdata] = useState(true);
    const navigator=useNavigate();
    const handleLogout=(e)=>{
        e.preventDefault();
        localStorage.removeItem('auth-token')
        navigator("/login")
    }
    useEffect(() => {
        verifyUser().then((val)=>{
            if(!val)
            {
                setdata(false)
            }
            else
            {
                setdata(true)
                getUser();
            }
        })
       
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loggedin])
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-success" style={{position:"sticky",top:"0px",zIndex:"1",padding:"10px"}}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Forum</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                               Categories
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><Link className="dropdown-item" to="/categories/Java">Java</Link></li>
                                <li><Link className="dropdown-item" to="/categories/Python">Python</Link></li>
                                <li><hr className="dropdown-divider" /></li>
                                <li><Link className="dropdown-item" to="/categories/JavaScript">JavaScript</Link></li>
                                <li><Link className="dropdown-item" to="/categories/PHP">PHP</Link></li>
                            </ul>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About Us</Link>
                            </li>
                        </ul>
                        {/* <form className="d-flex">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-secondary" type="submit" onClick={(e)=>{e.preventDefault();}}>Search</button>
                        </form> */}
                        <form className="d-flex">
                            {!data?(<><Link to="/Login" className="btn btn-primary mx-2">Login</Link><Link to="/Signup" className="btn btn-dark mx-2" >Signup</Link></>):(<><div style={{padding:"0 2px"}}><p style={{color:"white",marginBottom:0,textAlign:"center"}}>Hello </p><p style={{color:"white",marginBottom:0}}>{name}</p></div><button className="btn btn-dark mx-2" onClick={handleLogout}>Logout</button></>)}
                        </form>
                    </div>
                </div>
            </nav>
      </>
    )
}

export default Navbar
