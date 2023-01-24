import { ColorRing } from "react-loader-spinner";
import styles from "./loading.module.css";
import { useContext } from "react";
import Context from "../../context/Context";
function Loading() {
  const { loading } = useContext(Context);
  return (
    <>
      {loading ? (
        <div className={styles.loadingBox}>
          {/* <img src={loading} alt="loading..." /> */}
          <ColorRing
            visible={true}
            height="200"
            width="200"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
}
export default Loading;
