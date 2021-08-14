'use strict';

console.log ('Hello');

let hours = ['6 a.m.', '7 a.m.', '8 a.m.', '9 a.m.', '10 a.m.', '11 a.m.', '12 p.m.', '1 p.m.', '2 p.m.', '3 p.m.', '4 p.m.', '5 p.m.', '6 p.m.', '7 p.m.'];

// First we are going to build an array object. The store information will get pushed/stored here. 
// We also have functions to calculate things based on the store information but due to their length we will create them later and add them with the prototype function.

let storeArray = [];

function Store(name, min, max, avg){
  this.name = name;
  this.min = min;
  this.max = max;
  this.avg = avg;
  this.hourlyCustomers = [];
  this.hourlyCookies = [];
  this.dailySum = 0;

  storeArray.push(this);
}

console.log (storeArray);


Store.prototype.hourlyCustomersMath= function(){

  for (let i=0; i<hours.length; i++){
    let randomCustomers = Math.floor(Math.random() * (this.max - this.min) + this.min);
    this.hourlyCustomers.push(randomCustomers);
  }
  console.log (this.hourlyCustomers);
};

Store.prototype.hourlyCookiesMath = function(){
  for (let i=0; i<hours.length; i++){
    let cookiesInHour = Math.round(this.hourlyCustomers[i]*this.avg);
    this.hourlyCookies.push(cookiesInHour);
  }
  console.log(this.hourlyCookies);
};

Store.prototype.dailyTotal = function(){
  let sum = 0;
  for (let i=0; i<hours.length; i++){
    sum +=this.hourlyCookies[i];
  }
  this.dailySum+=sum;
  console.log (this.dailySum);
  console.log(sum);
  return sum;
};

// Here is where we begin our logic for building the table. We do it in three parts- head, body, and footer. Each part needs to be linked to the HTML aka. Appended to the DOM.

function renderHead(){
  const storeTable = document.querySelector('tbody');

  let headTr = document.createElement('tr');
  storeTable.appendChild(headTr);

  let thName = document.createElement('th');
  thName.textContent = 'Store Name';
  headTr.appendChild(thName);

  for (let i=0; i<hours.length; i++){
    let thHours = document.createElement('th');
    thHours.textContent = hours[i];
    headTr.appendChild(thHours);
  }

  let thSum = document.createElement('th');
  thSum.textContent = 'Total Cookies Per Day';
  headTr.appendChild(thSum);
}

Store.prototype.render = function(){
  const storeTable = document.querySelector('tbody');

  let bodyTr = document.createElement('tr');
  storeTable.appendChild(bodyTr);

  let tdName = document.createElement('td');
  tdName.textContent = this.name;
  bodyTr.appendChild(tdName);

  for (let i=0; i<this.hourlyCookies.length; i++){
    let td = document.createElement('td');
    td.textContent = this.hourlyCookies[i];
    bodyTr.appendChild(td);
  }

  let tdSum = document.createElement('td');
  tdSum.textContent = this.dailySum;
  bodyTr.appendChild(tdSum);
};

function renderFoot(){
  const storeTable = document.querySelector('tbody');

  let footTr = document.createElement('tr');
  footTr.setAttribute('id','tableFooter');
  storeTable.appendChild(footTr);

  let tfName = document.createElement('td');
  tfName.textContent = 'Totals';
  footTr.appendChild(tfName);


  for (let i=0;i<hours.length; i++){
    let pants = 0;
    for (let j=0; j<storeArray.length; j++){
      pants += storeArray[j].hourlyCookies[i];
    }
    let tfCookies = document.createElement('td');
    tfCookies.textContent = pants;
    footTr.appendChild(tfCookies);
  }

  let train = 0;
  for (let i=0; i<storeArray.length; i++){
    train += storeArray[i].dailySum;
  }
  let tfFinal = document.createElement('td');
  tfFinal.textContent = train;
  footTr.appendChild(tfFinal);
}

// Here we need an array within an array. We need it to find all of the hours from one time across all of the stores.
// Then we need another beautiful disaster function to sum up all of the totals (dailySum).
// Both of these beauties need to live in the footer part of the table.

// // Test Code - This was to see if we could append anything to the page.
// let test = document.createElement('h1');
// test.textContent= 'Test';
// storeTable.appendChild(test);


// Here we are defining our new functions for the table.

new Store(
  // name, min, max, avg
  'Seattle',
  23,
  65,
  6.3
);

new Store(
  // name, min, max, avg
  'Tokyo',
  3,
  24,
  1.2
);

new Store(
  // name, min, max, avg
  'Dubai',
  11,
  38,
  3.7
);

new Store(
  // name, min, max, avg
  'Paris',
  20,
  38,
  2.3
);

new Store(
  // name, min, max, avg
  'Lima',
  2,
  16,
  4.6
);


// Here is where we are calling all of our functions. We have to do this so the math will run and the information will show up on the page.

function renderAll(){
  // Here we need to call render header once before the for loop
  renderHead();
  for (let i=0;i<storeArray.length; i++){
    storeArray[i].hourlyCustomersMath();
    storeArray[i].hourlyCookiesMath();
    storeArray[i].dailyTotal();
    storeArray[i].render();
  }
  // Here we need to call render footer. After the for loop.
  renderFoot();
}

renderAll();


// Add Store Form (Yes step 3 happens before step 2 in terms of how the function is written, the steps are in order of how the function gets read).

// Step 1 - Grabbing the Info
let storeForm = document.querySelector('form');

// Step 3 - Formulas for what you would like to do with the information:

function handleSubmit(event){
  event.preventDefault();
  let storeName = event.target.storeName.value;
  let minCust = parseInt(event.target.minCust.value);
  let maxCust = parseInt(event.target.maxCust.value);
  let avgCust = parseInt(event.target.avgCust.value);

  let newStore = new Store(
    storeName,
    minCust,
    maxCust,
    avgCust
  );

  console.log(newStore);
  console.log(storeArray);
  storeArray[storeArray.length-1].hourlyCustomersMath();
  storeArray[storeArray.length-1].hourlyCookiesMath();
  storeArray[storeArray.length-1].dailyTotal();
  storeArray[storeArray.length-1].renderFormStore();

  let recalculate = document.getElementById('tableFooter');
  recalculate.remove();

  renderFoot();
}

// Step 2- Telling the Program to incorporate the info:
storeForm.addEventListener('submit', handleSubmit);


// We need to have a new area to render the function or make the new information show up on the page. Notice how we needed to give the footer an id (tableFooter) to place the new information ahead of it(below) and how we needed to remove the existing information in the footer to recalculate it in the render call above.

Store.prototype.renderFormStore = function(){
  const storeTable = document.querySelector('tbody');
  let footer = document.getElementById('tableFooter');

  let bodyTr = document.createElement('tr');
  storeTable.insertBefore(bodyTr, footer);

  let tdName = document.createElement('td');
  tdName.textContent = this.name;
  bodyTr.appendChild(tdName);

  for (let i=0; i<this.hourlyCookies.length; i++){
    let td = document.createElement('td');
    td.textContent = this.hourlyCookies[i];
    bodyTr.appendChild(td);
  }

  let tdSum = document.createElement('td');
  tdSum.textContent = this.dailySum;
  bodyTr.appendChild(tdSum);
};

