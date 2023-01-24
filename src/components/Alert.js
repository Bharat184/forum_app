import { useContext,useEffect} from "react";
import Context from "../context/Context";

export default function Alert()
{
    const content=useContext(Context);
    const {err,setErr}=content;
    useEffect(()=>{
       if(err.type)
       {
            var tym=setTimeout(()=>{
                setErr({});
            },5000);
       }
       return ()=>{
        clearTimeout(tym);
       }
    },[err,setErr]);
   

    return (<>

       { err.type?( <div className={`alert alert-${err.type} alert-dismissible fade show my-2`} role="alert">
             {err.msg}
        </div>):(<div></div>)}

    </>);
}