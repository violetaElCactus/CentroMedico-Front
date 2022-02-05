export const calcularEdad = (fecha_nacimiento) => {
  let edad = '';
  let today = new Date();
  let birthDate = new Date(fecha_nacimiento);
  let años = today.getFullYear() - birthDate.getFullYear();
  let m = today.getMonth() - birthDate.getMonth();
  let d = today.getDate() - birthDate.getDate();
  if (m < 0) {
    años--;
    m = 12 + m;
  } else if (m === 0 && d < 0) {
    años--;
  }
  edad = años + ' años, ' + m + ' meses';
  return edad;
};
