// Import stylesheets
import './style.css';

// Import MomentJS
import moment from 'moment';
import es from 'moment/locale/es';

const appDiv: HTMLElement = document.getElementById('app');

moment().localeData('es', es);

//console.log(moment().format('dddd'));


const primerDia = moment('20191229', 'YYYYMMDD');
const hoy = moment();

console.log('hoy: ' + hoy.format('dddd DD [de] MMMM [de] YYYY'));
console.log('primerDia: ' + primerDia.format('dddd DD [de] MMMM [de] YYYY'));
console.log('fromNow: ' + primerDia.fromNow());

console.log('diferencia en días: ' + hoy.diff(primerDia, 'days'));


