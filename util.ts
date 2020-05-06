import moment from 'moment';

export function calculateSemanaEpidemiologica(DD: string, MM: string, YYYY: number): {semana, anio}{
  if(!moment(`${YYYY}${MM}${DD}`)){ //Verifica si es una fecha válida
    return;
  }

  if(_esUltimaSemanaAnioAnterior(DD, MM, YYYY))
  {
    return {
      semana: -1,
      anio: YYYY - 1
    };
  }

  if(_esPrimeraSemanaAnioSiguiente(DD, MM, YYYY))
  {
    return {
      semana: 1,
      anio: YYYY + 1
    };
  }

  //Resto del año

  const diaUnoDeSemanaUno = _calculateDiaUnoDeSemanaUno(DD, MM, YYYY);
  const diferenciaDias = moment(`${YYYY}${MM}${DD}`).diff(diaUnoDeSemanaUno, 'days');
  const nroSemana = Math.floor(diferenciaDias / 7) + 1;

  return {
    semana: nroSemana,
    anio: YYYY
  };
}

function _calculateDiaUnoDeSemanaUno(DD, MM, YYYY){
  const diaUno = moment(`${YYYY}${MM}${DD}`).startOf('year');
  const nombreDiaUno = moment(diaUno).format('dddd');

  return (
    nombreDiaUno == 'Thursday' ||
    nombreDiaUno == 'Friday'   ||
    nombreDiaUno == 'Saturday' ? diaUno.endOf('week').add(1, 'days') : diaUno.startOf('week')
  ).startOf('day');
}

function _esUltimaSemanaAnioAnterior(DD, MM, YYYY){
  const nombreDia = moment(`${YYYY}${MM}${DD}`).format('dddd');

  return MM == '01' &&
  (
    DD == '01' && (nombreDia == 'Saturday' || nombreDia == 'Friday'  || nombreDia == 'Thursday') ||
    DD == '02' && (nombreDia == 'Saturday' || nombreDia == 'Friday') ||
    DD == '03' &&  nombreDia == 'Saturday'
  );
}

function _esPrimeraSemanaAnioSiguiente(DD, MM, YYYY){
  const nombreDia = moment(`${YYYY}${MM}${DD}`).format('dddd');

  return MM == '12' &&
  (
    DD == '31' && (nombreDia == 'Sunday' || nombreDia == 'Monday'  || nombreDia == 'Tuesday') ||
    DD == '30' && (nombreDia == 'Sunday' || nombreDia == 'Monday') ||
    DD == '29' &&  nombreDia == 'Sunday'
  );
}

