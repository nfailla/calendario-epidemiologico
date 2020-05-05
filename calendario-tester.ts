import moment from 'moment';

import * as util from './util';

export function dibujar(YYYY){

  let semanas = []; // Array de arrays (52 a 53 semanas)

  //Año anterior. La primera semana epidemiológica del año próximo puede absorber como máximo del 29 al 31 de diciembre inclusive.
  for(let dia = 29; dia<=31; dia++){
    let anioAnterior = parseInt(YYYY) - 1;
    let semAnio: {semana, anio} = util.calculateSemanaEpidemiologica(dia.toString(), '12', anioAnterior, 'anterior'); //DD, MM, YYYY

    if(semAnio.anio == YYYY){ //Si el día pertenece a la primera semana epidemiológica del próximo año:
      if(!semanas[0]){
        semanas[0] = [];
      }

      semanas[0].push(`${dia}/${12}/${anioAnterior}`);
    }
  }

  //Año de la consulta
  for(let mes = 1; mes <= 12; mes++){
    let MM = ('0' + mes).slice(-2); //Formato MM: 01, 02 ... 12

    for(let dia = 1; dia <= 31; dia++){
      let DD = ('0' + dia).slice(-2); //Formato DD: 01, 02 ... 31

      let semAnio: {semana, anio} = util.calculateSemanaEpidemiologica(DD, MM, YYYY);

      if(semAnio && semAnio.anio == YYYY){
        if (semanas[semAnio.semana - 1] == undefined){
          semanas[semAnio.semana - 1] = [];
        }

        semanas[semAnio.semana - 1].push(`${DD}/${MM}/${YYYY}`);
      }
    }
  }

  //Año siguiente. La última semana epidemiológica del año de la consulta puede absorber como máximo del 1 al 3 de enero inclusive.
  for(let dia = 1; dia<=3; dia++){
    let proxAnio = parseInt(YYYY) + 1;
    let semAnio: {semana, anio} = util.calculateSemanaEpidemiologica('0' + dia, '01', proxAnio, 'siguiente'); //DD, MM, YYYY
    if(semAnio.anio == YYYY){ //Si el día pertenece a la última semana epidemiológica del próximo año:
      semanas[semanas.length - 1].push(`${'0' + dia}/01/${proxAnio}`);
    }
  }

  console.log(`|-----------| - - Do - - | - - Lu - - | - - Ma - - | - - Mi - - | - - Ju - - | - - Vi - - | - - Sá - - `);

  semanas.forEach((sem, nroSemana) => {
    let SE = `| - SE ${('0' + (nroSemana + 1)).slice(-2)} - `;
    sem.forEach(dia => {
      SE += `| ${dia} `;
    });

    console.log(SE);
  });
}
