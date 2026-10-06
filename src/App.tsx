import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './componentes/organismos/Navbar'
import Inicio from './paginas/Inicio'
import Productos from './paginas/Productos'
import Registrate from './paginas/Registrate'
import Contactanos from './paginas/Contactanos'
import Nosotros from './paginas/Nosotros'
import Novedades from './paginas/Novedades'

function App() {
    return (
        <>
            <Navbar/>

            <Routes>
                <Route
                    path="/"
                    element={<Inicio />}
                />
                <Route
                    path="/productos"
                    element={<Productos />}
                />
                <Route
                    path="/novedades"
                    element={<Novedades />}
                />
                <Route
                    path="/nosotros"
                    element={<Nosotros />}
                />
                <Route
                    path="/contactanos"
                    element={<Contactanos />}
                />
                <Route
                    path="/registrate"
                    element={<Registrate />}
                />
                
            </Routes>
        </>
    )
}

export default App
 