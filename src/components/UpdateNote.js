import { useRef,useEffect,useState } from "react";
export default function UpdateNote(props) {

  const host =`${process.env.REACT_APP_URL}`;
  const ref = useRef(null);
  const closeRef=useRef(null);
  const [thread_id,setThread_id]=useState("");
  const [credentials,setCredentials]=useState({title:"",description:""});
  const {_id,title,description}=props;

  


  function handleClick() {
    ref.current.click();
  }


  function onChange(e)
  {
    setCredentials({...credentials,[e.target.name]:e.target.value});
  }

  async function updateNote()
  {
      let response=await fetch(`${host}/api/thread/edit/${thread_id}`,{
        method:"PUT",
        headers:{
            "content-type":"application/json",
            "auth-token":localStorage.getItem('auth-token')
        },
        body:JSON.stringify({title:credentials.title,description:credentials.description})
    })
    let json=await response.json();
    closeRef.current.click();
    console.log(json);
    if(json)
    {
      alert("Updated Successfully");
      setCredentials({title:"",description:""});
      setThread_id("");
      window.location.reload();
    }
  }

  useEffect(()=>{
    if(_id)
    {
        let e={title,description};
        handleClick();
        setThread_id(_id);
        setCredentials(e);
    }
  },[_id,title,description]);

  return (
    <>
      <button
        ref={ref}
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      hidden>
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Update Your Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">

            <div className="mb-3">
                    <input type="text" name="title" className="form-control" id="title"  aria-describedby="emailHelp" value={credentials.title} onChange={onChange} />
                </div>

                <div className="mb-3">
                    <textarea className="form-control"  id="description" style={{ height: "100px" }} name="description" value={credentials.description} onChange={onChange} ></textarea>
                </div>

            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={closeRef}
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={updateNote}>
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
