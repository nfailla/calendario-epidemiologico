import moment from 'moment';

export function calculateSemanaEpidemiologica(DD, MM, YYYY): any[]{

  if(esPrimeraAnioSiguiente(YYYY, MM, DD)){
    //return `Semana epidemiológica #1 del año siguiente`;
    return [1, YYYY+1]; //Semana epidemiológica 1 del año siguiente al de la fecha de consulta
  }

  // De lo contrario, se calcula el presente año.

  const primeroDeEnero = moment(`${YYYY}${MM}${DD}`).startOf('year');

  const diaUnoDeSemanaUno = primeroDeEnero.startOf('week');

  const diferenciaDias = moment(`${YYYY}${MM}${DD}`).diff(diaUnoDeSemanaUno, 'days');

  const semana = Math.floor(diferenciaDias / 7) + 1;

  //return `Semana epidemiológica #${semana}`;
  return [semana, YYYY]; //Semana epidemiológica ${semana} del mismo año que la fecha de consulta
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
