// Import stylesheets
import './style.css';

// Import MomentJS
import moment from 'moment';
import es from 'moment/locale/es';

moment().localeData('es', es);

const appDiv: HTMLElement = document.getElementById('app');
const input: HTMLElement = document.getElementById('input');
const btn: HTMLElement = document.getElementById('btn');

input.value = moment().format('DD[/]MM[/]YYYY');

btn.addEventListener('click', () => {
  console.log('hizo click');
});



const primerDia = moment('20191229', 'YYYYMMDD');
const hoy = moment();

console.log('hoy: ' + hoy.format('dddd DD [de] MMMM [de] YYYY'));
console.log('primerDia: ' + primerDia.format('dddd DD [de] MMMM [de] YYYY'));
console.log('fromNow: ' + primerDia.fromNow());

const diferencia = hoy.diff(primerDia, 'days');
console.log('diferencia en días: ' + diferencia);

let ret = calculateSemanaEpidemiologica(diferencia);
console.log(ret);


function calculateSemanaEpidemiologica(cantDiasFromInicio: number): string{
  let semana = Math.floor(cantDiasFromInicio / 7) + 1;

  return `Semana epidemiológica #${semana}`;
}


appDiv.innerHTML = `<h4>${ret}</h4>`;