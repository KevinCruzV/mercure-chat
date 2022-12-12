import './App.css';
import Home from './pages/Home';
import Chat from './pages/Chat';
import Account from './pages/Account';
import Login from './Auth/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {useEffect} from "react";

function App() {

  useEffect(() => {
    document.cookie = "mercureAuthorization=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXJjdXJlIjp7InB1Ymxpc2giOlsiKiJdLCJzdWJzY3JpYmUiOlsiKiJdLCJwYXlsb2FkIjp7InVzZXIiOiJmcmFuY2lzIn19fQ.K6Q5dJ1v_9o3j9OfZWWyPRTki-mHB1kEt1_uyt9zSbY"

    const sse = new EventSource("http://localhost:9090/.well-known/mercure?topic=francishuster", {
      withCredentials: true,
    })

    sse.onmessage = (e) => {console.log(e)}
  })


  return (
  <Router>
    <div className="App">
      <div className="content">
        <Routes>
          <Route path="/" element={ <Home />} />
          <Route path="/chat" element={ <Chat />} />  
          <Route path="/login" element={ <Login />} />  
          <Route path="/account" element={ <Account />} />  
          <Route path="*" element={ <Home />} />
        </Routes>
      </div>
    </div>
  </Router>
  );
}

export default App;
