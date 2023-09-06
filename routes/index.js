var express = require('express');
var router = express.Router();
const { generateText } = require('../controllers/generate');
const { ensurePeriod } = require('../controllers/textUtils');

/* GET home page. */
router.get('/', function(req, res, next) {
  try {
    const application = JSON.stringify(req.session.application);
    if (application !== undefined) {
      res.render('index', { title: 'Jobbsøknadsgeneratoren', application: application });
    } else {
      res.render('index', { title: 'Jobbsøknadsgeneratoren' });
    }
  } catch(err){
    console.log('An error occured.')
  }
});

router.post('/submit', async function(req, res, next){
  const { stilling, arbeidsgiver, arbeidsOppgaver, kvalifikasjonerØnsket, egenskaperØnsket, minBakgrunn, mineKvalifikasjoner,  mineEgenskaper, motivasjon } = req.body
  
  const userMessage = 'Jeg skal søke på jobb som: ' + ensurePeriod(stilling) + 
  'Litt om arbeidsgiveren: ' + ensurePeriod(arbeidsgiver) + 
  'Arbeidsoppgaver i stillingen: ' + ensurePeriod(arbeidsOppgaver) + 
  'Arbeidsgivers ønskede kvalifikasjoner: ' + ensurePeriod(kvalifikasjonerØnsket) + 
  'De ønskede personlige egenskapene: ' + ensurePeriod(egenskaperØnsket) + 
  'Min bakgrunn: ' + ensurePeriod(minBakgrunn) + 
  'Mine kvalifikasjoner: ' + ensurePeriod(mineKvalifikasjoner) + 
  'Mine egenskaper: ' + ensurePeriod(mineEgenskaper) + 
  'Min motivasjon for jobben: ' + ensurePeriod(motivasjon);
  // console.log(userMessage);

  const completion = await generateText(userMessage);
  const paragraphs = completion.split(/\n\n+/);
  const formattedText = paragraphs.map(paragraph => `<p>${paragraph}</p>`).join('');
  req.session.application = formattedText;
  res.redirect('/')
})

module.exports = router;
