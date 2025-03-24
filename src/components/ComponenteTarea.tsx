import React, { useState, useEffect } from 'react';
import ListaTareas from './ListaTareas';
import { Tarea } from './Tarea';
import Modal from './Modal';
import FormularioGenerico from './FormularioGeneral';

const ComponenteTarea: React.FC = () => {
    const [tareas, setTareas] = useState<Tarea[]>([]);
    const [tareaAEditar, setTareaAEditar] = useState<Tarea | null>(null);
    const [esModalAbierto, setEsModalAbierto] = useState(false);

    useEffect(() => {
        try {
        const tareasGuardadas = localStorage.getItem('tareas');
        if (tareasGuardadas && tareasGuardadas !== 'undefined') {
            const tareasParseadas = JSON.parse(tareasGuardadas);
            if (Array.isArray(tareasParseadas)) {
            setTareas(tareasParseadas);
            }
        }
        } catch (error) {
        console.error('Error al cargar desde localStorage:', error);
        }
    }, []);

    useEffect(() => {
        try {
            if (tareas.length > 0) {
                localStorage.setItem('tareas', JSON.stringify(tareas));
            } else {
                localStorage.removeItem('tareas');
            }
        } catch (error) {
            console.error('Error al guardar en localStorage:', error);
        }
    }, [tareas]);

    const agregarTarea = (nuevaTarea: Omit<Tarea, 'id' | 'completada'>) => {
        setTareas([...tareas, { ...nuevaTarea, id: Date.now().toString(), completada: false }]);
        setEsModalAbierto(false);
    };

    const editarTarea = (tareaEditada: Tarea) => {
        setTareas(tareas.map((tarea) => (tarea.id === tareaEditada.id ? tareaEditada : tarea)));
        setTareaAEditar(null);
        setEsModalAbierto(false);
    };

    const eliminarTarea = (id: string) => {
        setTareas(tareas.filter((tarea) => tarea.id !== id));
    };

    const iniciarEdicion = (tarea: Tarea) => {
        setTareaAEditar(tarea);
        setEsModalAbierto(true);
    };

    const completarTarea = (id: string, completada: boolean) => {
        setTareas(tareas.map((tarea) =>
        tarea.id === id ? { ...tarea, completada: completada } : tarea
        ));
    };

    const abrirModal = () => {
        setEsModalAbierto(true);
    };

    const cerrarModal = () => {
        setEsModalAbierto(false);
    };

    return (
        <div className="contenedorPrincipal">
        <div className="headerFijo">
            <h1 className="tituloListaTareas">Lista de Tareas</h1>
        </div>
        <div className="contenidoPrincipal">
            <ListaTareas
                tareas={tareas}
                accionEliminar={eliminarTarea}
                accionEditar={iniciarEdicion}
                accionCompletar={completarTarea}
            />
        </div>
        <button className="botonAgregarTarea" onClick={abrirModal}>+</button>
        <Modal isOpen={esModalAbierto} onClose={cerrarModal}>
            <FormularioGenerico
            tituloInicial=""
            contenidoInicial=""
            onGuardar={(titulo, contenido) => {
                if (tareaAEditar) {
                editarTarea({ ...tareaAEditar, titulo, contenido });
                } else {
                agregarTarea({ titulo, contenido });
                }
            }}
            elementoAEditar={tareaAEditar}
            textoBoton={tareaAEditar ? 'Editar' : 'Agregar'}
            />
        </Modal>
        </div>
    );
};

export default ComponenteTarea;