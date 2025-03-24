import { Tarea } from './Tarea';
interface ListaTareasProps {
    tareas: Tarea[];
    accionEliminar: (id: string) => void;
    accionEditar: (tarea: Tarea) => void;
    accionCompletar: (id: string, completado: boolean) => void;
    }

    const ListaTareas = ({ tareas, accionEliminar, accionEditar, accionCompletar }: ListaTareasProps) => {
    return (
        <div className="contenedorListaTareas">
            {tareas.length === 0 ? (
            <p className="mensajeNoTareas">No hay tareas yeiiii</p>
            ) : (
            <ul className="listaTareas">
                {tareas.map((tarea) => (
                    <li key={tarea.id} className={`itemTarea ${tarea.completada ? 'tareaCompletada' : ''}`}>
                    <div className="contenedorCheckboxSuperior">
                        <div
                            className={`checkboxPersonalizado ${tarea.completada ? 'marcado' : ''}`}
                            onClick={() => accionCompletar(tarea.id, !tarea.completada)}
                        ></div>
                        <input
                            type="checkbox"
                            checked={tarea.completada}
                            onChange={(e) => accionCompletar(tarea.id, e.target.checked)}
                            className="checkboxCompletado"
                        />
                    </div>
                    <div className="contenidoTarea">
                        <h3 className="tituloTarea">{tarea.titulo}</h3>
                        <p className="descripcionTarea">{tarea.contenido}</p>
                    </div>
                    <div className="accionesTareaInferior">
                        <button className="botonEditarTarea" onClick={() => accionEditar(tarea)}>Editar</button>
                        <button className="botonEliminarTarea" onClick={() => accionEliminar(tarea.id)}>Eliminar</button>
                    </div>
                </li>
                ))}
            </ul>
            )}
        </div>
        );
};

export default ListaTareas;