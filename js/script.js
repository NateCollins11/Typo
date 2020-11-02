numbers_on = false
caps_freq = 0
wordstotype = [];

wordcount = 0;
charcount = 0;
timing = false;
timer = 0;

function clock() {
  timing = true
  timer += 1;
  document.getElementById("timer").innerHTML = String(60 - timer);
  if (timer == 60) {
    timing = false;
    calculatewpm();
  }
  if (timing == true) {
    console.log(timer);
    setTimeout(clock, 1000);
  }
}

function StartingWords() {
  maxwordlength = document.getElementById("wordlength").value;
  targlist = target.split(' ')
  console.log(targlist)
  
  targetviable = false
  for (x = 0; x < wordlist.length; x++){
    targwordvar = true
    console.log(wordlist[x])
    for (i = 0; i < targlist.length; i++){
      retarget = RegExp(targlist[i])
      console.log(retarget)
        if (retarget.test(wordlist[x]) == false || wordlist[x].length > maxwordlength){
          console.log(retarget + "not in " + wordlist[x])
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
          wordstotype.push(wordtoadd + " ");
          } else {
            wordstotype.push(wordlist[randint] + " ");
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
  
  console.log(targetviable, wordstotype);
}

function fillWordBox() {
  document.getElementById("wordbox").innerHTML = "";
  for (i = 0; i < wordstotype.length; i++) {
    bloo = document.getElementById("wordbox").innerHTML;

    document.getElementById("wordbox").innerHTML = bloo + wordstotype[i];
  }
}

function resetWords() {
  numbers_on = document.getElementById("numtoggle").checked
  caps_freq = document.getElementById("captoggle").value
  timer = 0;
  wordcount = 0;
  charcount = 0;
  document.getElementById("wordbox").innerHTML = "";
  wordstotype = [];
  target = document.getElementById("targets").value
  StartingWords();
  fillWordBox();
  if (timing == false){
  clock();
  }
}

input = document.getElementById("typobox");

input.addEventListener("keyup", function () {
  typecheck();
});

function typecheck() {
  targetword = wordstotype[0];
  typed = document.getElementById("typobox").value;
  if (typed.slice(0, typed.length) == targetword.slice(0, typed.length)) {
    document.getElementById("typobox").classList.add("right")
    document.getElementById("typobox").classList.remove("wrong")
    if (typed == targetword) {
      wordcount += 1;
      charcount += targetword.length;
      document.getElementById("typobox").value = "";
      wordstotype.shift();
      StartingWords();
      fillWordBox();
      console.log(charcount, wordcount);
    }
  } else {
    document.getElementById("typobox").classList.add("wrong")
    document.getElementById("typobox").classList.remove("right")
  }

  console.log(document.getElementById("typobox").value);
}

function calculatewpm() {
  document.getElementById("wpm").innerHTML = "wpm = " + charcount / 5;
}
