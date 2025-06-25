import React, { useState } from 'react';

const frasesLocales = [
  {
    frase: "No estás deprimido, estás distraído.",
    autor: "Facundo Cabral",
  },
  {
    frase: "La felicidad no es algo hecho. Proviene de tus propias acciones.",
    autor: "Dalai Lama",
  },
  {
    frase: "Haz hoy lo que otros no quieren, haz mañana lo que otros no pueden.",
    autor: "Jerry Rice",
  },
  {
    frase: "La vida es 10% lo que te sucede y 90% cómo reaccionas.",
    autor: "Charles Swindoll",
  },
  {
    frase: "Cambia tus pensamientos y cambiarás tu mundo.",
    autor: "Norman Vincent Peale",
  },
];

const QuoteBox = () => {
  const [indice, setIndice] = useState(Math.floor(Math.random() * frasesLocales.length));

  const nuevaFrase = () => {
    let nuevoIndice;
    do {
      nuevoIndice = Math.floor(Math.random() * frasesLocales.length);
    } while (nuevoIndice === indice); // Evita repetir la misma frase
    setIndice(nuevoIndice);
  };

  const { frase, autor } = frasesLocales[indice];

  return (
    <div className="alert alert-info mt-3">
      <blockquote className="mb-0">
        <p className="mb-1">“{frase}”</p>
        <footer className="blockquote-footer mt-1">{autor}</footer>
      </blockquote>

      <div className="text-end">
        <button onClick={nuevaFrase} className="btn btn-outline-primary btn-sm mt-2">
          Nueva frase
        </button>
      </div>
    </div>
  );
};

export default QuoteBox;
