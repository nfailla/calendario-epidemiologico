import './style.css';
import moment from 'moment';
import * as util from './util';

const appDiv: HTMLElement = document.getElementById('app');
const input: HTMLElement = document.getElementById('input');
const btn: HTMLElement = document.getElementById('btn');

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

