import React, { useState, useEffect, useContext } from "react";
import Context from "../context/Context";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Comment() {
  const host = `${process.env.REACT_APP_URL}`;
  const navigator = useNavigate();
  const contet = useContext(Context);
  const { verifyUser, uid, getUsersById } = contet;
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get("id");
  const url = `${host}/api/thread/comment/${id}`;

  useEffect(() => {
    fetchData();
    verifyUser().then((val) => {
      if (!val) {
        navigator("/login");
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [thread, setThread] = useState({
    title: "",
    description: "",
    date: "",
  });
  const [comment, setComment] = useState([
    { content: "", date: "", comment_by: "" },
  ]);
  const [credentials, setCredentials] = useState({ content: "", id: "" });

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response = await fetch(`${host}/api/comment/post`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify({ content: credentials.content, id: id }),
    });
    let json = await response.json();
    console.log(json);
    if (json.success) {
      alert("Added Successfully");
      setCredentials({ content: "", id: "" });
      window.location.reload();
    }
  };

  const fetchData = async () => {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
    });
    const json = await response.json();
    if (json) {
      setComment(json.cmt);
      setThread(json.thd);
    }
  };
  const handleDelete = async (id) => {
    if (window.confirm("Are You Sure You Want to Delete?")) {
      const url = `${host}/api/comment/delete`;
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
        body: JSON.stringify({ id: id }),
      });
      const json = await response.json();
      console.log(json);
      if (json.success) {
        alert("Comment Deleted");
        window.location.reload();
      }
    }
  };

  return (
    <>
      <div
        className="container my-4 bg-light"
        style={{ borderRadius: "15px", padding: "5px 8px" }}
      >
        <div className="jumbotron">
          <h1 className="display-4">Forums</h1>
          <p className="lead"></p>
          <hr className="my-4" />
          <p>
            {" "}
            No Spam / Advertising / Self-promote in the forums. ...
            <br />
            Do not post copyright-infringing material. ...
            <br />
            Do not post “offensive” posts, links or images. ...
            <br />
            Do not cross post questions. ...
            <br />
            Do not PM users asking for help. ...
            <br />
          </p>
          <p>
            This is a peer-to-peer forum is for sharing knowledge with each
            other.
            <br />
          </p>
        </div>
      </div>

      <div className="card my-5">
        <div className="card-header">
          <h5 className="card-title">{thread.title}</h5>
          <div>
            <p>
              Posted By: {getUsersById(thread.user_id)} at{" "}
              {thread.date.substring(0, 10)}
            </p>
          </div>
        </div>
        <div className="card-body">
          <p className="card-text">{thread.description}</p>
          <form
            action=""
            method="post"
            className="my-5"
            onSubmit={handleSubmit}
          >
            <textarea
              className="form-control"
              id="comment"
              value={credentials.content}
              name="content"
              rows="3"
              placeholder="Enter Your Answer.."
              onChange={onChange}
              required
            ></textarea>
            <button className="btn btn-primary">Submit</button>
          </form>
          <Link to="/category" className="btn btn-primary">
            Get Back
          </Link>
        </div>
      </div>

      {comment.count > 0 ? (
        comment.map((val, i) => {
          return (
            <div
              className="my-3 bg-dark"
              key={i}
              style={{ borderRadius: "10px" }}
            >
              <div
                className="card bg-dark text-light"
                style={{ width: "100%" }}
              >
                <div className="card-body">
                  <h4
                    style={{
                      float: "right",
                      padding: "5px",
                      display: "block",
                      clear: "left",
                    }}
                  >
                    Posted By: {getUsersById(val.comment_by)}
                  </h4>
                  <p style={{ float: "right", padding: "3px", clear: "both" }}>
                    {val.date.substring(0, 10)}
                  </p>
                  <p className="card-text">{val.content}</p>
                  {uid === val.comment_by ? (
                    <div style={{ marginTop: "11vh", display: "inline-block" }}>
                      <i
                        className="fa fa-trash"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDelete(val._id)}
                      ></i>
                    </div>
                  ) : (
                    <i></i>
                  )}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-dark">
          <div className="p-4 bg-white">
            <h2 className="text-dark">All Comments</h2>
            <hr />
            {comment.length === 0 && <h3>No Comments</h3>}
            {comment.length > 0 &&
              comment.map((e, i) => {
                return (
                  
                    <div className="bg-light card-body my-2" key={i}>
                      <p>{e.content}</p>
                      <div className="d-flex justify-content-around">
                        <p>
                          Posted by: <b>{getUsersById(e.comment_by)}</b>
                        </p>
                        <p>Posted on: {e.date.substring(0, 10)}</p>
                      </div>
                      {uid === e.comment_by ? (
                        <i
                          className="fa fa-trash"
                          style={{ cursor: "pointer" }}
                          onClick={() => handleDelete(e._id)}
                        ></i>
                      ) : (
                        ""
                      )}
                    <hr />
                    </div>
                  
                );
              })}
          </div>
        </div>
      )}
    </>
  );
}

export default Comment;
