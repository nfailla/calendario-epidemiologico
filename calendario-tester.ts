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
          if (semanas[semAnio[1]-1] == undefined){
            semanas[semAnio[1]-1] = [];
          }
          semanas[semAnio[1]-1].push(txt);
        }
      }
    }
  }

  if(anioAnterior){
    console.log('Año anterior');
    anioAnterior.forEach((sem, nroSemana) => {
      let SE = `SE #${nroSemana + 1}:`;
      sem.forEach((dia, nroDia) => {
        SE += ` ${dia}, ${nroDia + 1}`;
      });

      console.log(SE);
    });
    console.log('================================================');
  }

  semanas.forEach((sem, index) => {
    console.log(sem);
  });

  if(anioSiguiente){
    console.log('================================================');
    console.log('Año siguiente');
    anioSiguiente.forEach((sem, index) => {
      console.log(sem);
    });
  }
}