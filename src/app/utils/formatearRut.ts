export const formatearRut = (rut: string): string => {
  return rut
    .replace(/[.-]/g, '')
    .replace(/^(\d{1,2})(\d{3})(\d{3})(\w{1})$/, '$1.$2.$3-$4');
};
