export const generarHorarios = (horaInicio: number, horaFin: number) => {
  const listaHorarios: string[] = [];
  const listaMinutos: string[] = ['00', '15', '30', '45'];
  for (let i = horaInicio; i < horaFin; i++) {
    if (i < 10) {
      listaMinutos.map((minutos) => {
        listaHorarios.push(`0${i}:${minutos}`);
      });
    } else {
      listaMinutos.map((minutos) => {
        listaHorarios.push(`${i}:${minutos}`);
      });
    }
  }
  listaHorarios.push(`${horaFin}:00`);
  return listaHorarios;
};
