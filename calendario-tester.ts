import moment from 'moment';

import * as util from './util';

export function dibujar(YYYY){

  let semanas = []; // Array de arrays (52 a 53 semanas)
  let anioSiguiente = []; //Array (una sola semana como máx)

  //Año anterior. La primera semana epidemiológica del año próximo puede absorber como máximo del 29 al 31 de diciembre inclusive.
  for(let dia = 29; dia<=31; dia++){
    let anioAnterior = parseInt(YYYY) - 1;
    console.log('anioAnterior ' + anioAnterior);
    let semAnio: any[] = util.calculateSemanaEpidemiologica(dia, 12, anioAnterior); //DD, MM, YYYY
    console.log('semAnio prev año:');
    console.log(semAnio);

    if(semAnio[1] == YYYY){ //Si el día pertenece a la primera semana epidemiológica del próximo año:
      if(!semanas[0]){
        semanas[0] = [];
      }

      let nombreDia = traducir(moment(`${YYYY}${12}${dia}`).format('dddd'));
      semanas[0].push(`${nombreDia} ${dia}/${12}/${YYYY-1}`);
    }
  }

  //Año de la consulta
  for(let mes = 1; mes <= 12; mes++){
    let MM = ('0' + mes).slice(-2); //Formato MM: 01, 02 ... 12

    for(let dia = 1; dia <= 31; dia++){
      let DD = ('0' + dia).slice(-2); //Formato DD: 01, 02 ... 31

      let semAnio: any[] = util.calculateSemanaEpidemiologica(DD, MM, YYYY);

      if(semAnio){
        let nombreDia = traducir(moment(`${YYYY}${MM}${DD}`).format('dddd'));
          if (semanas[semAnio[0]-1] == undefined){
            semanas[semAnio[0]-1] = [];
          }
          semanas[semAnio[0]-1].push(`${nombreDia} ${DD}/${MM}/${YYYY}`);
      }
    }
  }

  //Año siguiente. La última semana epidemiológica del año de la consulta puede absorber como máximo del 1 al 3 de enero inclusive.
  for(let dia = 1; dia<=3; dia++){
    let proxAnio = parseInt(YYYY) + 1;
    console.log('proxAnio ' + proxAnio);
    let semAnio: any[] = util.calculateSemanaEpidemiologica('0' + dia, '01', proxAnio); //DD, MM, YYYY
    console.log('semAnio próx año:');
    console.log(semAnio);
    if(semAnio[1] == YYYY){ //Si el día pertenece a la última semana epidemiológica del próximo año:
      
      let nombreDia = traducir(moment(`${YYYY}${12}${dia}`).format('dddd'));
      semanas[semanas.length - 1].push(`${nombreDia} ${dia}/01/${proxAnio}`);
    }
  }


  semanas.forEach((sem, nroSemana) => {
    let SE = `SE #${nroSemana + 1}:
    `;
    sem.forEach(dia => {
      SE += `${dia}
      `;
    });

    console.log(SE);
  });

  // if(anioSiguiente.length){
  //   console.log('================================================');
  //   console.log('Año siguiente');
  //   anioSiguiente.forEach((sem, nroSemana) => {
  //     let SE = `SE #${nroSemana + 1}:
  //     `;
  //     sem.forEach(dia => {
  //       SE += `${dia}
  //       `;
  //     });

  //     console.log(SE);
  //   });
  // }
}


function traducir(name){
  switch(name){
    case 'Sunday':
      return 'Domingo';
      break;
    case 'Monday':
      return 'Lunes';
      break;
    case 'Tuesday':
      return 'Martes';
      break;
    case 'Wednesday':
      return 'Miércoles';
      break;
    case 'Thursday':
      return 'Jueves';
      break;
    case 'Friday':
      return 'Viernes';
      break;
    case 'Saturday':
      return 'Sábado';
      break;
    default:
      return name;
  }
}