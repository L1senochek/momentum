"use strict"

// 1. Clock and calendar

const time = document.querySelector('.time');
const date = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');
const body = document.querySelector('body');
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
let randomNum;

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
  img.src = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/evening/18.jpg';// здесь ваш код 
  img.onload = () => {
    body.style.backgroundImage = "url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/evening/18.jpg')";// здесь тоже ваш код
  };
}

setBg();
function getSlideNext() {
  return randomNum += 1;
}

function getSlidePrev() {
  return randomNum -= 1;
}
// console.log(randomNum, getSlidePrev());
slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);

// 4. Weather Widget

// https://api.openweathermap.org/data/2.5/weather?q=Минск&lang=en&appid=fde70cac528e6b7a31ec5fe4f655c39e&units=metric

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=ru&appid=fde70cac528e6b7a31ec5fe4f655c39e&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  // console.log(data.weather[0].id, data.weather[0].description, data.main.temp);
  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
  // temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
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




