import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';
import './App.css';
import ComponenteNota from './components/ComponenteNota';
import ComponenteTarea from './components/ComponenteTarea';
import Inicio from './components/Inicio';

function App() {
  return (
    <BrowserRouter>
      <div className="radio-inputs">
        <label className="radio">
          <NavLink to="/" className={({ isActive }) => isActive ? "name active" : "name"}>
            Inicio
          </NavLink>
        </label>
        <label className="radio">
          <NavLink to="/notas" className={({ isActive }) => isActive ? "name active" : "name"}>
            Notas
          </NavLink>
        </label>
        <label className="radio">
          <NavLink to="/tareas" className={({ isActive }) => isActive ? "name active" : "name"}>
            Tareas
          </NavLink>
        </label>
      </div>
      
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/notas" element={<ComponenteNota />} />
        <Route path="/tareas" element={<ComponenteTarea />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;