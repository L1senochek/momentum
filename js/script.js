"use strict"

///////////////////////////////////////////////
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
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const city = document.querySelector('.city');
//
const audio = new Audio();
const play = document.querySelector('.play');
const playPrevSound = document.querySelector('.play-prev');
const playNextSound = document.querySelector('.play-next');
const pause = document.querySelector('.pause');
const playListPlayer = document.querySelector('.play-list');
const trackTime = document.querySelector('.track-time');
const durationTime = document.querySelector('.duration-time');
const audioTrack = document.querySelector('.audio-track');
const changeQuote = document.querySelector('.change-quote');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const soundVolumeLine = document.querySelector('.sound-volume');
const volumeTrack = document.querySelector('.volume-track');
// const widthAudioTrack = document.querySelector('.audio-track').offsetWidth;
const currentSongTitle = document.querySelector('.current-song-title');

let randomNum;
let isPlay = false;
let playNum = 0;
let updateTime;

///////////////////////////////////////////////
// 1. Time and Date

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

///////////////////////////////////////////////
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

///////////////////////////////////////////////
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
  img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
  img.onload = () => {
    body.style.backgroundImage = `url(${img.src})`;
  };
}

setBg();
function getSlideNext() {
  if (randomNum >= 20) {
    randomNum = 1;
  } else {
    randomNum++;
  }
  setBg();
}

function getSlidePrev() {
  if (randomNum <= 1) {
    randomNum = 20;
  } else {
    randomNum--;
  }
  setBg();
}
slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);

///////////////////////////////////////////////
// 4. Weather Widget

function localStoreCity () {
  localStorage.setItem('city', city.value);
}
window.addEventListener('beforeunload', localStoreCity);

function localRestoreCity() {
  if(localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
  } else {
    city.value = 'Moscow';
  }
}
window.addEventListener('load', localRestoreCity);

async function getWeather() {
  localRestoreCity();
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=fde70cac528e6b7a31ec5fe4f655c39e&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(data, data.main);
  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
  weatherDescription.textContent = data.weather[0].description;
  wind.textContent = `Wind speed: ${data.main.humidity.toFixed(0)} m/s`;
  humidity.textContent = `Humidity: ${data.main.humidity.toFixed(0)} %`;
}

function setCity(event) {
  if (event.code === 'Enter') {
    localStoreCity();
    weatherIcon.className = 'weather-icon owf';
    getWeather();
    city.blur();
  }
}

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);

///////////////////////////////////////////////
// 5. Widget "Quote of the day"

function getQuotes() {
  const quotes = 'js/data.json'; // const quotes = 'https://l1senochek.github.io/momentum/js/data.json';
  fetch(quotes).then(res => res.json()).then(data => {
    randomNumber();
    let random = randomNumberQuotes;
    quote.textContent = data[random].text;
    author.textContent = data[random].author;
  });
}
getQuotes();

let randomNumberQuotes = Math.floor(Math.random() * 6);
let previousNumber = 187;

function randomNumber() {
  for (let i = 0; i < 1; i++) {
    if (randomNumberQuotes === previousNumber) {
      randomNumberQuotes = Math.floor(Math.random() * 6);
      i = -1;
    } else {
      previousNumber = randomNumberQuotes;
    }
  }
}

let curentDeg = 0;

function rotate() {
  changeQuote.style.transition = '1s';
  curentDeg += 180;
  changeQuote.style.rotate = `${curentDeg}deg`;
}
changeQuote.addEventListener('click', getQuotes);
changeQuote.addEventListener('click', rotate);

///////////////////////////////////////////////
// 6. Audio player

let previousSongPlay;
let currentTimeSong = 0;

function playAudio() {
  if (!isPlay) {
    clearInterval(updateTime);// audio.src = 'https://l1senochek.github.io/momentum/assets/sounds/Metal%20Hellsinger%20-%20No%20Tomorrow%20ft%20Serj%20Tankian%20from%20System%20of%20a%20Down.mp3';
    // audio.src = '../assets/sounds/Jin Hashimoto - Stand Proud.mp3';
    console.log('updateTime', updateTime);
    audio.src = playList[playNum].src;
    currentSongTitle.innerHTML = playList[playNum].title;
    previousSongPlay = playNum;
    addBtn();
    audio.currentTime = currentTimeSong;
    if (audio.currentTime === 0) {
      progressTraking();
    } 
    audio.play();
    removeItemActive();
    let selectedSong = document.querySelector(`.class${playNum}`);
    selectedSong.classList.add('item-active');
    isPlay = true;
    updateTime = setInterval(updateTimeSong, 1000);
  } else if (previousSongPlay === playNum && isPlay) {
    previousSongPlay = playNum;
    isPlay = false;
    removeBtn();
    audio.pause();
    currentTimeSong = audio.currentTime;
  } else {
    audio.src = playList[playNum].src;
    addBtn();
    audio.currentTime = currentTimeSong;
    audio.play();
    isPlay = true;
    removeItemActive();
    let selectedSong = document.querySelector(`.class${playNum}`);
    selectedSong.classList.add('item-active');
    previousSongPlay = playNum;
  }
}

audio.addEventListener('ended', function () {
  playNext();
});

play.addEventListener('click', playAudio);

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
  isPlay = false;
  addBtn();
  if (isPlay) {
  } else {
    playAudio();
  }
}

function playPrev() {
  playNum--;
  if (playNum < 0) {
    playNum = 3;
  };
  audio.src = playList[playNum].src;
  isPlay = false;
  addBtn();
  playAudio();
}

playPrevSound.addEventListener('click', playPrev);
playNextSound.addEventListener('click', playNext);

// 5.2 playlist

import playList from './playList.js';

audio.src = playList[playNum].src;

function createPlaylist() {
  let j = 0;
  playList.forEach(el => {
    const li = document.createElement('li');
    li.classList.add('play-item');
    let elementTitle = el.title;
    li.classList.add(`class${j}`);
    playListPlayer.appendChild(li);
    li.textContent = elementTitle;
    j++;
  });
  
}

createPlaylist();
const playItem = document.querySelectorAll(".play-item");
console.log('playItem', playItem);

playItem.forEach(el => {
  el.addEventListener('click', clickSongPlay);
});

function removeItemActive() {
  let selectedSong = document.querySelectorAll('.item-active');
  selectedSong.forEach(el => {
    el.classList.remove('item-active');
    /////////
  });
}

function clickSongPlay() {
  currentTimeSong = 0;
  progressTraking();
  playNum = ((this.className).toString()).slice(15, 16);
  playAudio();
}

console.log('duration', playNum, playList[playNum].duration)
//convert

let audioTrackId = document.getElementById('audioTrackId');
audioTrackId.addEventListener('change', trakingSong);

function trakingSong() {
  let trakingSong = audio.duration * (audioTrack.value / 100);
  audio.currentTime = trakingSong;
} 

function updateTimeSong() {
  let clickPositionTime = 0; 
  if (!isNaN(audio.duration)) {
    clickPositionTime = audio.currentTime * (100 / audio.duration);
    audioTrack.value = clickPositionTime;
    
    currentTimeSong = audio.currentTime;

    let currentMin = Math.floor(audio.currentTime / 60);
    let currentSec = Math.floor(audio.currentTime - currentMin * 60);
    let durationMin = Math.floor(audio.duration / 60);
    let durationSec = Math.floor(audio.duration - durationMin * 60);
    
    if (currentSec < 10) {
      currentSec = "0" + currentSec;
    }
    if (durationSec < 10) {
      durationSec = "0" + durationSec;
    }
    if (currentMin < 10) {
      currentMin = "0" + currentMin;
    }
    if (durationMin < 10) {
      durationMin = "0" + durationMin;
    }

    trackTime.textContent = currentMin + ":" + currentSec;
    durationTime.textContent = durationMin + ":" + durationSec;
    

  }
}
 
// sound volume
let soundVolumeId = document.getElementById('soundVolumeId');
soundVolumeId.addEventListener('change', soundVolume);

function soundVolume() {
  audio.volume = soundVolumeLine.value / 100;
}

volumeTrack.addEventListener('click', volumeTrackMute);

function volumeTrackMute () {
  if (audio.muted === true) {
    volumeTrack.style.background = `url("../momentum/assets/img/volume_up.png")`;
    audio.muted = false;
  } else {
    volumeTrack.style.background = `url("../momentum/assets/img/mute.png")`;
    audio.muted = true;
  }
}

//progress tracking

for (let el of document.querySelectorAll('input[type="range"].sound-volume-progress')) {
  el.style.setProperty('--value', el.value);
  el.style.setProperty('--min', el.min == '' ? '0' : el.min);
  el.style.setProperty('--max', el.max == '' ? '100' : el.max);
  el.addEventListener('input', () => el.style.setProperty('--value', el.value));
}
function progressTraking() {
  audioTrack.value = 0;
  for (let element of document.querySelectorAll('input[type="range"].audio-progress')) {
    element.style.setProperty('--value', element.value);
    element.style.setProperty('--min', element.min == '' ? '0' : element.min);
    element.style.setProperty('--max', element.max == '' ? '100' : element.max);
    element.addEventListener('input', () => element.style.setProperty('--value', element.value));
  }
}
progressTraking();

// 8. translation (en/ru or en/be)

let greetingTranslation = {
  en: ['Good',],
  ru: ['Добрый'],
  be: ['Добры']
}



