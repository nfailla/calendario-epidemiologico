import moment from 'moment';

export function calculateSemanaEpidemiologica([DD, MM, YYYY]): string{

  if(esPrimeraAnioSiguiente(YYYY, MM, DD)){
    return `Semana epidemiológica #1 del año siguiente`;
  }

  // De lo contrario, se calcula el presente año.

  const primeroDeEnero = moment(`${YYYY}${MM}${DD}`).startOf('year');

  const diaUnoDeSemanaUno = primeroDeEnero.startOf('week');

  const diferenciaDias = moment(`${YYYY}${MM}${DD}`).diff(diaUnoDeSemanaUno, 'days');

  const semana = Math.floor(diferenciaDias / 7) + 1;

  return `Semana epidemiológica #${semana}`;
}

export function esPrimeraAnioSiguiente(YYYY, MM, DD) {
  const ultimoDia = moment(`${YYYY}${MM}${DD}`).endOf('year');
  const nombreUltimoDia = ultimoDia.format('dddd');

  const dia = moment(`${YYYY}${MM}${DD}`);
  const diferenciaDias = ultimoDia.diff(dia, 'days');

  return (nombreUltimoDia === 'Sunday' && diferenciaDias === 0) ||
    (nombreUltimoDia === 'Monday' && diferenciaDias <= 1) ||
    (nombreUltimoDia === 'Tuesday' && diferenciaDias <= 2)
  ;
}
