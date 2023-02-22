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
const playPrevSound = document.querySelector('.play-prev');
const playNextSound = document.querySelector('.play-next');
const pause = document.querySelector('.pause');
const playListPlayer = document.querySelector('.play-list');
//
//ширина элемента
const widthAudioTrack = document.querySelector('.audio-track').offsetWidth;





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
  // const quotes = 'https://l1senochek.github.io/momentum/js/data.json';
  const quotes = 'js/data.json';
  fetch(quotes).then(res => res.json()).then(data => {
    console.log('data', data);


  });
}
getQuotes();


// 6. Audio player

function playAudio() {
  // audio.src = '../assets/sounds/Metal Hellsinger - No Tomorrow ft Serj Tankian from System of a Down.mp3';
  // audio.src = 'https://l1senochek.github.io/momentum/assets/sounds/Metal%20Hellsinger%20-%20No%20Tomorrow%20ft%20Serj%20Tankian%20from%20System%20of%20a%20Down.mp3';

  if (!isPlay) {
    // audio.src = '../assets/sounds/Metal Hellsinger - No Tomorrow ft Serj Tankian from System of a Down.mp3';
    // audio.src = 'https://l1senochek.github.io/momentum/assets/sounds/Metal%20Hellsinger%20-%20No%20Tomorrow%20ft%20Serj%20Tankian%20from%20System%20of%20a%20Down.mp3';

    // audio.src = '../assets/sounds/Jin Hashimoto - Stand Proud.mp3';
    audio.src = playList[playNum].src
    // audio.currentTime = 0;
    switchingPause();
    audio.play();
    isPlay = true;
    console.log(isPlay);

  } else {
    isPlay = false;
    audio.pause();
    console.log(isPlay);

  }
}
audio.addEventListener('ended', function () {
  playNext()
});

play.addEventListener('click', playAudio);

function toggleBtn() {
  play.classList.toggle('pause');
}

function addBtn() {
  play.classList.add('pause');
}

function removeBtn() {
  play.classList.remove('pause');
}





// 5.1 switching track

function playNext() {

  playNum++;
  if (playNum > 3) {
    playNum = 0;
  };

  audio.src = playList[playNum].src;
  console.log('src', audio.src);

  console.log('playNum', playNum);

  isPlay = false;
  switchingPause(); // ??????

  if (isPlay) {


  } else {
    playAudio();

  }

  //.item-active

}

function playPrev() {
  playNum--;
  if (playNum < 0) {
    playNum = 3;
  };
  audio.src = playList[playNum].src;

  isPlay = false;
  switchingPause(); // ??????

  playAudio();
  // console.log('playNum', playNum);

}

// switching sound
function switchingSound() {

}

playPrevSound.addEventListener('click', playPrev);
playNextSound.addEventListener('click', playNext);

function switchingPause() {
  if (!isPlay) {
    play.addEventListener('click', toggleBtn);
    playPrevSound.addEventListener('click', addBtn);
    playNextSound.addEventListener('click', addBtn);
  } else {
    pause.addEventListener('click', removeBtn);
  }
}
switchingPause();

// 5.2 playlist

import playList from './playList.js';

audio.src = playList[playNum].src;
console.log('playList', playList, audio.src);

function createPlaylist() {

  playList.forEach(el => {
    const li = document.createElement('li');
    li.classList.add('play-item');
    let elementTitle = el.title;


    console.log('li', li);



    playListPlayer.appendChild(li);
    li.textContent = elementTitle;
  });
}

createPlaylist();

//ширина элемента
//document.querySelector('.myDiv').offsetWidth

function progressBarSound() {
  // widthAudioTrack = 
  console.log('widthAudioTrack', widthAudioTrack);
  console.log('.duration', audio.duration, playNum);
  console.log('.currentTime', audio.currentTime);


}
progressBarSound();
console.log('duration', playNum, playList[playNum].duration)
//convert
function formatTime(seconds) {
  let min = Math.floor((seconds / 60));
  let sec = Math.floor(seconds - (min * 60));
  if (sec < 10) {
    sec = `0${sec}`;
  };
  return `${min}:${sec}`;
};

