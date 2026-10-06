import { Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './componentes/organismos/Navbar'
import Inicio from './paginas/Inicio'
import Productos from './paginas/Productos'

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
                
            </Routes>
        </>
    )
}

export default App
 