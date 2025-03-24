import { useEffect, useState } from 'react';
export default function Inicio() {
    const [notasCount, setNotasCount] = useState(0);
    const [tareasCount, setTareasCount] = useState(0);

    useEffect(() => {
        try {
            const notasLS = localStorage.getItem('notas');
            if (notasLS && notasLS !== 'undefined') {
                const notasParseadas = JSON.parse(notasLS);
                if (Array.isArray(notasParseadas)) {
                    setNotasCount(notasParseadas.length);
                }
            }
        } catch (error) {
            console.error('Error al cargar notas:', error);
        }

        try {
            const tareasLS = localStorage.getItem('tareas');
            if (tareasLS && tareasLS !== 'undefined') {
                const tareasParseadas = JSON.parse(tareasLS);
                if (Array.isArray(tareasParseadas)) {
                    setTareasCount(tareasParseadas.length);
                }
            }
        } catch (error) {
            console.error('Error al cargar tareas:', error);
        }
    }, []);

    return(
        <div className="resumen-container">
            <h1>¡Bienvenido!</h1>
            <h2 className='estilo'>Este es un sistema de registro,
                aquí podras añadir, eliminar y editar tareas y notas, ¡disfrutela!</h2>
            
            <div className="contador-container">
                <div className="contador-item">
                    <h3>Notas Totales</h3>
                    <div className="contador">{notasCount}</div>
                </div>
                <div className="contador-item">
                    <h3>Tareas Totales</h3>
                    <div className="contador">{tareasCount}</div>
                </div>
            </div>
        </div>
    );
}