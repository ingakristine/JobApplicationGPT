const OpenAI = require('openai');


const openai = new OpenAI({
    apiKey: process.env.API_KEY
});

async function generateText(message) {
    const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            {role: "system", content: 
                "Jeg vil at du bruker informasjonen jeg gir deg til å lage en jobbsøknad.\
                Søknaden må være mellom 300 og 350 ord, fordelt på tre til fire avsnitt.\
                Informasjonen jeg gir vil inndeles i ni temaer:  Litt om arbeidsgiveren, arbeidsoppgaver i stillingen, arbeidsgivers ønskede kvalifikasjoner, De ønskede personlige egenskapene, min bakgrunn, mine kvalifikasjoner, mine egenskaper, min motivasjon for jobben.\
                Fokuser på mine egne kvalifikasjoner og egenskaper som samsvarer med arbeidsgiverens ønsker.\
                Dersom jeg ikke sier at jeg har en kvalifikasjon arbeidsgiveren ser etter, anta at jeg ikke har denne.\
                Søknaden skal være fremtidsrettet, og vise at jeg løser et behov arbeidsgiveren har.\
                En god søknad inneholder: overskrift, åpning, midt-del og avslutning.\
                Overskriften må være tydelig og inneholde stillingen som søkes på.\
                Åpningen må si noe om hvorfor jeg er en god kandidat. Det kan være gjennom mitt engasjement, erfaring eller resultater. Dersom jeg gir eksempel på et resultat jeg har oppnådd, bruk dette.\
                Midt-delen skal informere om mine kvalifikasjoner, egenskaper og motivasjon. Bruk eventuelle eksempler jeg gir til å demonstrere mine egenskaper. \
                Avslutningen må være kort, positiv og slagkraftig. Oppsummer argumenter for hvorfor jeg søker og hvorfor de bør velge meg."
            },
            {role:"user", content: message}
        ],
        max_tokens: 1000,
        temperature: 0.8,
    });
    // console.log(completion);
    return completion.choices[0].message.content;
}

module.exports = { generateText };