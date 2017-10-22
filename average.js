var fs = require('fs');

var jsonEscape = function (str) {
    return str.replace(/\r?\n|\r/g, "").replace(/^\uFEFF/, '');
};

var labfees, studies;

fs.readFile('CMSLabfees.json', 'utf8', (err, data) => {
    if (err) throw new Error('CMSLabfees not parsed');
    data = jsonEscape(data);
    labfees = JSON.parse(data);
});

fs.readFile("./data/medicalStudies2.json", 'utf8', (err, data) => {
    if (err) throw new Error('medicalStudies not parsed');
    data = jsonEscape(data);
    studies = JSON.parse(data);
    for (var i = 0; i < studies.length; i++) {
        match(studies[i]);
    }
    fs.writeFile("./data/medicalStudies3.json", JSON.stringify(studies), (err) => {
        if (err) throw err;
        console.log('done');
    });
});

var match = function (study) {
    var cpt = study.CPT;
    for (var key in labfees) {
        if (labfees.hasOwnProperty(cpt)) {
            if (study.Costs) {
                study.Costs.CMS = labfees[cpt].Cost;
            } else {
                study.Costs = {CMS : labfees[cpt].Cost};
            }
        }
    }
};

