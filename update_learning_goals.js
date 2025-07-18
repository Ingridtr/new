const fs = require('fs');
const path = require('path');

// Define the learning goals for each activity and grade
const learningGoals = {
  'mattesheriff': {
    'Andre årstrinn': 'utforske addisjon og subtraksjon og bruke dette til å formulere og løyse problem frå leik og eigen kvardag',
    'Tredje årstrinn': 'utforske og forklare samanhengar mellom addisjon og subtraksjon og bruke det i hovudrekning og problemløysing',
    'Fjerde årstrinn': 'utforske og forklare samanhengar mellom dei fire rekneartane og bruke samanhengane formålstenleg i utrekningar',
    'Femte årstrinn': 'utforske og forklare samanhengar mellom brøkar, desimaltal og prosent og bruke det i hovudrekning',
    'Sjette årstrinn': 'utforske strategiar for rekning med desimaltal og samanlikne med reknestrategiar for heile tal',
    'Syvende årstrinn': 'utforske negative tal i praktiske situasjonar'
  },
  'stiv-heks': {
    'Andre årstrinn': 'eksperimentere med telling både forlengs og baklengs, velge ulike startpunkter og ulik differanse og beskrive mønstre i tellingene',
    'Tredje årstrinn': 'utvikle og bruke formålstenlege strategiar for subtraksjon i praktiske situasjonar',
    'Fjerde årstrinn': 'utforske og forklare samanhengar mellom dei fire rekneartane og bruke samanhengane formålstenleg i utrekningar',
    'Femte årstrinn': 'utforske og forklare samanhengar mellom brøkar, desimaltal og prosent og bruke det i hovudrekning',
    'Sjette årstrinn': 'utforske strategiar for rekning med desimaltal og samanlikne med reknestrategiar for heile tal',
    'Syvende årstrinn': 'utforske negative tal i praktiske situasjonar'
  },
  'poster-skattejakt': {
    'Andre årstrinn': 'utforske, tegne og beskrive geometriske figurer fra sitt eget nærmiljø og argumentere for måter å sortere dem på etter egenskaper',
    'Tredje årstrinn': 'utforske og forklare samanhengar mellom addisjon og subtraksjon og bruke det i hovudrekning og problemløysing',
    'Fjerde årstrinn': 'lage algoritmar og uttrykkje dei ved bruk av variablar, vilkår og lykkjer',
    'Femte årstrinn': 'lage og programmere algoritmar med bruk av variablar, vilkår og lykkjer',
    'Sjette årstrinn': 'bruke variablar, lykkjer, vilkår og funksjonar i programmering til å utforske geometriske figurar og mønster',
    'Syvende årstrinn': 'bruke samansette rekneuttrykk til å beskrive og utføre utrekningar'
  },
  'pastandsveggene': {
    'Andre årstrinn': 'utforske og beskrive generelle eigenskapar ved partal og oddetal',
    'Tredje årstrinn': 'eksperimentere med multiplikasjon og divisjon i kvardagssituasjonar',
    'Fjerde årstrinn': 'lage rekneuttrykk til praktiske situasjonar og finne praktiske situasjonar som passar til oppgitte rekneuttrykk',
    'Femte årstrinn': 'diskutere tilfeldigheit og sannsyn i spel og praktiske situasjonar og knyte det til brøk',
    'Sjette årstrinn': 'beskrive eigenskapar ved og minimumsdefinisjonar av to- og tredimensjonale figurar og forklare kva for eigenskapar figurane har felles, og kva for eigenskapar som skil dei frå kvarandre',
    'Syvende årstrinn': 'bruke programmering til å utforske data i tabellar og datasett'
  },
  'nappe-hale': {
    'Andre årstrinn': 'eksperimentere med teljing både framlengs og baklengs, velje ulike startpunkt og ulik differanse og beskrive mønster i teljingane',
    'Tredje årstrinn': 'utforske multiplikasjon ved teljing',
    'Fjerde årstrinn': 'representere divisjon på ulike måtar og omsetje mellom dei ulike representasjonane',
    'Femte årstrinn': 'utforske og forklare samanhengar mellom brøkar, desimaltal og prosent og bruke det i hovudrekning',
    'Sjette årstrinn': 'bruke variablar og formlar til å uttrykkje samanhengar i praktiske situasjonar',
    'Syvende årstrinn': 'utvikle og bruke formålstenlege strategiar i rekning med brøk, desimaltal og prosent og forklare tenkjemåtane sine'
  },
  'problemlosning-hverdagen': {
    'Andre årstrinn': 'måle og samanlikne storleikar som gjeld lengd og areal, ved hjelp av ikkje-standardiserte og standardiserte måleiningar, beskrive korleis og samtale om resultata',
    'Tredje årstrinn': 'bruke ulike måleiningar for lengd og masse i praktiske situasjonar og grunngi valet av måleining',
    'Fjerde årstrinn': 'utforske og bruke målings- og delingsdivisjon i praktiske situasjonar',
    'Femte årstrinn': 'formulere og løyse problem frå eigen kvardag som har med brøk å gjere',
    'Sjette årstrinn': 'formulere og løyse problem frå sin eigen kvardag som har med desimaltal, brøk og prosent å gjere, og forklare eigne tenkjemåtar',
    'Syvende årstrinn': 'logge, sortere, presentere og lese data i tabellar og diagram og grunngi valet av framstilling'
  },
  'regnefrisbee': {
    'Andre årstrinn': 'kjenne att og beskrive repeterande einingar i mønster og lage eigne mønster',
    'Tredje årstrinn': 'utforske likevekt og balanse i praktiske situasjonar, representere dette på ulike måtar og omsetje mellom dei ulike representasjonane',
    'Fjerde årstrinn': 'utforske og beskrive strukturar og mønster i leik og spel',
    'Femte årstrinn': 'lage og løyse oppgåver i rekneark som omhandlar personleg økonomi',
    'Sjette årstrinn': 'måle radius, diameter og omkrins i sirklar og utforske og argumentere for samanhengen',
    'Syvende årstrinn': 'bruke ulike strategiar for å løyse lineære likningar og ulikskapar og vurdere om løysingar er gyldige'
  },
  'bingo': {
    'Andre årstrinn': 'lage og følgje reglar og trinnvise instruksjonar i leik og spel',
    'Tredje årstrinn': 'representere multiplikasjon på ulike måtar og omsetje mellom dei ulike representasjonane',
    'Fjerde årstrinn': 'bruke ikkje-standardiserte måleiningar for areal og volum i praktiske situasjonar og grunngi valet av måleining',
    'Femte årstrinn': 'løyse likningar og ulikskapar gjennom logiske resonnement og forklare kva det vil seie at eit tal er ei løysing på ei likning',
    'Sjette årstrinn': 'måle radius, diameter og omkrins i sirklar og utforske og argumentere for samanhengen',
    'Syvende årstrinn': 'bruke samansette rekneuttrykk til å beskrive og utføre utrekningar'
  },
  'hoderegning-kortstokk': {
    'Andre årstrinn': 'utforske den kommutative og den assosiative eigenskapen ved addisjon og bruke dette i hovudrekning',
    'Tredje årstrinn': 'bruke kommutative, assosiative og distributive eigenskapar til å utforske og beskrive strategiar i multiplikasjon',
    'Fjerde årstrinn': 'utforske og forklare samanhengar mellom dei fire rekneartane og bruke samanhengane formålstenleg i utrekningar',
    'Femte årstrinn': 'utvikle og bruke ulike strategiar for rekning med positive tal og brøk og forklare tenkjemåtane sine',
    'Sjette årstrinn': 'utforske strategiar for rekning med desimaltal og samanlikne med reknestrategiar for heile tal',
    'Syvende årstrinn': 'utforske negative tal i praktiske situasjonar'
  },
  'terningskast': {
    'Andre årstrinn': 'eksperimentere med teljing både framlengs og baklengs, velje ulike startpunkt og ulik differanse og beskrive mønster i teljingane',
    'Tredje årstrinn': 'utforske multiplikasjon ved teljing',
    'Fjerde årstrinn': 'lage rekneuttrykk til praktiske situasjonar og finne praktiske situasjonar som passar til oppgitte rekneuttrykk',
    'Femte årstrinn': 'diskutere tilfeldigheit og sannsyn i spel og praktiske situasjonar og knyte det til brøk',
    'Sjette årstrinn': 'bruke ulike strategiar for å rekne ut areal og omkrins og utforske samanhengar mellom desse',
    'Syvende årstrinn': 'logge, sortere, presentere og lese data i tabellar og diagram og grunngi valet av framstilling'
  },
  'hvem-er-jeg': {
    'Andre årstrinn': 'utforske tal, mengder og teljing i leik, natur, biletkunst, musikk og barnelitteratur, representere tala på ulike måtar og omsetje mellom dei ulike representasjonane',
    'Tredje årstrinn': 'beskrive likskap og ulikskap i samanlikning av storleikar, mengder, uttrykk og tal og bruke likskaps- og ulikskapsteikn',
    'Fjerde årstrinn': 'utforske, beskrive og samanlikne eigenskapar ved to- og tredimensjonale figurar ved å bruke vinklar, kantar og hjørne',
    'Femte årstrinn': 'representere brøkar på ulike måtar og omsetje mellom dei ulike representasjonane',
    'Sjette årstrinn': 'utforske og beskrive symmetri i mønster og utføre kongruensavbildingar med og utan koordinatsystem',
    'Syvende årstrinn': 'utvikle og bruke formålstenlege strategiar i rekning med brøk, desimaltal og prosent og forklare tenkjemåtane sine'
  },
  'ranger-meg': {
    'Andre årstrinn': 'ordne tal, mengder og former ut frå eigenskapar, samanlikne dei og reflektere over om dei kan ordnast på fleire måtar',
    'Tredje årstrinn': 'beskrive likskap og ulikskap i samanlikning av storleikar, mengder, uttrykk og tal og bruke likskaps- og ulikskapsteikn',
    'Fjerde årstrinn': 'representere divisjon på ulike måtar og omsetje mellom dei ulike representasjonane',
    'Femte årstrinn': 'beskrive brøk som del av ein heil, som del av ei mengd og som tal på tallinja og vurdere og namngi storleikane',
    'Sjette årstrinn': 'utforske, namngi og plassere desimaltal på tallinja',
    'Syvende årstrinn': 'representere og bruke brøk, desimaltal og prosent på ulike måtar og utforske dei matematiske samanhengane mellom desse representasjonsformene'
  },
  'stafett': {
    'Andre årstrinn': 'utforske, teikne og beskrive geometriske figurar frå sitt eige nærmiljø og argumentere for måtar å sortere dei på etter eigenskapar',
    'Tredje årstrinn': 'utforske likevekt og balanse i praktiske situasjonar, representere dette på ulike måtar og omsetje mellom dei ulike representasjonane',
    'Fjerde årstrinn': 'utforske, bruke og beskrive ulike divisjonsstrategiar',
    'Femte årstrinn': 'utvikle og bruke ulike strategiar for rekning med positive tal og brøk og forklare tenkjemåtane sine',
    'Sjette årstrinn': 'utforske mål for areal og volum i praktiske situasjonar og representere dei på ulike måtar',
    'Syvende årstrinn': 'lage og vurdere budsjett og rekneskap ved å bruke rekneark med cellereferansar og formlar'
  }
};

// Function to update learning goals in a JSON file
function updateLearningGoals(filename) {
  const filepath = path.join(__dirname, 'public', 'activityData', 'tasks', filename);
  
  if (!fs.existsSync(filepath)) {
    console.log(`File not found: ${filepath}`);
    return;
  }
  
  try {
    const data = JSON.parse(fs.readFileSync(filepath, 'utf8'));
    const activityId = data.activityId;
    
    if (!learningGoals[activityId]) {
      console.log(`No learning goals defined for activity: ${activityId}`);
      return;
    }
    
    const activityGoals = learningGoals[activityId];
    let updated = false;
    
    // Update learning goals for each grade
    Object.keys(data.grades).forEach(grade => {
      if (activityGoals[grade]) {
        const newLearningGoal = activityGoals[grade];
        
        // Update easy, medium, hard tasks
        ['easy', 'medium', 'hard'].forEach(difficulty => {
          if (data.grades[grade][difficulty]) {
            data.grades[grade][difficulty].forEach(task => {
              if (task.learningGoal !== newLearningGoal) {
                task.learningGoal = newLearningGoal;
                updated = true;
              }
            });
          }
        });
      }
    });
    
    if (updated) {
      fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
      console.log(`Updated learning goals for: ${filename}`);
    } else {
      console.log(`No updates needed for: ${filename}`);
    }
    
  } catch (error) {
    console.error(`Error processing ${filename}:`, error.message);
  }
}

// Update all activity files
const activityFiles = [
  'mattesheriff.json',
  'stiv-heks.json',
  'poster-skattejakt.json',
  'pastandsveggene.json',
  'nappe-hale.json',
  'problemlosning-hverdagen.json',
  'regnefrisbee.json',
  'bingo.json',
  'hoderegning-kortstokk.json',
  'terningskast.json',
  'hvem-er-jeg.json',
  'ranger-meg.json',
  'stafett.json'
];

console.log('Starting learning goals update...');
activityFiles.forEach(updateLearningGoals);
console.log('Learning goals update completed!');
