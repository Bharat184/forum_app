import Navbar from './components/Navbar';
import Home from './components/Home'
import About from './components/About'
// import Preview from './components/Preview';
import Login from './components/Login';
import Signup from './components/Signup'
import Thread from './components/Thread'
import Comment from './components/Comment';
import Alert from './components/Alert';
import ForumContext from './context/ForumContext';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import UpdateNote from './components/UpdateNote';
import NotFound from './components/NotFound';
import Loading from './components/loading/Loading';



function App() {

  return (
    <ForumContext>
      <Router>
        <Loading />
        <Navbar />
        <div className='container'>
          {/* <Preview /> */}
          <Alert />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route exact path="/about" element={<About />}></Route>
            <Route exact path="/category" element={<Home />}></Route>
            <Route exact path="/Login" element={<Login />}></Route>
            <Route exact path="/Signup" element={<Signup />}></Route>
            <Route exact path="/categories/:cat" element={<Thread />}></Route>
            <Route exact path="/comment" element={<Comment />}></Route>
            <Route exact path="/edit" element={<UpdateNote />}></Route>
            <Route exact path="*" element={<NotFound />}></Route>


          </Routes>
        </div>
      </Router>
    </ForumContext>
  );
}

export default App;
