'use strict';

let allPics = [];

let myContainer = document.querySelector('section');
let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');
let image3 = document.querySelector('section img:nth-child(3)');

let clicks = 0;
let clicksAllowed = 25;

let indexArray = [];

function Pic(name,fileExtension = 'jpg'){
  this.name = name;
  this.src = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.clicks = 0;
  allPics.push(this);
}

function selectRandomPic(){
  return Math.floor(Math.random() * allPics.length);
}

// Put the pics in an array. The while loop is building an array of 6 pictures and the includes part there is making sure we are not adding a number already in the array.
function renderPics(){
  while (indexArray.length<6){
    let randomNumber = selectRandomPic();
    if (!indexArray.includes(randomNumber)){
      indexArray.push(randomNumber);
    }
  }
  // console.log(indexArray);
  let pic1 = indexArray.shift();
  let pic2 = indexArray.shift();
  let pic3 = indexArray.shift();
  // console.log(indexArray);

  image1.src = allPics[pic1].src;
  image2.src = allPics[pic2].src;
  image3.src = allPics[pic3].src;

  image1.alt = allPics[pic1].name;
  image2.alt = allPics[pic2].name;
  image3.alt = allPics[pic3].name;

  // To increment how many times each image has been viewed
  allPics[pic1].views++;
  allPics[pic2].views++;
  allPics[pic3].views++;
}

// In this function we are adding a click to the overall number of clicks in the survey so far and we are adding a click to the particular image we clicked on. We are also making the images move on to the next set by calling renderPics again.
function handlePicClick(event){
  if (event.target===myContainer){
    alert('Please click on an image');
  }
  // To count how many times an image is clicked on
  clicks++;
  console.log(clicks);
  let clickPic = event.target.alt;
  console.log(clickPic);
  console.log(allPics.length);


  for (let i=0; i<allPics.length; i++){
    console.log(i);
    if (clickPic === allPics[i].name){
      allPics[i].clicks++;
      console.log('CLICKED!!!!!!!!!!');
      break;
    }
  }

  if (clicks===clicksAllowed){
    myContainer.removeEventListener('click', handlePicClick);
    renderChart();
  } else{
    renderPics();
  }
  console.log(allPics);
}


new Pic('bag');
new Pic('banana');
new Pic('bathroom');
new Pic('boots');
new Pic('breakfast');
new Pic('bubblegum');
new Pic('chair');
new Pic('cthulhu');
new Pic('dog-duck');
new Pic('dragon');
new Pic('pen');
new Pic('pet-sweep');
new Pic('scissors');
new Pic('shark');
new Pic('sweep', 'png');
new Pic('tauntaun');
new Pic('unicorn');
new Pic('water-can');
new Pic('wine-glass');


renderPics();


function renderChart(){
  let picNames = [];
  let picClicks = [];
  let picViews = [];

  for (let i=0; i<allPics.length; i++){
    picNames.push(allPics[i].name);
    picClicks.push(allPics[i].clicks);
    picViews.push(allPics[i].views);
  }
  console.log(picNames,picClicks,picViews);

  let ctx = document.getElementById('myChart').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: picNames,
      datasets: [{
        label: '# of Views',
        data: picViews,
        backgroundColor: '#994a44',
        borderColor: 'rgba(80, 72, 275, 0.4)',
        borderWidth: 1
      },{
        label: '# of Clicks',
        data: picClicks,
        backgroundColor: '#00139a',
        borderColor: 'rgba(80, 72, 275, 0.4)',
        borderWidth: 1
      }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

myContainer.addEventListener('click', handlePicClick);


