import React, { useState, useEffect } from 'react';

interface FormularioGenericoProps {
    tituloInicial: string;
    contenidoInicial: string;
    onGuardar: (titulo: string, contenido: string) => void;
    elementoAEditar: any | null; 
    textoBoton: string;
}

const FormularioGenerico: React.FC<FormularioGenericoProps> = ({
    tituloInicial,
    contenidoInicial,
    onGuardar,
    elementoAEditar,
    textoBoton,
    }) => {
    const [titulo, setTitulo] = useState(tituloInicial);
    const [contenido, setContenido] = useState(contenidoInicial);

    useEffect(() => {
        if (elementoAEditar) {
        setTitulo(elementoAEditar.titulo);
        setContenido(elementoAEditar.contenido);
        } else {
        setTitulo(tituloInicial);
        setContenido(contenidoInicial);
        }
    }, [elementoAEditar, tituloInicial, contenidoInicial]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onGuardar(titulo, contenido);
        setTitulo(tituloInicial);
        setContenido(contenidoInicial);
    };

    return (
        <form onSubmit={handleSubmit}>
        <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Título"
            required
        />
        <textarea
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            placeholder="Descripción"
            required
        />
        <button type="submit">{textoBoton}</button>
        </form>
    );
};

export default FormularioGenerico;