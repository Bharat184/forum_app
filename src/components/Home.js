import React, { useContext, useEffect } from 'react'
import Context from '../context/Context'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
import Java from "../static/Java.png";
import js from "../static/js.png";
import php from "../static/php.png";
import python from "../static/pthon.png";
import ab from '../static/ab.jpg';

function Home() {
    const navigator = useNavigate();
    const contet = useContext(Context);
    const { verifyUser } = contet;
    useEffect(() => {
        verifyUser().then((val) => {
            if (!val) {
                navigator('/login');
            }
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <div className="text-light">
            <h1 className='my-2'>Post a question and wait for others to respond</h1>
            <div className='d-md-flex d-sm-block justify-content-center '>
                <div className="card m-2" style={{ "width": "18rem" }}>
                    <img src={Java} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title text-dark">Java</h5>
                        <p className="card-text text-dark">Post question realated to Java.</p>
                        <Link to="/categories/Java" className="btn btn-primary">Explore java</Link>
                    </div>
                </div>

                <div className="card m-2" style={{ "width": "18rem" }}>
                    <img src={php} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title text-dark">PHP</h5>
                        <p className="card-text text-dark">Post question realated to PHP.</p>
                        <Link to="/categories/PHP" className="btn btn-primary">Explore PHP</Link>
                    </div>
                </div>

                <div className="card m-2" style={{ "width": "18rem" }}>
                    <img src={js} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title text-dark">JavaScript</h5>
                        <p className="card-text text-dark">Post question realated to JavaScript</p>
                        <Link to="/categories/JavaScript" className="btn btn-primary">Explore Javascript</Link>
                    </div>
                </div>

                <div className="card m-2" style={{ "width": "18rem" }}>
                    <img src={python} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title text-dark">Python</h5>
                        <p className="card-text text-dark">Post question realated to python.</p>
                        <Link to="/categories/Python" className="btn btn-primary">Explore python</Link>
                    </div>
                </div>

                <div className="card m-2" style={{ "width": "18rem" }}>
                    <img src={ab} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title text-dark">Other languages</h5>
                        <p className="card-text text-dark">Post question realated to other programming languages.</p>
                        <Link to="/categories/others" className="btn btn-primary">Explore others</Link>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default Home
