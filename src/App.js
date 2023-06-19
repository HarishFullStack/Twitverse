import './App.css';
import {Routes, Route} from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { Explore } from './pages/Explore/Explore';
import { Bookmarks } from './pages/Bookmarks/Bookmarks';
import { SignUp } from './pages/SignUp/SignUp';
import { Login } from './pages/Login/Login';
import { Navbar } from './components/Navbar/navbar';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Sidebar } from './components/Sidebar/Sidebar';
import { UserProfile } from './pages/UserProfile/UserProfile';

function App() {

  const {isLoggedIn} = useContext(AuthContext);

  return (
    <div className="App row justify-content-center">
      <ToastContainer />
      {isLoggedIn && <div className='w-15'>
      <Navbar/>
      </div>}
      {isLoggedIn && <div className='v-left'></div>}
      <div className='w-50'>
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/signup' element={<SignUp/>}></Route>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/explore' element={<Explore/>}></Route>
          <Route path='/bookmarks' element={<Bookmarks/>}></Route>
          <Route path='/profile/:username' element={<UserProfile/>}></Route>
        </Routes>
      </div>
      {isLoggedIn && <div className='v-right'></div>}
      {isLoggedIn && <div className='w-auto'>
        <Sidebar/>
      </div>}
    </div>
  );
}

export default App;
