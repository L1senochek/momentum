"use strict"

// 1. Clock and calendar

const time = document.querySelector('.time');
const date = document.querySelector('.date');
//
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');
const body = document.querySelector('body');
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
//
const audio = new Audio();
const play = document.querySelector('.play');
const playPrev = document.querySelector('.play-prev');
const playNext = document.querySelector('.play-next');
const pause = document.querySelector('.pause');




let randomNum;
let isPlay = false;
let playNum = 0;

// const date = new Date();
// console.log(date);

// time and date
function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.textContent = currentTime;
  setTimeout(showTime, 1000);
  showDate();
  showGreeting();
}
showTime();

// date
function showDate() {
  const dateInMoment = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC' }; //hour: 'numeric', minute: 'numeric',
  const currentDate = dateInMoment.toLocaleDateString('en-US', options);
  date.textContent = currentDate;
}

// 2. Greeting

function getTimeOfDay() {
  const date = new Date();
  const hours = date.getHours();
  const arrTimeOfDay = ["morning", "afternoon", "evening", "night"];
  let currentTimeOfDay = '';
  if (hours >= 6 && hours <= 11) {
    return currentTimeOfDay = arrTimeOfDay[0];
  } else if (hours >= 12 && hours <= 17) {
    return currentTimeOfDay = arrTimeOfDay[1];
  } else if (hours >= 18 && hours <= 23) {
    return currentTimeOfDay = arrTimeOfDay[2];
  } else if ((hours >= 0 && hours <= 4 || hours === 24)) {
    return currentTimeOfDay = arrTimeOfDay[3];
  }
}

function showGreeting() {
  const greetingText = `Good ${getTimeOfDay()}`;
  greeting.textContent = greetingText;
}

// 2.1 The user can enter their name

function setLocalStorage() {
  localStorage.setItem('name', name.value);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem('name')) {
    name.value = localStorage.getItem('name');
  }
}
window.addEventListener('load', getLocalStorage);

// 3. Image Slider

function getRandomNum() {
  let min = Math.ceil(1);
  let max = Math.floor(20);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
randomNum = getRandomNum();


function setBg() {
  const img = new Image();
  let timeOfDay = getTimeOfDay();
  let bgNum = ('' + randomNum).padStart(2, "0");
  // body.style.backgroundImage = "url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/evening/18.jpg')";
  img.src = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/evening/18.jpg';
  img.onload = () => {
    body.style.backgroundImage = "url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/evening/18.jpg')";
  };
}

setBg();
function getSlideNext() {
  return randomNum += 1;
}

function getSlidePrev() {
  return randomNum -= 1;
}
slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);

// 4. Weather Widget

// https://api.openweathermap.org/data/2.5/weather?q=Минск&lang=en&appid=fde70cac528e6b7a31ec5fe4f655c39e&units=metric

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=fde70cac528e6b7a31ec5fe4f655c39e&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
  weatherDescription.textContent = data.weather[0].description;
}

function setCity(event) {
  if (event.code === 'Enter') {
    weatherIcon.className = 'weather-icon owf';
    getWeather();
    city.blur();
  }
}

console.log(getWeather());

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);

// 5. Widget "Quote of the day"

function getQuotes() {
  // const quotes = 'js/data.json';
  // const quotes = 'https://l1senochek.github.io/momentum/js/data.json';
  const quotes = 'js/data.json';
  fetch(quotes).then(res => res.json()).then(data => {
    console.log('data', data);


  });
}
getQuotes();


// 5. Audio player

function playAudio() {
  // audio.src = '../assets/sounds/Metal Hellsinger - No Tomorrow ft Serj Tankian from System of a Down.mp3';
  // audio.src = 'https://l1senochek.github.io/momentum/assets/sounds/Metal%20Hellsinger%20-%20No%20Tomorrow%20ft%20Serj%20Tankian%20from%20System%20of%20a%20Down.mp3';

  if (!isPlay) {
    audio.src = '../assets/sounds/Metal Hellsinger - No Tomorrow ft Serj Tankian from System of a Down.mp3';

    audio.currentTime = 0;
    audio.play();
    isPlay = true;
    console.log(isPlay);
  } else if (isPlay && isPlay === true) {
    isPlay = false;
    audio.pause();
    console.log(isPlay);

  }
}

play.addEventListener('click', playAudio);

function toggleBtn() {
  play.classList.toggle('pause');
}



function removeBtn() {
  play.classList.remove('pause');
}



function switchingPause() {
  if (!isPlay) {
    play.addEventListener('click', toggleBtn);
  } else {
    pause.addEventListener('click', removeBtn);
  }
}
switchingPause();

// 5.1 switching track

function playNext() {
  playNum++;
  playAudio();
}

function playPrev() {
  playNum--;
  playAudio();
}
// 5.2 playlist


import playList from './playList.js';
console.log(playList);

audio.src = playList[playNum].src;
