const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("Double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const lessThan1lakhBtn = document.getElementById("less-than-1lac");
const oneto10lakhBtn = document.getElementById("1-10lakh");
const sortBtnDes = document.getElementById("sort-descending");
const sortBtnAsc = document.getElementById("sort-ascending");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];
getRandomUser();
getRandomUser();
getRandomUser();
// fetch random user and add money

async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };
  addData(newUser);
}

// double money

function doubleMoney() {
  data = data.map((user) => {
    return {
      ...user,
      money: user.money * 2,
    };
  });
  updateDOM();
}

// sort by richest

function sortRichestDes() {
  data.sort((a, b) => b.money - a.money);
  updateDOM();
}
function sortRichestAcs() {
  data.sort((a, b) => a.money - b.money);
  updateDOM();
}

// FIlter

function showMillionaires() {
  data = data.filter((user) => user.money > 1000000);

  updateDOM();
}

function lessThan1lakh() {
  data = data.filter((user) => user.money < 100000);

  updateDOM();
}

function oneto10lakh() {
  data = data.filter((user) => user.money > 100000 && user.money < 1000000);

  updateDOM();
}

// calculate wealth
function calculateWealth() {
  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  const wealthEl = document.createElement("div");
  wealthEl.innerHTML = `<h3>Total Wealth: <strong> ${formatMoney(
    wealth
  )}</strong></h3>`;

  main.appendChild(wealthEl);
  //   updateDOM();
}

// Add object to data arr

function addData(obj) {
  data.push(obj);

  updateDOM();
}

// update DOM

function updateDOM(providedData = data) {
  // clear main div
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

// filter/FOrmat money

function formatMoney(number) {
  //   return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,"); // 12,345.67
  return (
    "Rs." + " " + number.toFixed(2).replace(/(\d)(?=(\d{2})+\d\.)/g, "$1,")
  ); // "12,34,567.80"
}

// Event listeners

addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtnDes.addEventListener("click", sortRichestDes);
sortBtnAsc.addEventListener("click", sortRichestAcs);
showMillionairesBtn.addEventListener("click", showMillionaires);
lessThan1lakhBtn.addEventListener("click", lessThan1lakh);
oneto10lakhBtn.addEventListener("click", oneto10lakh);
calculateWealthBtn.addEventListener("click", calculateWealth);
