import BarGraph from './BarGraph';
class BarGraph2Bars extends BarGraph{
  
    constructor(idElement, title, yAxisTitle, greatest, p1Num, p2Num, p1Name, p2Name){
      super(idElement, title, yAxisTitle, greatest, p1Name, p2Name)
      this._p1Num = p1Num;
      this._p2Num = p2Num;
  
      this.drawOutline();
      this.drawYAxisLabels();
      this.drawYaxisTitle();
      this.drawBars();
    }
    drawBars(){
      //Set the XPos of the two graphs
      var graphWidth = (this._width - this._leftMargin) / 15;
      var bar1XPos = (this._width - this._leftMargin) / 3 - (graphWidth / 2) + this._leftMargin;
      var bar2XPos = ((this._width - this._leftMargin) / 3) * 2 - (graphWidth / 2) + this._leftMargin;
      var gap = ((bar1XPos - this._leftMargin) - (bar2XPos - (bar1XPos + graphWidth))) / 3;
      bar1XPos -= gap;
      bar2XPos += gap;
      //Set the Height of the two graphs
      var yAxisScale = (this._height - this._botMargin - this._topMargin) / this._greatest;
      var bar1Height = yAxisScale * this._p1Num;
      var bar2Height = yAxisScale * this._p2Num;
      this._ctx.beginPath();
      this._ctx.fillStyle = "#FF0000";
      this._ctx.rect(bar1XPos, this._height - this._botMargin - bar1Height, graphWidth, bar1Height);
      this._ctx.fill();
      this._ctx.stroke();
  
      this._ctx.beginPath();
      this._ctx.fillStyle = "#0000FF";
      this._ctx.rect(bar2XPos, this._height - this._botMargin - bar2Height, graphWidth, bar2Height);
      this._ctx.fill();
      this._ctx.stroke();
      this._ctx.fillStyle = "#000000";
  
      //Write Person's name for bar
      var p1NameWidth = this._ctx.measureText(this._p1Name).width;
      var p2NameWidth = this._ctx.measureText(this._p2Name).width;
      var nameHeight = this._ctx.measureText("M").width;
      this._ctx.fillText(this._p1Name, bar1XPos + graphWidth / 2 - p1NameWidth / 2,
        this._height - this._botMargin / 2 + nameHeight / 2);
      this._ctx.fillText(this._p2Name, bar2XPos + graphWidth / 2 - p2NameWidth / 2,
        this._height - this._botMargin / 2 + nameHeight / 2);
  
       //wite the labels for the bars
       //if we want it to be a percentage
       if (this._p1Num.toString()[this._p1Num.toString().length - 3] === '.'){
         this._p1Num += "%";
         this._p2Num += "%"
       }
  
       this._ctx.font = "10pt sans-serif";
       var p1NumWidth = this._ctx.measureText(this._p1Num).width;
       var p2NumWidth = this._ctx.measureText(this._p2Num).width;
       var numHeight = this._ctx.measureText("M").width
       var gap1 = 6;
       this._ctx.fillText(this._p1Num.toLocaleString(), bar1XPos - p1NumWidth - gap1,
         this._height - this._botMargin - bar1Height + numHeight);
       this._ctx.fillText(this._p2Num.toLocaleString(), bar2XPos - p2NumWidth - gap1,
         this._height - this._botMargin - bar2Height + numHeight);
    }
}

export default BarGraph2Bars;