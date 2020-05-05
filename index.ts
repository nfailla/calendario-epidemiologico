import './style.css';
import moment from 'moment';
import * as util from './util';

import * as calendario from './calendario-tester';

const appDiv: HTMLElement = document.getElementById('app');
const input: HTMLElement = document.getElementById('input');
const btn: HTMLElement = document.getElementById('btn');
const inputCalendario: HTMLElement = document.getElementById('input-calendario');
const btnCalendario: HTMLElement = document.getElementById('btn-calendario');

input['value'] = moment().format('DD[/]MM[/]YYYY');

input.addEventListener('keyup', (event) => {
  if(event.keyCode === 13){
    btn.click();
  }
});

btn.addEventListener('click', () => {
  const [DD, MM, YYYY] = input['value'].split('/');
  const diaConsulta = moment(`${YYYY}${MM}${DD}`);

  const result = util.calculateSemanaEpidemiologica([DD, MM, YYYY]);
  appDiv.innerHTML = `<h4>${result}</h4>`;
});

inputCalendario.addEventListener('keyup', (event) => {
  if(event.keyCode === 13){
    btnCalendario.click();
  }
});

btnCalendario.addEventListener('click', () => {
  const YYYY = inputCalendario['value'];

  calendario.dibujar(YYYY);
});