import { Nota } from './Nota';

interface ListaNotasProps{
    notas: Nota[];
    accionEliminar: (id:string) => void;
    accionEditar: (nota: Nota) => void
}

const ListaNotas = ({ notas, accionEliminar, accionEditar }: ListaNotasProps) => {
    return (
        <div className="contenedorListaTareas">
            {notas.length === 0 ? (
                <p className="mensajeNoTareas">No hay notas</p>
            ) : (
                <ul className="notas-lista">
                    {notas.map((note) => (
                        <li key={note.id} className="nota-tarjeta">
                            <div className="nota-contenido">
                                <h3 className="nota-titulo">{note.titulo}</h3>
                                <p className="nota-parrafo">{note.contenido}</p>
                            </div>
                            <div className="nota-botones">
                                <button onClick={() => accionEditar(note)} className="boton-editar">Editar</button>
                                <button onClick={() => accionEliminar(note.id)} className="boton-eliminar">Eliminar</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
    export default ListaNotas;