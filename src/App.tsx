import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './componentes/organismos/Navbar'
import Inicio from './paginas/Inicio'
import Productos from './paginas/Productos'
import DetalleProductos from './paginas/DetalleProductos'
import Novedades from './paginas/Novedades'
import Nosotros from './paginas/Nosotros'
import Contactanos from './paginas/Contactanos'
import Registrate from './paginas/Registrate'
import Login from './paginas/Login'

function App() {
    return (
        <>
            <Navbar/>

            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/productos" element={<Productos />} />
                <Route path="/producto/:id" element={<DetalleProductos />} />
                <Route path="/novedades" element={<Novedades />} />
                <Route path="/nosotros" element={<Nosotros />} />
                <Route path="/contactanos" element={<Contactanos />} />
                <Route path="/registrate" element={<Registrate />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </>
    )
}

export default App