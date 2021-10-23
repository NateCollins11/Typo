numbers_on = false
caps_freq = 0
wordstotype = [];

wordcount = 0;
charcount = 0;
mistakes = 0;
streak = 0;
timing = false;
timer = 0;

curr_word_display = ''


function clock() {
  if (document.getElementById("speedtest").checked == true){
  timing = true
  timer += 1;
  document.getElementById("timer").innerHTML = String(60 - timer);
  if (timer == 60) {
    timing = false;
    calculatewpm();
  }

  if (timing == true) {
    setTimeout(clock, 1000);
  }
}
}

function StartingWords() {
  maxwordlength = document.getElementById("wordlength").value;
  targlist = target.split(' ')

  
  targetviable = false
  for (x = 0; x < wordlist.length; x++){
    targwordvar = true

    for (i = 0; i < targlist.length; i++){
      retarget = RegExp(targlist[i])
      // console.log(retarget)
        if (retarget.test(wordlist[x]) == false || wordlist[x].length > maxwordlength){

          targwordvar = false
        }
      }
      if (targwordvar == true){
      targetviable = true
      x = wordlist.length
      }
    
    }
  if (targetviable == true){
  while (wordstotype.length < 10) {
    randint = Math.floor(Math.random() * (wordlist.length + 300));
    
    if (randint < wordlist.length){
      if (wordlist[randint].length <= maxwordlength) {
        targwordvar = true
        for (i = 0; i < targlist.length; i++){
          retarget = RegExp(targlist[i])
        if (retarget.test(wordlist[randint]) == false){
          targwordvar = false}
        }
       if (targwordvar == true){
             
          if (Math.random() < caps_freq/10){
          firstletterupper = wordlist[randint].charAt(0).toUpperCase()
          wordtoadd = firstletterupper + wordlist[randint].slice(1)
          wordtoadd = addPunctuation(wordtoadd)
          wordstotype.push(wordtoadd + " ");
          } else {
            wordtoadd = addPunctuation(wordlist[randint])
            wordstotype.push(wordtoadd + " ");
          }
        
      
       }
    }
  } else if (numbers_on == true) {
    digits = Math.floor(Math.random() * 3) + 1
    if (digits == 1){
      number_word = String(Math.floor(Math.random() * 10))
    }
    if (digits == 2){
      number_word = String(Math.floor(Math.random() * 100))
    }
    if (digits == 3){
      number_word = String(Math.floor(Math.random() * 1000))
    }
    wordstotype.push(number_word + " ");
  }
  }
}
  
}

function fillWordBox() {
  document.getElementById("wordbox").innerHTML = "";
  curr_word_display = ''
  for (i = 0; i < wordstotype.length; i++) {

    curr_word_display += wordstotype[i];
  }
  document.getElementById("wordbox").innerHTML = curr_word_display;
}

function resetWords() {
  numbers_on = document.getElementById("numtoggle").checked
  caps_freq = document.getElementById("captoggle").value
  timer = 0;
  wordcount = 0;
  charcount = 0;
  streak = 0
  mistakes = 0;
  document.getElementById("wordbox").innerHTML = "";
  document.getElementById("corwordbox").innerHTML = "";
  wordstotype = [];
  target = document.getElementById("targets").value
  document.getElementById("typobox").value = ''
  StartingWords();
  fillWordBox();
  if (timing == false){
  clock();
  }
  if (document.getElementById("speedtest").checked == false){
    document.getElementById("timer").innerHTML = ''
  }

}

input = document.getElementById("typobox");

input.addEventListener("keyup", function () {
  typecheck();
});
input.addEventListener("keydown", function () {
  typecheck();
});

function typecheck() {
  targetword = wordstotype[0];
  typed = document.getElementById("typobox").value;
  if (typed.slice(0, typed.length) == targetword.slice(0, typed.length)) {

    document.getElementById("corwordbox").innerHTML = typed.slice(0, typed.length)
    
    document.getElementById("wordbox").innerHTML = curr_word_display.slice(typed.length, curr_word_display.length)
    
    document.getElementById("typobox").classList.add("right")
    document.getElementById("typobox").classList.remove("wrong")
    if (typed == targetword) {
      wordcount += 1;
      charcount += targetword.length;
      streak += targetword.length;
      document.getElementById("streak").innerHTML = String(streak)

      document.getElementById("typobox").value = "";
      wordstotype.shift();
      StartingWords();
      fillWordBox();
      document.getElementById("corwordbox").innerHTML = ''

    }
  } else if (document.getElementById("typobox").className == "right"){
    document.getElementById("typobox").classList.add("wrong")
    document.getElementById("typobox").classList.remove("right")
    mistakes += 1
    streak = 0
    document.getElementById("streak").innerHTML = String(streak)
  }
  document.getElementById("accuracy").innerHTML = String(Math.floor(100 *(charcount - mistakes)/charcount)) + '%'
  document.getElementById("streak").innerHTML = String(streak)
}

function calculatewpm() {
  document.getElementById("wpm").innerHTML = "wpm = " + charcount / 5;
}


function addPunctuation(word) {
 if (Math.random() < document.getElementById("punctoggle").value / 10){



puncDecider = Math.random()
console.log(word, puncDecider)
if (puncDecider > 0.8){
  word = word + ','
} else if (puncDecider > 0.6){
word = word + '.'
}else if (puncDecider > 0.5){
  word = word + '!'
  }else if (puncDecider > 0.4){
    word = word + '?'
    }else if (puncDecider > 0.2){
      word = '"' + word + '"'
      }else if (puncDecider > 0.15){
        word = word + ';'
        }else if (puncDecider > 0.1){
          word = word + ':'
          }else {
  word = '(' + word + ')'
}}

return word



}