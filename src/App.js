
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import './App.css';

import PuntoVenta from './components/PuntoVenta';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <>
     <Header />
    <BrowserRouter>
      <Routes>
     
        <Route path='/' element={<PuntoVenta />}></Route>
      </Routes>
    </BrowserRouter>
    <Footer/>
    
    </>
  );
}

export default App;
