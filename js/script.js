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
const currentSongTitle = document.querySelector('.current-song-title');
//
const settings = document.querySelector('.settings');
const settingsContent = document.querySelector('.settings-content');
const photoSource = document.querySelector('.photo-source');
const languageTitle = document.querySelector('.language-title');
const en = document.querySelector('.en');
const ru = document.querySelector('.ru');
const be = document.querySelector('.be');
const imageSource = document.querySelector('.image-source');
const timeTitle = document.querySelector('.time-title');
const dataTitle = document.querySelector('.data-title');
const greetingTitle = document.querySelector('.greeting-title');
const quoteOfTheDayTitle = document.querySelector('.quote-of-the-day-title');
const weatherWidgetTitle = document.querySelector('.weather-widget-title');
const audioPlayerTitle = document.querySelector('.audio-player-title');
const ToDo = document.querySelector('.to-do');
const wrapperLanguage = document.querySelector('.wrapper-language');
const wrapperSettingsImage = document.querySelector('.wrapper-settings-image');
//
const unsplash = document.querySelector('.unsplash');
const flickr = document.querySelector('.flickr');
const github = document.querySelector('.github');
//
const checkboxWrapper = document.getElementById('wrapper-checkbox');
const checkboxAll = checkboxWrapper.elements;
const btnClear = document.querySelector('.btn-clear');
//
const checkTodoId = document.getElementById('check-todo');
const checkTodo = document.querySelector('.wrapper-todo-list');
const checkAudioPlayer = document.getElementById('check-audio-player');
const playerWrapper = document.querySelector('.player');
const checkQuote = document.getElementById('check-quote');
const wrapperQuote = document.querySelector('.wrapper-quote');
const checkData = document.getElementById('check-data');
const checkTime = document.getElementById('check-time');
const checkGreeting = document.getElementById('check-greeting');
const greetingContainer = document.querySelector('.greeting-container');
const checkWeather = document.getElementById('check-weather');
const weather = document.querySelector('.weather');
//
const toDoList = document.getElementsByClassName("todo-list");
const closeToDo = document.getElementsByClassName("close-todo");
const toDoListHeading = document.querySelector('.todo-list-heading');
const toDoInput = document.querySelector('.to-do-input');
const addToDoBtn = document.querySelector('.addToDoBtn');

let randomNum;
let isPlay = false;
let playNum = 0;
let updateTime;
let timeOfDay;

let source;

// 8. translation (en/ru or en/be)

let greetingTranslation = {
  en: ["Good morning", "Good afternoon", "Good evening", "Good night"],
  ru: ["Доброе утро", "Добрый день", "Добрый вечер", "Доброй ночи"],
  be: ["Доброе утро", "Добрый день", "Добрый вечар", "Доброй ночи"]
}

let weatherTranslation = {
  en: ["Wind speed", "m/s", "Humidity"],
  ru: ["Скорость ветра", "м/с", "Влажность"],
  be: ["Хуткасць ветру", "м/с", "Вільготнасць"]
}

let settingsTranslation = {
  en: ["Reset settings", "Photo source", "Language", "Image source", "Time", "Date", "Greeting", "Quote of the day", "Weather widget", "Audio player", "ToDo"],
  ru: ["Сброс настроек", "Источник фото", "Язык", "Источник изображения", "Время", "Дата", "Приветствие", "Цитата дня", "Виджет погоды", "Аудиоплеер", "Задачи"],
  be: ["Скід налад", "Крыніца фота", "Мова", "Крыніца выявы", "Час", "Дата", "Прывітанне", "Цытата дня", "Віджэт надвор'я", "Аўдыяплэер", "Задачы"]
}

let toDoTranslation = {
  en: ["To Do List", "Enter To Do", "Add", "Your task"],
  ru: ["Задачи", "Введите задачу", "Добавить", "Ваша задача"],
  be: ["Задачы", "Увядзіце задачу", "Дадаць", "Ваша задача"]
}

function translatePlaceholdertoDo() {
  if (currentLanguage === "ru") {
    toDoInput.placeholder = "Введите задачу";
  } else if (currentLanguage === "en") {
    toDoInput.placeholder = "Enter To Do";
  } else if (currentLanguage === "be") {
    toDoInput.placeholder = "Увядзіце задачу";
  }
}

function translateToDo() {
  toDoListHeading.textContent = `${toDoTranslation[currentLanguage][0]}`;
  toDoInput.textContent = `${toDoTranslation[currentLanguage][1]}`;
  addToDoBtn.textContent = `${toDoTranslation[currentLanguage][2]}`;
}

let currentLanguage = getLanguageLocalStorage();
translatePlaceholder();
translatePlaceholdertoDo();

en.addEventListener('click', changeEn);

function changeEn() {
  currentLanguage = "en";
  changeLanguageLocalStorage("en");
  translatePlaceholder();
  translatePlaceholdertoDo();
  getQuotes();
  settingsTranslationMenu();
  translateToDo();
}

ru.addEventListener('click', changeRu);

function changeRu() {
  currentLanguage = "ru";
  changeLanguageLocalStorage("ru");
  translatePlaceholder();
  translatePlaceholdertoDo();
  getQuotes();
  settingsTranslationMenu();
  translateToDo();
}

be.addEventListener('click', changeBe);

function changeBe() {
  currentLanguage = "be";
  changeLanguageLocalStorage("be");
  translatePlaceholder();
  translatePlaceholdertoDo();
  getQuotes();
  settingsTranslationMenu();
  translateToDo();
}

function translatePlaceholder() {
  if (currentLanguage === "ru") {
    name.placeholder = "Введите имя";
  } else if (currentLanguage === "en") {
    name.placeholder = "Enter name";
  } else if (currentLanguage === "be") {
    name.placeholder = "Увядзіце імя";
  }
}

function checkCurrentLanguage() {
  if (!currentLanguage ) {
    changeEn();
  } 
}

checkCurrentLanguage();

function changeLanguageLocalStorage(language) {
  localStorage.setItem(`language`, language);
}

function getLanguageLocalStorage() {
  return localStorage.getItem(`language`);
}

// 10. settings

settings.addEventListener('click', settingsClick);

function settingsClick() {
  if (settingsContent.style.height === "360px") {
    settingsContent.style.height = "0px";
    settingsContent.style.opacity = 0;
  } else {
    settingsContent.style.height = "360px";
    settingsContent.style.opacity = 1;
  }
  window.addEventListener('click', e => {
    const target = e.target
    if (!target.closest('.settings-content') && !target.closest('.settings')) {
      settingsContent.style.height = "0px";
      settingsContent.style.opacity = 0;
    }
  })
  document.addEventListener('keydown', function (e) {
    if (e.keyCode === 27) {
      settingsContent.style.height = "0px";
      settingsContent.style.opacity = 0;
    }
  });
}

btnClear.addEventListener('click', clearStorage);

function clearStorage() {
  localStorage.setItem('storedToDoList', '[]');
  removeToDoListAll();
  changeEn();
  name.value = localStorage.getItem('name', '');
  localStorage.setItem('city', 'Moscow');
  getWeather();
  resetCheckbox('check-todo');
  getItemFromLocalStorage('check-todo');
  saveCheckToLocalStorage(checkTodoId, checkTodo);
  resetCheckbox('check-audio-player');
  getItemFromLocalStorage('check-audio-player');
  saveCheckToLocalStorage(checkAudioPlayer, playerWrapper);
  resetCheckbox('check-weather');
  getItemFromLocalStorage('check-weather');
  saveCheckToLocalStorage(checkWeather, weather);
  resetCheckbox('check-quote');
  getItemFromLocalStorage('check-quote');
  saveCheckToLocalStorage(checkQuote, wrapperQuote);
  resetCheckbox('check-greeting');
  getItemFromLocalStorage('check-greeting');
  saveCheckToLocalStorage(checkGreeting, greetingContainer);
  resetCheckbox('check-data');
  getItemFromLocalStorage('check-data');
  saveCheckToLocalStorage(checkData, date);
  resetCheckbox('check-time');
  getItemFromLocalStorage('check-time');
  saveCheckToLocalStorage(checkTime, time);
}

function resetCheckbox(check) {
  localStorage.setItem(`${check}`, true);
}

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
  checkCurrentLanguage();
  const dateInMoment = new Date();
  const options = { weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC' }; //hour: 'numeric', minute: 'numeric',
  let current = currentLanguage + "-US";
  const currentDate = dateInMoment.toLocaleDateString(`${current}`, options);
  date.textContent = currentDate;
}

///////////////////////////////////////////////
// 2. Greeting

function getTimeOfDay() {
  const date = new Date();
  const hours = date.getHours();
  checkCurrentLanguage();
  if (hours >= 6 && hours <= 11) {
    timeOfDay = "morning";
    return greetingTranslation[currentLanguage][0];
  } else if (hours >= 12 && hours <= 17) {
    timeOfDay = "afternoon";
    return greetingTranslation[currentLanguage][1];
  } else if (hours >= 18 && hours <= 23) {
    timeOfDay = "evening";
    return greetingTranslation[currentLanguage][2];
  } else if ((hours >= 0 && hours <= 4 || hours === 24)) {
    timeOfDay = "night";
    return greetingTranslation[currentLanguage][3];
  }
}

function showGreeting() {
  const greetingText = `${getTimeOfDay()}`;
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

async function setBg() {
  imgSource();
  const img = new Image();
  //let timeOfDay = getTimeOfDay();
  let bgNum = ('' + randomNum).padStart(2, "0");
  if (source === 'unsplash') {
    img.src = await getLinkToImageUnsplash();
  } else if (source === 'flickr') {
    img.src = await getLinkToImageFlickr();
  } else if (source === 'github') {
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
  }
  img.onload = () => {
    body.style.backgroundImage = `url(${img.src})`;
  };
}
setBg();

unsplash.addEventListener('click', unsplashSet);

function unsplashSet() {
  source = 'unsplash';
  setBg();
}

flickr.addEventListener('click', flickrSet);

function flickrSet() {
  source = 'flickr';
  setBg();
}

github.addEventListener('click', githubSet);

function githubSet() {
  source = 'github';
  setBg();
}

function imgSource() {
  if (!source) {
    // source = 'unsplash';
    source = 'github';
  }
}

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

function localStoreCity() {
  localStorage.setItem('city', city.value);
}
window.addEventListener('beforeunload', localStoreCity);

function localRestoreCity() {
  if (localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
  } else {
    city.value = 'Moscow';
  }
}
window.addEventListener('load', localRestoreCity);

async function getWeather() {
  checkCurrentLanguage();
  localRestoreCity();
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${currentLanguage}&appid=fde70cac528e6b7a31ec5fe4f655c39e&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.message !=='city not found') { //!res.status == 200
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `${weatherTranslation[currentLanguage][0]}: ${data.main.humidity.toFixed(0)} ${weatherTranslation[currentLanguage][1]}`;
    humidity.textContent = `${weatherTranslation[currentLanguage][2]}: ${data.main.humidity.toFixed(0)} %`;
  } else {
    temperature.textContent = `wrong city entered!`;
    weatherDescription.textContent = '';
    wind.textContent = ``;
    humidity.textContent = ``;
  }
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
city.addEventListener('DOMContentLoaded' && 'keypress', setCity);

///////////////////////////////////////////////
// 5. Widget "Quote of the day"

function getQuotes() {
  checkCurrentLanguage();
  let quotes = `js/data_${currentLanguage}.json`; // const quotes = 'https://l1senochek.github.io/momentum/js/data.json';
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
    clearInterval(updateTime);
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
  currentTimeSong = 0;
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
  currentTimeSong = 0;
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

playItem.forEach(el => {
  el.addEventListener('click', clickSongPlay);
});

function removeItemActive() {
  let selectedSong = document.querySelectorAll('.item-active');
  selectedSong.forEach(el => {
    el.classList.remove('item-active');
  });
}

function clickSongPlay() {
  currentTimeSong = 0;
  progressTraking();
  playNum = ((this.className).toString()).slice(15, 16);
  playAudio();
}

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

function volumeTrackMute() {
  if (audio.muted === true) {
    volumeTrack.style.background = `url("../momentum/assets/img/volume_up.png")`;
    audio.muted = false;
  } else {
    volumeTrack.style.background = `url("../momentum/assets/img/mute.png")`;
    audio.muted = true;
  }
}

//progress tracking

function progressVolume() {
  for (let el of document.querySelectorAll('input[type="range"].sound-volume-progress')) {
    el.style.setProperty('--value', el.value);
    el.style.setProperty('--min', el.min == '' ? '0' : el.min);
    el.style.setProperty('--max', el.max == '' ? '100' : el.max);
    el.addEventListener('input', () => el.style.setProperty('--value', el.value));
  }
}
progressVolume();

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

function settingsTranslationMenu() {
  checkCurrentLanguage();
  btnClear.textContent = `${settingsTranslation[currentLanguage][0]}`;
  photoSource.textContent = `${settingsTranslation[currentLanguage][1]}`;
  languageTitle.textContent = `${settingsTranslation[currentLanguage][2]}`;
  imageSource.textContent = `${settingsTranslation[currentLanguage][3]}`;
  timeTitle.textContent = `${settingsTranslation[currentLanguage][4]}`;
  dataTitle.textContent = `${settingsTranslation[currentLanguage][5]}`;
  greetingTitle.textContent = `${settingsTranslation[currentLanguage][6]}`;
  quoteOfTheDayTitle.textContent = `${settingsTranslation[currentLanguage][7]}`;
  weatherWidgetTitle.textContent = `${settingsTranslation[currentLanguage][8]}`;
  audioPlayerTitle.textContent = `${settingsTranslation[currentLanguage][9]}`;
  ToDo.textContent = `${settingsTranslation[currentLanguage][10]}`;
}

languageTitle.addEventListener('click', clickDisplayLanguage);

function clickDisplayLanguage() {
  if (wrapperLanguage.style.height === "18px") {
    wrapperLanguage.style.height = "0px";
  } else {
    wrapperLanguage.style.height = "18px";
  }
}

const wrapperImageSource = document.querySelectorAll('.wrapper-image-source'); //    

imageSource.addEventListener('click', clickImageSource);

function clickImageSource() {
  if (wrapperImageSource.style.height === "54px") {
    wrapperImageSource.style.height = "0px";
    wrapperSettingsImage.style.height = "30px";
  } else {
    wrapperImageSource.style.height = "54px";
    wrapperSettingsImage.style.height = "60px";
  }
}

/////////////////////////////////////////////////////////
//checkedbox and localstorage settings

checkTodoId.addEventListener('change', () => saveCheckToLocalStorage(checkTodoId, checkTodo));
checkAudioPlayer.addEventListener('change', () => saveCheckToLocalStorage(checkAudioPlayer, playerWrapper));
checkWeather.addEventListener('change', () => saveCheckToLocalStorage(checkWeather, weather));
checkQuote.addEventListener('change', () => saveCheckToLocalStorage(checkQuote, wrapperQuote));
checkGreeting.addEventListener('change', () => saveCheckToLocalStorage(checkGreeting, greetingContainer));
checkData.addEventListener('change', () => saveCheckToLocalStorage(checkData, date));
checkTime.addEventListener('change', () => saveCheckToLocalStorage(checkTime, time));

function saveCheckToLocalStorage(check, item) {
  if (check.checked) {
    item.style.opacity = 1;
    localStorage.setItem(`${check.id}`, true);
    check.checked = true;
  } else {
    item.style.opacity = 0;
    localStorage.setItem(`${check.id}`, false);
    check.checked = false;
  }
}

/////////////////////////////////////////////////////////
//localstorage settings

function getItemFromLocalStorage(check) {
  let checked = JSON.parse(localStorage.getItem(`${check}`));
  if (checked !== null) {
    document.getElementById(`${check}`).checked = checked;
  }
}

getItemFromLocalStorage('check-todo');
getItemFromLocalStorage('check-audio-player');
getItemFromLocalStorage('check-weather');
getItemFromLocalStorage('check-quote');
getItemFromLocalStorage('check-greeting');
getItemFromLocalStorage('check-data');
getItemFromLocalStorage('check-time');

function loadFromLocalStorage() {
  if (localStorage.getItem('check-todo')) {
    saveCheckToLocalStorage(checkTodoId, checkTodo);
  }
  if (localStorage.getItem('check-audio-player')) {
    saveCheckToLocalStorage(checkAudioPlayer, playerWrapper);
  } 
  if (localStorage.getItem('check-weather')) {
    saveCheckToLocalStorage(checkWeather, weather);
  } 
  if (localStorage.getItem('check-quote')) {
    saveCheckToLocalStorage(checkQuote, wrapperQuote);
  } 
  if (localStorage.getItem('check-greeting')) {
    saveCheckToLocalStorage(checkGreeting, greetingContainer);
  } 
  if (localStorage.getItem('check-data')) {
    saveCheckToLocalStorage(checkData, date);
  } 
  if (localStorage.getItem('check-time')) {
    saveCheckToLocalStorage(checkTime, time);
  } 
}
loadFromLocalStorage();

/////////////////////////////////////////////////////////
// 9. unsplash api
// https://api.unsplash.com/photos/random?orientation=landscape&query=`nature`&client_id=lv43HadHxQCMuGJ_q3d2xS2qMOCFaXq-ZLy1T886TIg

async function getLinkToImageUnsplash() {
  const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${timeOfDay}&client_id=lv43HadHxQCMuGJ_q3d2xS2qMOCFaXq-ZLy1T886TIg`;
  const resultImg = await fetch(url);
  const dataImg = await resultImg.json();
  return dataImg.urls.full;
}

// flickr api
//https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=36dbb7f146c9be238bd70d50ee2d636a&tags=nature&extras=url_l&format=json&nojsoncallback=1

async function getLinkToImageFlickr() {
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=36dbb7f146c9be238bd70d50ee2d636a&tags=${timeOfDay}&extras=url_l&format=json&nojsoncallback=1`;
  const resultImg = await fetch(url);
  const dataImg = await resultImg.json();
  let randomNumberPhoto = Math.floor(Math.random() * 100);
  return dataImg.photos.photo[randomNumberPhoto].url_l;
}

/////////////////////////////////////////////////////////
// 11. ToDo

function createCrossToDo() {
  for (let j = 0; j < toDoList.length; j++) {
    let span = document.createElement("SPAN");
    let txt = document.createTextNode("\u00D7");
    span.className = "close-todo";
    span.appendChild(txt);
    toDoList[j].appendChild(span);
  }
  removeToDoList();
}
createCrossToDo();

function removeToDoList() {
  for (let i = 0; i < closeToDo.length; i++) {
    closeToDo[i].onclick = function () {
      let list = this.parentElement;
      list.remove();
      storeTasks();
    }
  }
}

const list = document.querySelector('.my-todo-list');

function toggleCheckedToDo() {
  list.addEventListener('click', function (e) {
    if (e.target.classList.contains('checked-todo')) {
      e.target.classList.remove('checked-todo');
    } else {
      if (e.target.className === 'todo-list') {
        e.target.classList.add('checked-todo');
      }
    }
  }, false);
}
toggleCheckedToDo();

const newElementToDoList = document.getElementById('newElementToDo');
newElementToDoList.addEventListener('click', newElementToDo);

function newElementToDo() {
  const li = document.createElement("li");
  let inputValue = document.getElementById("toDoInput").value;
  const text = document.createTextNode(inputValue);
  li.appendChild(text);
  li.classList.add('todo-list');
  if (inputValue === '') {
    alert("Enter To Do list!");
  } else {
    document.getElementById("myToDoList").appendChild(li);
  }
  document.getElementById("toDoInput").value = "";
  let span = document.createElement("SPAN");
  let txt = document.createTextNode("\u00D7");
  span.className = "close-todo";
  span.appendChild(txt);
  li.appendChild(span);
  removeToDoList();
  storeTasks();
}

//// localStorage

function storeTasks() {
  let arr = [];
  let lengthToDoList = document.getElementById('myToDoList').getElementsByTagName('li');
  for (let i = 0; i < lengthToDoList.length; i++) {
    arr.push(`${lengthToDoList[i].textContent.slice(0, -1)}`);
  }
  localStorage.setItem('storedToDoList', JSON.stringify(arr));
}

function restoreTasks() {
  const toDoList = document.getElementById('myToDoList');
  document.getElementById('toDoList').remove();
  let arrLocalStorage = JSON.parse(localStorage.getItem('storedToDoList'));

  if (arrLocalStorage !== null ) {
    for (let i = 0; i < arrLocalStorage.length; i++) {
      let li = document.createElement("li");
      li.innerHTML = arrLocalStorage[i];
      toDoList.appendChild(li);
      li.classList.add('todo-list');
      let span = document.createElement("SPAN");
      let txt = document.createTextNode("\u00D7");
      span.className = "close-todo";
      span.appendChild(txt);
      li.appendChild(span);
    }
  }
  removeToDoList();
}
restoreTasks();

function removeToDoListAll() {
  let lengthToDoList = document.getElementById('myToDoList').getElementsByTagName('li');
  for (let i = 0; i = lengthToDoList.length; i++) {
    document.querySelector('.todo-list').remove();
  }
}
