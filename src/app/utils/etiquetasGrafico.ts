const primerSemestre: string[] = [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
];
const segundoSemestre: string[] = [
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];

export const establecerEtiquetasGrafico = (fecha: string): string[] => {
  const fechaTemp = fecha.split('-');
  return parseInt(fechaTemp[1]) === 1 ? primerSemestre : segundoSemestre;
};
