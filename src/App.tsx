import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './componentes/organismos/Navbar'
import Footer from './componentes/organismos/Footer'
import Inicio from './paginas/Inicio'
import Productos from './paginas/Productos'
import DetalleProductos from './paginas/DetalleProductos'
import Novedades from './paginas/Novedades'
import Nosotros from './paginas/Nosotros'
import Contactanos from './paginas/Contactanos'
import Registrate from './paginas/Registrate'
import Login from './paginas/Login'
import AdminInicio from './paginas/AdminInicio'
import AdminProductos from './paginas/AdminProductos'
import AdminUsuario from './paginas/AdminUsuario'
import RutaProtegida from './componentes/organismos/RutaProtegida'

function App() {
    return (
        <div className="d-flex flex-column min-vh-100">
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
                <Route
                    path="/admin"
                    element={
                        <RutaProtegida rolRequerido="Administrador">
                            <AdminInicio />
                        </RutaProtegida>
                    }
                />
                <Route
                    path="/admin/productos"
                    element={
                        <RutaProtegida rolRequerido="Administrador">
                            <AdminProductos />
                        </RutaProtegida>
                    }
                />
                <Route
                    path="/admin/usuarios"
                    element={
                        <RutaProtegida rolRequerido="Administrador">
                            <AdminUsuario />
                        </RutaProtegida>
                    }
                />
            </Routes>

            <Footer />
        </div>
    )
}

export default App