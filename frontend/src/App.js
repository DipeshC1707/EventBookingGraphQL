import './App.css';
import {BrowserRouter as Router,Route,Routes, Navigate} from "react-router-dom";
import Auth from './Pages/Auth';
import Bookings from './Pages/Bookings';
import Event from './Pages/Event';
import MainNavigation from './Components/Navigation/MainNavigation';

function App() {
  return (
    <div className='App'>
      <Router>
        <MainNavigation/>
        <main className='main-content'>
        <Routes>
          <Route path='/' element={<Navigate to="/auth"/>} exact/>
          <Route path='/auth' element={<Auth/>}/>
          <Route path='/bookings' element={<Bookings/>}/>
          <Route path='/events' element={<Event/>}/>
        </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
