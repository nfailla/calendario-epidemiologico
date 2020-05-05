import moment from 'moment';

import * as util from './util';

export function dibujar(YYYY){

  let semanas = [];
  let anioAnterior = [];
  let anioSiguiente = [];

  for(let mes = 1; mes <= 12; mes++){
    let MM = ('0' + mes).slice(-2); //Formato MM: 01, 02 ... 12

    for(let dia = 1; dia <= 31; dia++){
      let DD = ('0' + dia).slice(-2); //Formato DD: 01, 02 ... 31

      let semAnio: any[] = util.calculateSemanaEpidemiologica(DD, MM, YYYY);

      if(semAnio){
        let txt = `SE #${semAnio[0]} del año ${semAnio[1]}`;

        if (semAnio < YYYY){

        } else if (semAnio > YYYY){

        } else { //La semana epidemiológica de la fecha dada corresponde al año de dicha fecha
          
        }

      }
    }

  }


}