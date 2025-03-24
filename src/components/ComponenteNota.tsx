import { useEffect, useState } from "react";
import { Nota } from "./Nota";
import ListaNotas from "./ListaNotas";
import Modal from "./Modal";
import FormularioGenerico from "./FormularioGeneral";
function ComponenteNota() {
    const [nota, setNota] = useState<Nota[]>([]);
    const [notaAEditar, setNotaAEditar] = useState<Nota | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        try {
            const guardadasLS = localStorage.getItem('notas');
            if (guardadasLS && guardadasLS !== 'undefined') {
                const parseadas = JSON.parse(guardadasLS);
                if (Array.isArray(parseadas)) {
                    setNota(parseadas);
                }
            }
        } catch (error) {
            console.log('Existe un error:', error);
        }
    }, []);
    useEffect(() => {
        try {
            if (nota.length > 0) {
                localStorage.setItem('notas', JSON.stringify(nota));
            } else {
                localStorage.removeItem('notas');
            }
        } catch (error) {
            console.error('Error al guardar en localStorage:', error);
        }
    }, [nota]);

    

    const agregarNota = (nuevaNota: Omit<Nota, 'id'>) => {
        const nuevaNotaConId = { ...nuevaNota, id: Date.now().toString() };
        setNota([...nota, nuevaNotaConId]);
        setIsModalOpen(false);
    };

    const eliminarNota = (id: string)=>{
        setNota(nota.filter((n)=>(n.id !== id)));
    }
    const iniciarEdicion = (note: Nota) => {
        setNotaAEditar(note);
        setIsModalOpen(true);
    };
    
    const editarNota = (notaEdit: Nota) => {
        setNota(nota.map((note) => (note.id === notaEdit.id ? notaEdit : note)));
        setIsModalOpen(false);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };
    
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="contenedorPrincipal">
            <div className="headerFijo">
                <h1 className="tituloListaTareas">Notas</h1>
            </div>
            <div className="contenidoPrincipal">
                <ListaNotas
                    notas={nota}
                    accionEliminar={eliminarNota}
                    accionEditar={iniciarEdicion}
                />
            </div>
            <button
                onClick={openModal}
                className="botonAgregarTarea"
            >+</button>
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <FormularioGenerico
                    tituloInicial={notaAEditar?.titulo || ""}
                    contenidoInicial={notaAEditar?.contenido || ""}
                    onGuardar={(titulo, contenido) => {
                        if (notaAEditar) {
                            editarNota({ ...notaAEditar, titulo, contenido });
                        } else {
                            agregarNota({ titulo, contenido });
                        }
                    }}
                    elementoAEditar={notaAEditar}
                    textoBoton={notaAEditar ? 'Editar' : 'Agregar'}
                />
            </Modal>
        </div>
    );
}
export default ComponenteNota;