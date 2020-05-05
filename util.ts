import moment from 'moment';

export function calculateSemanaEpidemiologica(DD: string, MM: string, YYYY: number): {semana, anio}{
  if(YYYY == 2019){
    let debug = true;
  }
  //Valido que la fecha exista (p. ej. que no sea 29/02 en un ano no bisiesto, o una fecha inválida)
  if(!moment(`${YYYY}${MM}${DD}`)){
    return;
  }

  if(esPrimeraAnioSiguiente(YYYY, MM, DD)){
    return {
      semana: 1,
      anio: YYYY + 1
    }; //Semana epidemiológica 1 del año siguiente al de la fecha de consulta
  }

  // De lo contrario, se calcula el presente año.

  const diaUnoDeSemanaUno = moment(`${YYYY}${MM}${DD}`).startOf('year').startOf('week');
  const diferenciaDias = moment(`${YYYY}${MM}${DD}`).diff(diaUnoDeSemanaUno, 'days');

  if(diferenciaDias >= 4 && diferenciaDias <= 6){
    return {
      semana: -1,
      anio: YYYY - 1
    }; //Última semana del año pasado (si es 53 o 52 se verifica del otro lado)
  }

  const nroSemana = Math.floor(diferenciaDias / 7) + 1;

  return {
    semana: nroSemana,
    anio: YYYY
  }; //Semana epidemiológica #nroSemana del mismo año que la fecha de consulta
}

export function esPrimeraAnioSiguiente(YYYY, MM, DD) {
  const ultimoDia = moment(`${YYYY}${MM}${DD}`).endOf('year').subtract(1, 'days'); //endOf('year') devuelve el primero de enero del próximo año, necesitamos restarle un día
  const nombreUltimoDia = ultimoDia.format('dddd');

  const dia = moment(`${YYYY}${MM}${DD}`);
  const diferenciaDias = ultimoDia.diff(dia, 'days');

  return (nombreUltimoDia === 'Sunday' && diferenciaDias === 0) ||
    (nombreUltimoDia === 'Monday' && diferenciaDias <= 1) ||
    (nombreUltimoDia === 'Tuesday' && diferenciaDias <= 2)
  ;
}
