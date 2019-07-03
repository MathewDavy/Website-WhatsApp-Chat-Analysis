import BarGraph from './BarGraph';
class BarGraphTimeline extends BarGraph {
    constructor(idElement, title, yAxisTitle, greatest, p1DatesList, p2DatesList, convoLength, p1Name, p2Name) {
      super(idElement, title, yAxisTitle, greatest, p1Name, p2Name);
      this._p1Dates = p1DatesList;
      this._p2Dates = p2DatesList;
      this._convoLength = convoLength;
      this._width = this._canvas.width - 100;
      this._botMargin = this._height * 0.30;
      this._tickMarkSpacing = (this._height - this._topMargin - this._botMargin) / this._NumTickMarks;
      this._tickMarkPos = this._height - this._botMargin - this._tickMarkSpacing;
      this._tickMarkLength = -10;
      this._ifOuterTickMark = this._tickMarkLength;
      this.drawOutline();
      this.drawYAxisLabels();
      this.drawYaxisTitle();
      this.drawBars();
  
    }
  
    drawBars(){
      var earliestDate = new Date(this._p1Dates[0].date);
      var p2Date = new Date(this._p2Dates[0].date);
      if (p2Date < earliestDate){
        earliestDate = p2Date;
      }
  
      var margin = (this._width - this._leftMargin) * 0.025;
      //the number of pixels allocated to each day for the bars
      var graphWidth = (this._width - this._leftMargin - margin - margin) / this._convoLength;
      //draw the x axis dates
      this.drawXaxisLabels(earliestDate, margin, graphWidth);
  
      //draw the bars
      var xPos = this._leftMargin + margin;
      var yAxisScale = (this._height - this._botMargin - this._topMargin) / this._greatest;
      var indexP1 = 0;
      var indexP2 = 0;
      var barWidth = graphWidth / 4;
      this._ctx.lineWidth = barWidth;
      //loop through every day starting from earliest and check if a text was sent that day
      for (var i = 0; i <= this._convoLength + 1; i++){
        if (i === 42){
         
        }
        //check P1
        if (this._p1Dates[indexP1].date === this.formatDate(earliestDate, false)){
          this._ctx.strokeStyle = "#FF0000";
          this._ctx.beginPath();
          this._ctx.moveTo(xPos - barWidth / 2, this._height - this._botMargin);
          this._ctx.lineTo(xPos - barWidth / 2, this._height - this._botMargin - (this._p1Dates[indexP1].numOcc * yAxisScale));
          this._ctx.stroke();
          if (indexP1 < this._p1Dates.length - 1){
            indexP1++;
          }
        }
        //check p2
        if (this._p2Dates[indexP2].date === this.formatDate(earliestDate, false)){
          this._ctx.strokeStyle = "#0000FF";
          this._ctx.beginPath();
          this._ctx.moveTo(xPos + barWidth / 2, this._height - this._botMargin);
          this._ctx.lineTo(xPos + barWidth / 2, this._height - this._botMargin - (this._p2Dates[indexP2].numOcc * yAxisScale));
          this._ctx.stroke();
          if (indexP2 < this._p2Dates.length - 1){
            indexP2++;
          }
        }
        xPos += graphWidth;
        earliestDate.setDate(earliestDate.getDate() + 1);
        //earliestDate = earliestDate;
      }
  
    }
  
    drawXaxisLabels(earliestDateFormatted, margin, graphWidth){
      var earliestDateCopy = new Date(earliestDateFormatted);;
      var numTickMarksX = 7;
      var xPos = this._leftMargin + margin;
      var incrementDateBy = Math.floor(this._convoLength / (numTickMarksX - 1));
      if (incrementDateBy === 0){
        incrementDateBy = 1;
      }
      //Account for extra tick marks needed due to rounding down
      numTickMarksX += Math.floor((this._convoLength - (incrementDateBy * (numTickMarksX - 1))) / incrementDateBy);
      //Account for extra days after the final tick mark
      var extraDaysPixels = (this._convoLength - (incrementDateBy * (numTickMarksX - 1))) * graphWidth;
      var mainSpacing = (this._width - this._leftMargin - (extraDaysPixels)) / (numTickMarksX - 1);
      //main spacing less accounting for the space at the start
      var tickMarkSpacing = mainSpacing - ((margin * 2) / (numTickMarksX -1));
  
      var earliestDate;
  
      for (var i = 0; i < numTickMarksX; i++){
        //draw the tickmarks
        this._ctx.beginPath();
        this._ctx.moveTo(xPos, this._height - this._botMargin);
        this._ctx.lineTo(xPos, this._height - this._botMargin + 10);
        this._ctx.stroke();
  
        //write the date labels
        earliestDate = this.formatDate(earliestDateCopy, true);
        var dateWidth = this._ctx.measureText(earliestDate).width;
        var dateHeight = this._ctx.measureText("M").width;
        this._ctx.fillText(earliestDate, xPos - dateWidth / 2, this._height - this._botMargin + dateHeight - this._tickMarkLength + (dateHeight / 2));
        xPos += tickMarkSpacing;
  
        earliestDateCopy.setDate(earliestDateCopy.getDate() + incrementDateBy);
      }
  
      //write the legend
      this.writeLegend(this._p1Name);
      this.writeLegend(this._p2Name);
    }
  
    writeLegend(name){
      var legendText = " = " + name;
      var legendHeight = this._ctx.measureText("M").width;
      var legendWidth = this._ctx.measureText(" = " + this._p1Name).width + legendHeight;
      this._ctx.fillStyle = "#FF0000";
      var yPosLegend = this._height * 0.85;
      if (name === this._p2Name){
        this._ctx.fillStyle = "#0000FF";
        yPosLegend += legendHeight + (legendHeight / 2);
      }
      var xPosLegend = this._leftMargin + (((this._width - this._leftMargin) / 2) - legendWidth / 2 );
  
      this._ctx.fillRect(xPosLegend, yPosLegend, legendHeight, legendHeight);
      this._ctx.fillStyle = "#000000";
      this._ctx.fillText(legendText, xPosLegend + legendHeight, yPosLegend + legendHeight);
    }

    formatDate(date, NZ){
      var dd = date.getDate();
      var mm = date.getMonth() + 1;
      if (dd.toString().length === 1){
        dd = "0" + dd;
      }
      if (mm.toString().length === 1){
        mm = "0" + mm;
      }
      var y = date.getFullYear();
      var yShort = y.toString()[2];
      yShort += y.toString()[3];
      if (NZ){
        return dd + '/'+ mm + '/'+ yShort;
      }
      else{
        return mm + '/'+ dd + '/'+ yShort;
      }
      
    }  
}

export default BarGraphTimeline