class BarGraph{

    constructor(idElement, title, yAxisTitle, greatest, p1Name, p2Name){
      this._idElement = idElement;
      this._title = title;
      this._yAxisTitle = yAxisTitle;
      this._greatest = greatest;
      this._p1Name = p1Name;
      this._p2Name = p2Name;
  
      this._canvas = document.getElementById(this._idElement);
      this._ctx = this._canvas.getContext("2d");
      this._height = this._canvas.height;
      this._width = this._canvas.width;
      this._topMargin = this._height * 0.2;
      this._leftMargin = this._width * 0.22;
      this._botMargin = this._height * 0.1;
      this._NumTickMarks = 5;
      this._tickMarkSpacing = (this._height - this._topMargin - this._botMargin) / this._NumTickMarks;
      this._tickMarkPos = this._height - this._botMargin - this._tickMarkSpacing;
      this._labelTickMarksWidth = 0;
      this._tickMarkLength = 10;
      this._ifOuterTickMark = 0;
  
  
    }
    ignoreWarning(){

    }
  
    drawOutline(){
  
      this._ctx.clearRect(0, 0, this._width, this._height);
      //Draw Axis
      this._ctx.beginPath();
      this._ctx.moveTo(this._leftMargin, this._topMargin);
      this._ctx.lineTo(this._leftMargin, this._height - this._botMargin);
      this._ctx.stroke();
      this._ctx.beginPath();
      this._ctx.moveTo(this._leftMargin, this._height - this._botMargin);
      this._ctx.lineTo(this._width, this._height - this._botMargin);
      this._ctx.stroke();
      //Draw tickMarks
      for (var i = 0; i < this._NumTickMarks; i++) {
        this._ctx.beginPath();
        this._ctx.moveTo(this._leftMargin, this._tickMarkPos);
        this._ctx.lineTo(this._leftMargin + this._tickMarkLength, this._tickMarkPos);
        this._ctx.stroke();
        this._tickMarkPos -= this._tickMarkSpacing;
      }
      //reset tick mark pos
      this._tickMarkPos = this._height - this._botMargin - this._tickMarkSpacing;
  
      //Draw the title
      this._ctx.font = "20pt sans-serif";
      var labelTItleWidth = this._ctx.measureText(this._title).width;
      var labelTitleHeight = this._ctx.measureText('M').width;
      this._ctx.fillText(this._title, (this._width - this._leftMargin) / 2 +
      this._leftMargin - (labelTItleWidth / 2), this._topMargin / 2 + labelTitleHeight / 2 - 10);
    }
  
    drawYAxisLabels(){
      var needRounding = false;
      var isDecimal = false;
      //checks if it is a decimal
      for (var s = 0; s < this._greatest.toString().length; s++){
        if (this._greatest.toString().charAt(s) === '.'){
          isDecimal = true;
          break;
        }
      }
      //if it is not a decimal, round with +1
      if (isDecimal === false){
        //variable to test if the number has all zeros starting from jth digit
        var j = 1;
        var roundPos = 0;
        //If 5 digit number, we round from the second digit
        if (this._greatest.toString().length === 5){
          j = 2;
          roundPos = 1;
        }
        //for every character in the number starting at rounding position
        for (var i = j; i < this._greatest.toString().length; i++)
        {
          //if the char is 0, no need to round
          if (this._greatest.toString().charAt(i) === '0'){
            needRounding = false;
          }
          else {
            needRounding = true;
            break;
          }
        }
        if (needRounding){
          //round the greatest amount to a clean whole number
          this.actualRounding(1, roundPos);
        }
      }
      else{
        //2 decimal places
        if (this._greatest.toString().charAt(this._greatest.toString().length - 3) === '.'){
          this.actualRounding(0.01, this._greatest.toString().length - 2);
        }
        //one DP
        else{
          this.actualRounding(0.1, 0);
        }
      }
  
      //Write the yAxis labels
  
      var yAxisNum = Math.round((this._greatest / this._NumTickMarks) * 10) / 10;
      var yAxisBase = yAxisNum;
      this._ctx.fillStyle = "black";
      this._ctx.font = "10pt sans-serif";
      for (i = 0; i < this._NumTickMarks; i++)
      {
        //width of the text of the label
        this._labelTickMarksWidth = this._ctx.measureText(yAxisNum.toLocaleString()).width;
        this._ctx.fillText(yAxisNum.toLocaleString(), this._leftMargin - this._labelTickMarksWidth - 3 + this._ifOuterTickMark, this._tickMarkPos + 5);
        this._tickMarkPos -= this._tickMarkSpacing
        yAxisNum += yAxisBase;
      }
    }
    
    actualRounding(increment, pos){
      //get a copy of the char that we want to end up rounding up to
      var greatestCopy = this._greatest.toString().charAt(pos);
      //keep increasing this._greatest until it is rounded up
      while (greatestCopy === this._greatest.toString().charAt(pos)){
        this._greatest += increment;
  
      }
    }
  
    drawYaxisTitle(){
  
      //Write Yaxis title
      this._ctx.font = "12pt sans-serif";
      var yaxisTitleLength = this._yAxisTitle.length;
      //number of pixels of half the length of the title
      var midpoint = Math.round(yaxisTitleLength / 2);
      //variable for amount of pixels up from the midpoint before ' '
      var spaceUp = yaxisTitleLength;
      //variable for amount of pixels down from the midpoint before ' '
      var spaceDown = 0;
      //get index position of closest space either way from midpoint
      for (var i = midpoint; i < yaxisTitleLength; i++){
        if (this._yAxisTitle.charAt(i) === ' '){
          spaceUp = i;
          break;
        }
      }
      for (i = midpoint; i >= 0; i--){
        if (this._yAxisTitle.charAt(i) === ' '){
          spaceDown = i;
          break;
        }
      }
      //which way is closest to the midpoint
      var closestUp = spaceUp - midpoint;
      var closestDown = midpoint - spaceDown;
      //the index position for the new line
      var newLine = spaceUp;
      if (closestDown < closestUp){
        newLine = spaceDown;
      }
      var line1 = "";
      var line2 = "";
      //store the first line
      for (i = 0; i < yaxisTitleLength; i++){
        if (i <= newLine){
        line1 += this._yAxisTitle.charAt(i);
        }
        //store the 2nd line
        else{
          line2 += this._yAxisTitle.charAt(i);
        }
      }
      var line1Width = this._ctx.measureText(line1).width;
      var line2Width = this._ctx.measureText(line2).width;
      var line1Height = this._ctx.measureText("M").width;
      var gap = 3;
      //write the lines
      this._ctx.fillText(line1, (this._leftMargin - this._labelTickMarksWidth) / 2 - line1Width / 2,
        this._height / 2 - line1Height / 2 - gap);
      this._ctx.fillText(line2, (this._leftMargin - this._labelTickMarksWidth) / 2 - line2Width / 2,
        this._height / 2 + line1Height / 2 + gap);
    }
  
  }
  

export default BarGraph;