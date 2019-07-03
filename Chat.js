class Chat {

    constructor() {

      this._p1Dates;
      this._p2Dates;
      this._startDate;
      this._endDate;
      this._length;
      this._numDaysAct;
    }
 
    getLength(p1Dates, p2Dates){
      
      this._p1Dates = p1Dates;
      this._p2Dates = p2Dates;
      var start;
      var end;
      var p1StartDate = new Date(p1Dates[0].date);
      var p2StartDate = new Date(p2Dates[0].date);
      var p1EndDate = new Date(p1Dates[p1Dates.length - 1].date);
      var p2EndDate = new Date(p2Dates[p2Dates.length - 1].date);
      

      if (p1StartDate > p2StartDate){
        start = p2StartDate;
      }
      else{
        start = p1StartDate;
      }
      if (p1EndDate > p2EndDate){
        end = p1EndDate;
      }
      else{
        end = p2EndDate;
      }

      var differenceMilli = end - start;
      var dateDiff = Math.ceil(differenceMilli / (1000 * 60 * 60 * 24));
      this._length = dateDiff.toLocaleString();

      //convert to nicely formatted
      var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      start = start.toLocaleDateString("en-US", options);
      end = end.toLocaleDateString("en-US", options);
      
      this._startDate = start;
      this._endDate = end;

      this.getNumDaysAct();
  
    }

    getNumDaysAct(){
      //get the number of days p1 was active
      var counter = this._p1Dates.length;
      var found;
      //for every date in p1
      for (var i = 0; i < this._p1Dates.length; i++){
        found = false;
        //for every date in p2
        for (var j = 0; j < this._p2Dates.length; j++){
          //if the p2 date is the same as the p1 date, don't increment counter
          if (this._p2Dates[j].date === this._p1Dates[i].date){
            found = true;
            break;
          }
        }
        if (!found){
          counter++;
        }       
      }
      this._numDaysAct = counter;
    }

  }
module.exports = Chat;