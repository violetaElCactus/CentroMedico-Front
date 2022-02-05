const diasArray: string[] = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
];

const mesesArray: string[] = [
  'Enero',
  'Febero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
];
export const formatearFecha = (fecha: string): string => {
  const numeroDia = new Date(`${fecha} 10:10:10`).getDay();
  const nombreDia = diasArray[numeroDia];
  const dias: any = fecha.split('-');
  return `${nombreDia}, ${dias[2]} de ${mesesArray[dias[1] - 1]} de ${dias[0]}`;
};
