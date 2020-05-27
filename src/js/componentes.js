import { 
    getRandomUser, 
    doubleMoney,
    showMillionaires,
    sortByRichest,
    calculateWealth
} from './helper';
import './../css/componentes.css';

const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

const eventos = () => {
    addUserBtn.addEventListener('click', getRandomUser);
    doubleBtn.addEventListener('click', doubleMoney);
    sortBtn.addEventListener('click', sortByRichest);
    showMillionairesBtn.addEventListener('click', showMillionaires);
    calculateWealthBtn.addEventListener('click', calculateWealth);
};

const init = () => {
    console.log('DOM Array Methods');
    getRandomUser();
    getRandomUser();
    getRandomUser();
    eventos();
};

export {
    init
} 