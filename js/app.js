var area = document.getElementById('insert-text');
var button = document.getElementById('save');
var list = document.getElementById('content-tweets');
var count = document.getElementById('count');
var lastScrollHeight = area.scrollHeight;

function stateLetter(countLetter) {
  var mediumLetter = 120;
  var minimumLetter = 130;
  var maxLetter = 140;

  if (countLetter > mediumLetter && countLetter < minimumLetter) {
    count.className = "blue";
  } else if(countLetter > minimumLetter && countLetter < maxLetter) {
    count.className = "red";
  } else if (countLetter > maxLetter) {
    count.classList.add('background-red');
  } else if(countLetter < mediumLetter) {
    count.className = "twitterBlue";
  }
}

var buttonEnable = function(count) {
  count != 140 && count >= 0 ? button.classList.remove('buttonDisabled') : button.classList.add('buttonDisabled');
}

var countLetters = function() {
  count.textContent = 140;
  var contentArea= (area.value).trim();
  var currentLetter = count.textContent - contentArea.length;
  count.textContent = currentLetter;
  stateLetter(contentArea.length);
  buttonEnable(count.textContent);
}

var showTime = function () {
  var f = new Date();
  var time = f.getHours() + ":" + f.getMinutes();
  var currentTime = '';
  f.getHours() <= 12 ? currentTime = time + ' AM' : currentTime = time + ' PM';
  return currentTime;
}

function showTweet (event) {
  event.preventDefault()
  if (area.value !== '') {
    var div = document.createElement('div');
    var p = document.createElement('p');
    p.textContent = area.value;
    var time = document.createElement('p');
    time.textContent = showTime();
    div.classList.add('content-twitter');
    div.appendChild(p);
    div.appendChild(time);
    list.appendChild(div);
    area.value = "";
  }
  button.classList.add('buttonDisabled');
  area.focus();
}

var resizeTextArea = function() {
  var limitRows = 8;
  var rows = parseInt(area.getAttribute("rows"));
  area.setAttribute("rows", "2");
  if (rows < limitRows && area.scrollHeight > lastScrollHeight) {
    rows++;
  } else if (rows > 2 && area.scrollHeight < lastScrollHeight) {
    rows--;
  }
  lastScrollHeight = area.scrollHeight;
  area.setAttribute("rows", rows);
}

window.onload = function() {
  count.textContent = 140;
  area.addEventListener('input', resizeTextArea);
  button.addEventListener('click', showTweet);
  area.addEventListener('keyup', countLetters);
}
