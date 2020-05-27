import './../css/componentes.css';

const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data =[];

// Fetch random user and add money
const getRandomUser = async() => {
    try {

        const resp = await fetch('https://randomuser.me/api');
        if(!resp.ok) throw 'No se pudo realizar la petición';
        const data = await resp.json();
        const user = data.results[0];
        const newUser = {
            name: `${user.name.first} ${user.name.last}`,
            money: Math.floor(Math.random() * 1000000)
        }
        addData(newUser);

    } catch(err) {

        throw err;

    }
};

// Double eveyones money
const doubleMoney = () => {
    data = data.map((user) => {
        return { ...user, money: user.money * 2 };
    });
    updateDOM();
};

// Sort users by richest
const sortByRichest = () => {
    data.sort((a,b) => {
        return b.money-a.money;
    });
    updateDOM();
};

// Filter only millionaires
const showMillionaires = () => {
    data = data.filter((user) => {
        return user.money > 1000000;
    });
    updateDOM();
};

// Calculate the total
const calculateWealth = () => {
    const wealth = data.reduce((acc, user) => (acc += user.money), 0);
    const wealthElement = document.createElement('div');
    wealthElement.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthElement);
}

// Add new obj to data arr
const addData = (obj) => {
    data.push(obj);
    updateDOM();
};

// Update DOM
const updateDOM = (providedData = data) => {
    // Clean main div
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';
    providedData.forEach((item) => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);
    });
};

// Format number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
const formatMoney = (money) => {
    return '$'+(money).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};

const eventos = () => {
    console.log('Event Listeners!')
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