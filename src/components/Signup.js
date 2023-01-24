import React, { useState, useContext, useEffect } from "react";
import Context from "../context/Context";
import { useNavigate } from "react-router-dom";

function Signup() {

  const host = `${process.env.REACT_APP_URL}`;
  const navigator = useNavigate();
  const contet = useContext(Context);
  const { verifyUser, loggedin,setErr,setLoading } = contet;
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  
  useEffect(() => {
    verifyUser().then((val) => {
      if (val) {
        navigator("/");
      } else {
        navigator("/signup");
      }
    });  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedin]);

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      if (credentials.password !== credentials.cpassword) {
        setErr({type:"danger",msg:"Password don't match"});
        } else {
          setLoading(true);
            let response = await fetch(`${host}/api/auth/createuser`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({
                    name: credentials.name,
                    email: credentials.email,
                    password: credentials.password,
                }),
            });
            const json = await response.json();
           
      if (json.success) {
        setErr({type:"success",msg:"Login to Continue!"});
        setCredentials({ name: "", email: "", password: "", cpassword: "" });
      }
      else{
        console.log(json.msg)
        setErr({type:"danger",msg:json.status});
      }
      setLoading(false);

    }
  };

  return (
    <form style={{ marginTop: "5vh" }} onSubmit={handleSubmit} className="text-white">
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          aria-describedby="emailHelp"
          name="email"
          onChange={onChange}
          value={credentials.email}
        />
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Username
        </label>
        <input
          type="text"
          name="name"
          className="form-control"
          id="name"
          aria-describedby="emailHelp"
          onChange={onChange}
          value={credentials.name}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          name="password"
          onChange={onChange}
          className="form-control"
          id="password"
          value={credentials.password}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="cpassword" className="form-label">
          Confirm Password
        </label>
        <input
          type="password"
          name="cpassword"
          onChange={onChange}
          className="form-control"
          id="cpassword"
          aria-describedby="emailHelp"
          value={credentials.cpassword}
        />
      </div>
      <button type="submit" className="btn btn-dark">
        Sign Up
      </button>
    </form>
  );
}

export default Signup;
