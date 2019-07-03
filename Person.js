class Person {

    constructor(name) {
      this._name = name;

      //home page stats
      this._numOfTexts;
      this._numOfWords;
      this._avgNumWordPerText;

      this._onlyWords = [];
      this._occOfWord;
      this._propOfWord;

      this._mostSentWord;
      this._mostSentWord2;
      this._mostSentWord3;

      //timeline stats
      this._onlyDates = [];
      this._onlyDatesObj = [];
      this._mostActiveDate;
      this._numDaysGreater;
      this._avgTextsPerDay;      
    }
    
    get disName(){
      var disName = this._name.slice(0, -1);			
			return disName.charAt(0).toUpperCase() + disName.slice(1);		
    }

    //Home page methods

    getEasyStats(){
      this._numOfTexts = this._onlyDates.length;
      this._numOfWords = this._onlyWords.length;
      this._avgNumWordPerText =  Math.round(this._numOfWords / this._numOfTexts * 10) / 10;

    }

    getMostSentWord(){
      
      //A list with only unique words
      var setList = [];
      //a word with a number of times it occurs attached
      var instance = {
        word: this._onlyWords[0],
        num: 1
      }
      var highest = instance;
      var highest2 = instance;
      var highest3 = instance;
  
      //for every word in the only words list
      for (var i = 0; i < this._onlyWords.length; i++){
        //if setlist does not contain the word in main list
        if (!setList.some(e => e.word === this._onlyWords[i])) {
          
          //add that word to the setlist
          var instance = {
            word: this._onlyWords[i],
            num: 1
          }
          setList.push(instance);
        }
        //else the word in main list is already in the setlist
        else{
          //find the index position within the setlist of the word in main list
          var index = setList.map(function(e) { return e.word; }).indexOf(this._onlyWords[i]);
          //increment the occurrence of that unique word
          setList[index].num++;
  
          //if the word we just incremented is greater than highest
          if(setList[index].num > highest.num){
            highest2 = highest;
            highest = setList[index];
          }
          //if the word we just incremented is greater than highest2 but less than highest
          else if (setList[index].num > highest2.num && setList[index].num < highest.num){
            highest3 = highest2;
            highest2 = setList[index];
          }
          else if (setList[index].num > highest3.num && setList[index].num < highest2.num){
            highest3 = setList[index];
          }
        }
      }
  
      this._mostSentWord = highest;
      this._mostSentWord2 = highest2;
      this._mostSentWord3 = highest3;
    }
    
    getOccurrence(word){
      var occurrenceOfWord = 0;
      for (var i = 0; i < this._onlyWords.length; i++){
        if (this._onlyWords[i] == word){
          occurrenceOfWord++;
        }
      }
      this._occOfWord = {
        num: occurrenceOfWord,
        word: word
      }
      this._propOfWord = {
        num: (occurrenceOfWord / this._numOfTexts * 100).toFixed(1),
        word: word
      }
    }

    //Timeline page methods

    getDatesWithNum(){

      //array of objects that stores the date and the number of times that date occurs
      var datesListObj = [];
      var numOcc = 0;
      var highestDate = {
        date: this._onlyDates[0],
        numOcc: 1
      };
      //current
      var i = 0;
      //start of a new date run
      var j = 0;
      //for every date in the list
      for (var i = 0; i < this._onlyDates.length; i ++){

        //if current date == start of date run
        if (this._onlyDates[j] == this._onlyDates[i]){
          numOcc++;
        }
        //if its either the last date or a different date
        if (i == this._onlyDates.length - 1 || this._onlyDates[i + 1] != this._onlyDates[j]){
          //set to start of the new date run
          j = i + 1;
          var instance = {
            date: this._onlyDates[i],
            numOcc: numOcc
          };
          if (instance.numOcc > highestDate.numOcc){
            highestDate = instance;
          }

          datesListObj.push(instance);
          numOcc = 0;
        }
       
      }
      this._onlyDatesObj = datesListObj;
      this._mostActiveDate = highestDate;
    }

    getAvgTextsPerDay(){
      
      var startDate = new Date(this._onlyDates[0]);
      var endDate = new Date(this._onlyDates[this._onlyDates.length - 1]);
   
      var differenceMilli = endDate - startDate;
      var dateDiff = differenceMilli / (1000 * 60 * 60 * 24);
  
      this._avgTextsPerDay = Math.round(this._numOfTexts / dateDiff * 10) / 10;     
    }
  
    getDaysMoreAct(pOther){
      var datesList1 = this._onlyDatesObj;
      var datesList2 = pOther._onlyDatesObj;
      var num = 0;
      var foundInOther;
      //for every item in p1List
      for (var i = 0; i < datesList1.length; i++){
        foundInOther = false;
        //for every item in p2List
        for (var j = 0; j < datesList2.length; j++){
          //if date is the same as p1List
          if (datesList1[i].date == datesList2[j].date){
            foundInOther = true;
            //compare number of texts
            if (datesList1[i].numOcc > datesList2[j].numOcc){
              num++;
            }
            //else if (datesList1[i].numOcc == datesList2[j].numOcc){
             //   numEqual++;
           // }
            //move onto next date in p1List
            break;
          }
        }
        //we didn't find the same date in p2 so number of texts is greater anyway
        if (!foundInOther){
          num++;
        }
      }
      this._numDaysGreater = num;
    }

  }
  module.exports = Person;