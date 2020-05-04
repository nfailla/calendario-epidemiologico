// Import stylesheets
import './style.css';

// Import MomentJS
import moment from 'moment';
//import es from 'moment/locale/es';
//moment().localeData('es', es);

//const primerDia = moment('20191229', 'YYYYMMDD');

const primerDiaDelAnio = moment().startOf('year');
console.log(
  //primerDiaDelAnio.format('DD[/]MM[/]YYYY')
  primerDiaDelAnio.startOf('week').format('DD[/]MM[/]YYYY')
);

const diaUno = primerDiaDelAnio.startOf('week');

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

  const result = calculateSemanaEpidemiologica(diaUno, diaConsulta);
  appDiv.innerHTML = `<h4>${result}</h4>`;
});

function calculateSemanaEpidemiologica(primerDia, diaConsulta): string{
  const diferenciaDias = diaConsulta.diff(primerDia, 'days');

  const semana = Math.floor(diferenciaDias / 7) + 1;

  return `Semana epidemiológica #${semana}`;
}