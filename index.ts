// Import stylesheets
import './style.css';

import moment from 'moment';
import es from 'moment/locale/es';

// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');

let asd = 'holache';
//let ahora = moment();
//appDiv.innerHTML = `<h1>${moment}</h1>`;

moment().localeData('es', es);

console.log(moment().format('dddd'));