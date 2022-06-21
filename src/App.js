import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Register from './pages/user/Register';
import Login from './pages/user/Login';
import Navbar from './components/Navbar'
import Galleries from './pages/Galleries'
import CreateGallery from './pages/CreateGallery';
import SingleGallery from './pages/SingleGallery';
import { getActiveUser } from './store/user';
import { useEffect} from 'react'
import store from './store';
import MyGalleries from './pages/MyGalleries';
import AuthorPage from './pages/AuthorPage';
import EditGallery from './pages/EditGallery';
function App() {
  


  useEffect(()=>{
    if(localStorage.getItem('token')){
      setTimeout(()=>{
        store.dispatch(getActiveUser())
      },500)
    }
  },[])
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/register" element={<Register />}/>
          <Route exact path='/login' element={<Login />}/>
          <Route exact path='/galleries' element={<Galleries />} />
          <Route path='/create-galleries' element={<CreateGallery/>} />
          <Route exact path='/galleries/:id' element={<SingleGallery/>} />
          <Route path='/my-galleries/:id' element={<MyGalleries/>} />
          <Route path='/author/:id' element={<AuthorPage/>} />
          <Route path='/edit/:id' element={<EditGallery/>} />
        </Routes>
     </Router>
      
    </div>
  );
}

export default App;
