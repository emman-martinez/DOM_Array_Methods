const main = document.getElementById('main');
const url = 'https://randomuser.me/api';
let data = [];

/* ****************************** ADD USER ****************************** */
const getRandomUser = async() => {  // Fetch random user and add money
    try {

        const resp = await fetch(url);
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
/* ****************************** DOUBLE MONEY ****************************** */
const doubleMoney = () => { // Double eveyones money
    data = data.map((user) => {
        return { ...user, money: user.money * 2 };
    });
    updateDOM();
};
/* ****************************** SHOW ONLY MILLONAIRES ****************************** */
const showMillionaires = () => { // Filter only millionaires
    data = data.filter((user) => {
        return user.money > 1000000;
    });
    updateDOM();
};
/* ****************************** SORT BY RICHEST ****************************** */
const sortByRichest = () => { // Sort users by richest
    data.sort((a,b) => {
        return b.money-a.money;
    });
    updateDOM();
};
/* ****************************** CALCULATE ENTIRE WEALTH ****************************** */
const calculateWealth = () => { // Calculate the total
    const wealth = data.reduce((acc, user) => (acc += user.money), 0);
    const wealthElement = document.createElement('div');
    wealthElement.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthElement);
}
/* ************************************************************ */
const addData = (obj) => { // Add new obj to data arr
    data.push(obj);
    updateDOM();
};
/* ************************************************************ */
const updateDOM = (providedData = data) => { // Update DOM
    // Clean main div
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';
    providedData.forEach((item) => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);
    });
};
/* ************************************************************ */
const formatMoney = (money) => { // Format number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
    return '$'+(money).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};
/* ************************************************************ */
export { 
    getRandomUser,
    doubleMoney,
    showMillionaires,
    sortByRichest,
    calculateWealth
}