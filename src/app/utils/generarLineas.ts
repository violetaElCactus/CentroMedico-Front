export const generarLineasFirma = (termino: string) => {
  const tam_termino = termino.length + 3;
  let linea = '';
  for (let i = 0; i < tam_termino; i++) {
    linea = linea + '_';
  }
  return linea;
};
