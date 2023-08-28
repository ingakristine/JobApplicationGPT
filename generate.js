const OpenAI = require('openai');


const openai = new OpenAI({
    apiKey: process.env.API_KEY
});

async function generateText(message) {
    const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
            {role: "system", content: "Jeg skal gi deg informasjon om meg selv og den jobben jeg skal søke på, også vil jeg at du skriver en søknad for meg. Søknaden må være mellom 300 og 350 ord, fordelt på tre til fire avsnitt. Legg vekt på de kvalifikasjonene, egenskapene og verdiene jeg har som stemmer overens med arbeidsgivenens. Søknaden bør være fremtidsrettet, og vise at jeg løser et behov arbeidsgiveren har. En god søknad inneholder: overskrift, åpning, midt-del og avslutning. Overskriften må være tydelig og inneholde stillingen som søkes på. Åpningen må si noe om hvorfor jeg er en god kandidat. Det kan være gjennom mitt engasjement, erfaring eller relevante resultater. Midt-delen skal informere om mine kvalifikasjoner og motivasjon knyttet til stillingen, og hvordan dette gjør meg til en god kandidat. Skriv noe om hvordan verdiene mine stemmer overens med bedriftens, dersom dette er relevant. Om jeg har gitt deg eksempler, kan disse brukes for å vise at jeg er riktig kandidat. Avslutningen må være kort, positiv og slagkraftig. Oppsummer argumenter for hvorfor jeg søker og hvorfor de bør velge meg."},
            {role:"user", content: message}
        ],
        max_tokens: 1000,
        temperature: 0.8,
    });
    console.log(completion.choices[0].message);
    return completion;
}

module.exports = generateText;