'use strict';

let allPics = [];

let myContainer = document.querySelector('section');
let myButton = document.querySelector('section + div');
let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');
let image3 = document.querySelector('section img:nth-child(3)');

let clicks = 0;
let clicksAllowed = 1;

function Pic(name,fileExtension = 'jpg'){
  this.name = name;
  this.src = `img/${name}.${fileExtension}`;
  this.views = 0;
  this.clicks = 0;
  allPics.push(this);
}

function selectRandomPic(){
  return Math.round(Math.random() * allPics.length);
}

// Put the pics in an array. Then the includes thing is to sort out the case where there are two pics calling for the same thing.Includes check - if not included you can push the new img into the array.
function renderPics(){
  let pic1 = selectRandomPic();
  let pic2 = selectRandomPic();
  let pic3 = selectRandomPic();
  let images = [];

  // Here we use an includes loop to make sure the pictures are not repeated.
  images.push(pic1);

  if (images.includes(pic2)===true){
    pic2 = selectRandomPic();
  } else{
    images.push(pic2);
  }
  if (images.includes(pic3)===true){
    pic3 = selectRandomPic();
  } else{
    images.push(pic3);
  }

  image1.src = allPics[pic1].src;
  image2.src = allPics[pic2].src;
  image3.src = allPics[pic3].src;

  console.log(pic1,pic2,pic3);

  image1.alt = allPics[pic1.name];
  image2.alt = allPics[pic2.name];
  image3.alt = allPics[pic3.name];

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
  let clickPic = event.target.alt;
  // console.log(clickPic);

  for (let i=0; i<allPics.length; i++){
    if (clickPic === allPics[i].name){
      allPics[i].clicks++;
      break;
    }
  }
  if (clicks===clicksAllowed){
    myButton.className = 'clicks-allowed';
    // This is pushing the clicks allowed class when this feature is active.
    myContainer.removeEventListener('click', handlePicClick);
  }
  renderPics();
}


function handleButtonClick(){
  console.log ('hi');
  let ul = document.querySelector('ul');
  for (let i=0; i<allPics.length; i++){
    let li = document.createElement('li');
    console.log(i);
    li.textContent = `${allPics[i].name} had ${allPics[i].views} views and was clicked ${allPics[i].clicks} times`;
    ul.appendChild(li);
  }
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

console.log(allPics);
renderPics();

myContainer.addEventListener('click', handlePicClick);
myButton.addEventListener('click', handleButtonClick);

