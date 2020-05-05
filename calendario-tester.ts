import moment from 'moment';

import * as util from './util';

export function dibujar(YYYY){

  let semanas = [[]]; // Array de arrays
  let anioAnterior = [[]];
  let anioSiguiente = [[]];

  for(let mes = 1; mes <= 12; mes++){
    let MM = ('0' + mes).slice(-2); //Formato MM: 01, 02 ... 12

    for(let dia = 1; dia <= 31; dia++){
      let DD = ('0' + dia).slice(-2); //Formato DD: 01, 02 ... 31

      let semAnio: any[] = util.calculateSemanaEpidemiologica(DD, MM, YYYY);

      if(semAnio){

        let nombreDia = traducir(moment(`${YYYY}${MM}${DD}`).format('dddd'));

        let txt = `SE #${semAnio[0]} del año ${semAnio[1]}`;


        if (semAnio[1] < YYYY){
          if (anioAnterior[semAnio[1]-1] == undefined){
            anioAnterior[semAnio[1]-1] = [];
          }
          anioAnterior[semAnio[1]-1].push(txt);

        } else if (semAnio[1] > YYYY){
          if (anioSiguiente[semAnio[1]-1] == undefined){
            anioSiguiente[semAnio[1]-1] = [];
          }
          anioSiguiente[semAnio[1]-1].push(txt);

        } else { //La semana epidemiológica de la fecha dada corresponde al año de dicha fecha



          if (semanas[semAnio[0]-1] == undefined){
            semanas[semAnio[0]-1] = [];
          }

          semanas[semAnio[0]-1].push(`${nombreDia} ${DD}/${MM}/${YYYY}`);


        }
      }
    }
  }

  // if(anioAnterior){
  //   console.log('Año anterior');
  //   anioAnterior.forEach((sem, nroSemana) => {
  //     let SE = `SE #${nroSemana + 1}:`;
  //     sem.forEach((dia, nroDia) => {
  //       SE += ` ${dia}, ${nroDia + 1}`;
  //     });

  //     console.log(SE);
  //   });
  //   console.log('================================================');
  // }

  semanas.forEach((sem, nroSemana) => {
    let SE = `SE #${nroSemana + 1}:`;
    sem.forEach(dia => {
      SE += ` ${dia}
      `;
    });

    console.log(SE);
  });

  if(anioSiguiente){
    console.log('================================================');
    console.log('Año siguiente');
    anioSiguiente.forEach((sem, index) => {
      console.log(sem);
    });
  }
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