"use strict"

// 1. Clock and calendar

const time = document.querySelector('.time');
const date = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');

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




