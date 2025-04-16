
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import './App.css';

import PuntoVenta from './components/PuntoVenta';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PuntoVenta />}></Route>
      </Routes>
    </BrowserRouter>
    
    </>
  );
}

export default App;
