// Import stylesheets
import './style.css';

// Import MomentJS
import moment from 'moment';
//import es from 'moment/locale/es';
//moment().localeData('es', es);

//const primerDia = moment('20191229', 'YYYYMMDD');

//const primerDiaDelAnio = moment().startOf('year');
/*console.log(
  //primerDiaDelAnio.format('DD[/]MM[/]YYYY')
  primerDiaDelAnio.startOf('week').format('DD[/]MM[/]YYYY')
);*/

//const diaUno = primerDiaDelAnio.startOf('week');

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

  const result = calculateSemanaEpidemiologica([DD, MM, YYYY]);
  appDiv.innerHTML = `<h4>${result}</h4>`;
});

function calculateSemanaEpidemiologica([DD, MM, YYYY]): string{

  /* Si faltan menos de 7 días para el próximo año, y éste año termina un domingo-lunes-martes, el presente día es parte de la semana 1 del próximo año... */
  const finDeAnio = moment(`${YYYY}${MM}${DD}`).endOf('year');
  const diasHastaFinDeAnio = Math.abs(moment(`${YYYY}${MM}${DD}`).diff(finDeAnio, 'days'));

  const nombreDiaFinDeAnio = finDeAnio.format('dddd');
  const nombreDiaConsulta = moment(`${YYYY}${MM}${DD}`).format('dddd');
  console.log('nombreDia: ' + nombreDiaFinDeAnio);
  if(diasHastaFinDeAnio < 7 /*&&
     nombreDiaFinDeAnio === 'Sunday' ||
     nombreDiaFinDeAnio === 'Monday' ||
     nombreDiaFinDeAnio === 'Tuesday'*/
  ){
    return `Semana epidemiológica #fff`;
  }

  // De lo contrario, se calcula el presente año.

  const primerDiaDelAnio = moment(`${YYYY}${MM}${DD}`).startOf('year');
  //console.log('primerDiaDelAnio: ' + primerDiaDelAnio.format('DD[/]MM[/]YYYY'))
  const diaUno = primerDiaDelAnio.startOf('week');

  const diferenciaDias = moment(`${YYYY}${MM}${DD}`).diff(diaUno, 'days');

  const semana = Math.floor(diferenciaDias / 7) + 1;

  return `Semana epidemiológica #${semana}`;
}