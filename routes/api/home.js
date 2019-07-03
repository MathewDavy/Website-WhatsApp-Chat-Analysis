const express = require('express');
const router = express.Router();
//need to create a persons array so that the ocurrence api can update each person
var persons = require('../../Persons');
var Person = require('../../Person');
var bodyParser = require('body-parser');
var uuid = require('uuid');
var fs = require('fs');

var Chat = require('../../Chat');
router.use(bodyParser.json({ limit: '50mb' }));
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

function createJsonObject(lines, fileName){
   
    //get p1Name
    var line1 =  lines[0];
    var line1 = line1.split(' ');
    var p1Name = line1[3];
    //get p2Name
    var lineOther;
    var p2Name;
    for(var i = 1; i < lines.length; i++){
        lineOther = lines[i].split(' ');
        if (lineOther[3] != p1Name){
            p2Name = lineOther[3];
            break;
        }
    }
    p1Name = p1Name.toLowerCase();
    p2Name = p2Name.toLowerCase();
    var p1 = new Person(p1Name);
    var p2 = new Person(p2Name);
  
    //split each line to relevant person
    for(var i = 0; i < lines.length; i++){
        //skip the empty lines
        if (lines[i] != ""){
            //remove the 2 speechmarks at start and end of each line
            if (lines[i].length > 2){
                lines[i] = lines[i].toLowerCase();
                if (lines[i].charAt(0) === "\""){
                  
                    lines[i] = lines[i].substring(1);// remove first char
                    lines[i] = lines[i].slice(0, -1);//remove last char. 
                    
                }
               
                //split line into words
                words = lines[i].split(' ');
                
                if (words[3] == p1Name){
                    processLine(p1, words);
                }
                else if (words[3] == p2Name){
                    processLine(p2, words);
                }
            }
        }
    }  

    getStats(p1);
    getStats(p2);
    
    p1.getDaysMoreAct(p2);
    p2.getDaysMoreAct(p1);

    persons.push(p1, p2);
   
    //persons array has been completed so we can start on the chat
    var chat = new Chat();
    chat.getLength(p1._onlyDatesObj, p2._onlyDatesObj); 

   // var fileName;
    var fileName1;
    if (fileName === 'SampleFile.csv'){
        fileName1 = fileName;
        fileName = "No File Chosen";
    }
    else{
        fileName1 = "";
    }
    
    var jsonObj = {

        tableData: [
            {
                id: uuid.v4(),
                p1Name: p1.disName,
                p2Name: p2.disName
            },

            {
                id: uuid.v4(),
                title: "Number of Texts",
                yAxisTitle: "Number of Texts",
                val1: p1._numOfTexts.toLocaleString(),
                val2: p2._numOfTexts.toLocaleString()
            },

            {
                id: uuid.v4(),
                title: "Number of Words",
                yAxisTitle: "Number of Words",
                val1: p1._numOfWords.toLocaleString(),
                val2: p2._numOfWords.toLocaleString()
            },

            {
                id: uuid.v4(),
                title: "Average Number of Words Per Text",
                yAxisTitle: "Number of Words",
                val1: p1._avgNumWordPerText.toLocaleString(),
                val2: p2._avgNumWordPerText.toLocaleString()
            },

            {
                id: uuid.v4(),
                title: "Most Sent Word",
                yAxisTitle: "Number of Times",
                word1: p1._mostSentWord.word,
                word2: p2._mostSentWord.word,
                num1: p1._mostSentWord.num.toLocaleString(),
                num2: p2._mostSentWord.num.toLocaleString()
            },

            {
                id: uuid.v4(),
                title: "Second Most Sent Word",
                yAxisTitle: "Number of Times",
                word1: p1._mostSentWord2.word,
                word2: p2._mostSentWord2.word,
                num1: p1._mostSentWord2.num.toLocaleString(),
                num2: p2._mostSentWord2.num.toLocaleString()
            },

            {
                id: uuid.v4(),
                title: "Third Most Sent Word",
                yAxisTitle: "Number of Times",
                word1: p1._mostSentWord3.word,
                word2: p2._mostSentWord3.word,
                num1: p1._mostSentWord3.num.toLocaleString(),
                num2: p2._mostSentWord3.num.toLocaleString()
            }   
        ],

        fileLoaded: true,

        fileName: fileName,
        fileName1: fileName1,

        tableTL1: { 
            value1: chat._startDate,              
            value2: chat._endDate,  
            value3: chat._length + ' days',
            value4: chat._numDaysAct + ' days'   
        },

        tableTL2: [
            {
                name1: p1.disName,
                name2: p2.disName
            },
            {
                v1Date: reverseDateString(p1._mostActiveDate.date),
                v1Num: p1._mostActiveDate.numOcc,
                v2Date: reverseDateString(p2._mostActiveDate.date),
                v2Num: p2._mostActiveDate.numOcc           
            },
            {
                v1: p1._avgTextsPerDay,
                v2: p2._avgTextsPerDay          
            },
            {
                v1: p1._numDaysGreater,
                v2: p2._numDaysGreater          
            }
        ],

        graphTL: {
            p1Name: p1.disName,
            p2Name: p2.disName,
            mostActiveDateNumP1: p1._mostActiveDate.numOcc,
            mostActiveDateNumP2: p2._mostActiveDate.numOcc, 
            p1DatesObj: p1._onlyDatesObj,
            p2DatesObj: p2._onlyDatesObj, 
            convoLength: chat._length
        }
        
    }
    

    return jsonObj;



}

function processLine(person, words){
    
    //remove the comma at the end
    var date = words[0].slice(0, -1);
   
    //make sure the days lead with 0
    if (date.length == 7){
        date = "0" + date;
       
    }
   
    //set to US format
    date = reverseDateString(date);
    
    person._onlyDates.push(date);
    for (var j = 4; j < words.length; j++){
        person._onlyWords.push(words[j]);
    }
}


router.get('/', (req, res) => {
    var lines;
    var file = "sampleFile.csv";
    fs.readFile(file, 'utf8', function(err, data) {  
        if (err) throw err;

        lines = data.split('\n');
        var jsonObj = createJsonObject(lines, 'SampleFile.csv');
        res.send(jsonObj);
    });

 
    
})

router.post('/', (req, res) => {

    var lines = req.body.lines;
    var fileName = req.body.fileName;
    var jsonObj = createJsonObject(lines, fileName);
    ;
    res.json(jsonObj);   
});



function getStats(person){

    person.getEasyStats();
    person.getMostSentWord();
    person.getDatesWithNum();
    person.getAvgTextsPerDay();
    
}

function reverseDateString(date){
    if (date == 7){
        date = "0" + date;
    }
        var _1 = date[0] + date[1];
        var _2 = date[3] + date[4];
        var yy = date[6] + date[7];

    return _2 + '/' + _1 + '/' + yy;

}

      
module.exports = router;