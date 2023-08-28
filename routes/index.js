var express = require('express');
var router = express.Router();
const generateText = require('../generate')

/* GET home page. */
router.get('/', function(req, res, next) {
  try {
    const application = JSON.stringify(req.session.application);
    if (application !== undefined) {
      res.render('index', { title: 'Express', application: application });
    } else {
      res.render('index', { title: 'Express', application: '' });
    }
  } catch(err){
    console.log('An error occured.')
  }
  
});

router.post('/submit', async function(req, res, next){
  const { bakgrunn, arbeidsgiver, oppgaver, kvalifikasjoner, egenskaperØnsket, motivasjon, mineKvalifikasjoner,  mineEgenskaper } = req.body
  const userMessage = bakgrunn + arbeidsgiver + oppgaver + kvalifikasjoner + egenskaperØnsket + motivasjon + mineKvalifikasjoner +  mineEgenskaper;
  const completion = await generateText(userMessage);
  req.session.application = completion.choices[0].message.content;
  res.redirect('/')
})

module.exports = router;
