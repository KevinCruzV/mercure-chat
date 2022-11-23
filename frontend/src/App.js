import './App.css';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Login from './Auth/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
  <Router>
    <div className="App">
      <div className="content">
        <Routes>
          <Route path="/" element={ <Home />} />
          <Route path="/chat" element={ <Chat />} />  
          <Route path="/login" element={ <Login />} />  
          <Route path="*" element={ <Home />} />
        </Routes>
      </div>
    </div>
  </Router>
  );
}

export default App;
