import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import { Home } from './pages/Home/Home';
import { Explore } from './pages/Explore/Explore';
import { Bookmarks } from './pages/Bookmarks/Bookmarks';
import { SignUp } from './pages/SignUp/SignUp';
import { Login } from './pages/Login/Login';
import { Navbar } from './components/Navbar/navbar';

function App() {
  return (
    <div className="App row">
      <div className='col-md-2'>
        <Navbar/>
      </div>

      <div className='col-md-6 main-content'>
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/signup' element={<SignUp/>}></Route>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/explore' element={<Explore/>}></Route>
          <Route path='/bookmarks' element={<Bookmarks/>}></Route>
        </Routes>
      </div>
      <div className='col-md-4'>
      </div>
    </div>
  );
}

export default App;
