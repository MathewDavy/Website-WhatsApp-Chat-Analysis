const express = require('express');
const router = express.Router();
var persons = require('../../Persons');
var bodyParser = require('body-parser');
var uuid = require('uuid');

router.use(bodyParser.json({ limit: '50mb' }));
router.use(express.json());
router.use(express.urlencoded({ extended: true }));


router.post('/', (req, res) => {
    var word = req.body.word;
    persons[0].getOccurrence(word);
    persons[1].getOccurrence(word);
    
    res.send([
        
        {     
            id: uuid.v4(),
            word: word,           
            val1: persons[0]._occOfWord.num.toLocaleString(),
            val2: persons[1]._occOfWord.num.toLocaleString(),
            title: `Number of Times '${word}' is Sent`,
            yAxisTitle: 'Number of Times',
            wordDis: `'${word}' `,
            val1Dis: `${persons[0]._occOfWord.num.toLocaleString()} times`,
            val2Dis: `${persons[1]._occOfWord.num.toLocaleString()} times`   
        },
        
        { 
            id: uuid.v4(),
            word: word,           
            val1: persons[0]._propOfWord.num.toLocaleString(),
            val2: persons[1]._propOfWord.num.toLocaleString(),
            title: `Percentage of Texts Where '${word}' is Sent`,
            yAxisTitle: 'Percentage (%)',
            wordDis: `'${word}' `,
            val1Dis: `${persons[0]._propOfWord.num.toLocaleString()}%`,
            val2Dis: `${persons[1]._propOfWord.num.toLocaleString()}%`   
        }
                    
    ]);
    
   
});

   
module.exports = router;