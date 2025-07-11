/*
traits:
X linked + incomp (eye shape) 
complete dom auto (body color) 
X linked recessive (scallopped wings)
auto recess (vestigial wings)
X linked recess (forked bristles)
auto recess (shaven bristles)
Y linked recessive(hairy antennae* not accurate)

ditch:
eye color complete (eye color)
*/
class Fly {
    constructor(sex, alleles, name) {
        this.sex = sex;
        this.alleles = alleles;
        // L/S
        this.eyes = alleles.substring(0, 2);
        // B/b
        this.body = alleles.substring(2, 4);
        // D/d
        this.scallop = alleles.substring(4, 6);
        // G/g
        this.vestigial = alleles.substring(6, 8);
        // R/r
        this.forked = alleles.substring(8, 10);
        // H/h
        this.shaven = alleles.substring(10, 12);
        // E/e
        this.hairy = alleles.substring(12, 14);
        
        this.name = name;
    }

    getSex() {
        return this.sex;
    }
 
    getAlleles() {
        //console.log("ALLELES: " + this.alleles);
        return this.alleles;
    }
    
   
    getPhenotype() {
        
        let phenos = [];
        // eyes 
        if (this.eyes == "LL" || this.eyes == "LY") {
            phenos[0] = "wildeyes";
        }
        else if (this.eyes == "LS") {
            phenos[0] = "lobe";
        }
        else if (this.eyes == "SS" || this.eyes == "SY") {
            phenos[0] = "bar";
        }

        // body 
        if (this.body.includes('B')) {
            phenos[1] = "wild";
        }
        else {
            phenos[1] = "brown";
        }

        // scallopped wings
        if (this.scallop == "dd" || this.scallop == "dY") {
            phenos[2] = "scallopped";
        } 
        else {
            phenos[2] = "wildwing";
        }

        // vestigial wings 
        if (this.vestigial == "gg") {
            phenos[3] = "vestigial";
        }
        else {
            phenos[3] = "wildwing";
        }

        // bristles 
        if (this.forked == "rr" || this.forked == "rY") {
            phenos[4] = "forked";
        }
        else {
            phenos[4] = "wildbris";
        }

        if (this.shaven == "hh") {
            phenos[5] = "shaven";
        }
        else {
            phenos[5] = "wildbris";
        }

        // antennae
        if (this.hairy == "Xe") {
            phenos[6] = "hairy";
        }
        else {
            phenos[6] = "wildant";
        }

        return phenos;
        
    }

}

const imageMap = new Map();
imageMap.set("wildeyes", "images/wildeyes.png");
imageMap.set("lobe", "images/lobeeyes.png");
imageMap.set("bar", "images/bareyes.png");
// need do abdomen, legs , shell

imageMap.set("wild", "images/wildheadbod.png");
imageMap.set("brown", "images/brownheadbod.png");

//  add right wing
imageMap.set("scalloppedwildwing", "images/scallopped");
imageMap.set("wildwingwildwing", "images/wildwing");
imageMap.set("wildwingvestigial", "images/vestigial");
imageMap.set("scalloppedvestigial", "images/scalloppedvestigial");

imageMap.set("forkedwildbris", "images/forkedbristles.png");
imageMap.set("forkedshaven", "images/forkedshavenbristles.png");
imageMap.set("wildbrisshaven", "images/shavenbristles.png");
imageMap.set("wildbriswildbris", "images/wildbristles.png");

imageMap.set("hairy", "images/hairyantennae.png");
imageMap.set("wildant", "images/wildantennae.png");


let maleParent;
let femaleParent;
let f1Dad;
let f1Mom;

// mom, dad ideally 
function computeGenotype(gtype1, gtype2, isFemale) {
    let isXLinked = false;
    let isYLinked = false;
    let momAllele = "";
    let dadAllele = "";

    let genotype = "";
    if (gtype1[1] == 'Y' || gtype2[1] == 'Y'){
        isXLinked = true;
    }
    if (gtype1[0] == 'X' || gtype2[0] == 'X'){
        isYLinked = true;
    }

    if (isXLinked) {
        if (isFemale) {
            momAllele = gtype1[Math.floor(Math.random() * 2)];
            dadAllele = gtype2[0];
        }
        else {
            momAllele = gtype1[Math.floor(Math.random()* 2)];
            dadAllele = gtype2[1];
        }
    }
    else if (isYLinked) {
        if (isFemale) {
            momAllele = gtype1[Math.floor(Math.random() * 2)];
            dadAllele = gtype2[0];
        }
        else {
            momAllele = gtype1[Math.floor(Math.random() * 2)];
            dadAllele = gtype2[1];
        }
    }
    else {
        momAllele = gtype1[Math.floor(Math.random()* 2)];
        dadAllele = gtype2[Math.floor(Math.random() * 2)];

    }
    
    //console.log("mom + dad: " + momAllele + dadAllele);

    return momAllele + dadAllele; 
    
}
// mom, dad
function breed(fly1, fly2) {
    //console.log(fly1);
    //console.log(fly2);
    let alLength = fly1.getAlleles().toString().length;
    //let numTraits = alLength / 2;
    let index = 0;
    let sex = "M";
    let num = Math.random();
    let isFemale = false

    if (num < 0.5) {
        isFemale = true;
        sex = "F";
    }

    let child = "";
    for (let i = 0; i < alLength / 2; i++) {
        let trait1 = fly1.getAlleles().toString().substr(index, 2);
        let trait2 = fly2.getAlleles().toString().substr(index, 2);
       // console.log("trait 1:")
       // console.log(trait1);
       // console.log("trait 2:")
       // console.log(trait2);
        
        child += computeGenotype(trait1, trait2, isFemale); 
        index += 2; 
    }
    
    let flyChild = new Fly(sex, child, "child");
    console.log(flyChild);
    let phenotype = flyChild.getPhenotype();
    //console.log("pheno: " + phenotype)
    
    return flyChild;
    
}
let currFly = null;
let flyIndex = 0;
let flyChildren = new Array();
function breed100() {
    for (let i = 0; i < 100; i++) {
        flyChildren[i] = breed(femaleParent, maleParent);
    }
    //console.log(flyChildren)
    currFly = flyChildren[0]; 
    console.log("current fly" + currFly);
    //document.getElementById("flyDisplay").innerHTML = currentFly.name + ": " + currentFly.getPhenotype().join(", ");
    return flyChildren;
}

let savedFlies = new Array(Fly);

function saveFly() {
   savedFlies.push(currFly);
   flyIndex++;
   let container = document.getElementById('flyImage');
    container.innerHTML = "";

   console.log(savedFlies);

}


function disposeFly(isSaved) {
    flyIndex++;
    currFly = flyChildren[flyIndex];
    let container = document.getElementById('flyImage');
    container.innerHTML = "";
    /*

    if (isSaved) {
        for (let i = 0; i < savedFlies.length; i++) {
            if (savedFlies[i] == currFly) {
                savedFlies.splice(i, 1);
            }
        }
    }
    else {
        for (let i = 0; i < flyChildren.length; i++) {
            if (flyChildren[i] == currFly) {
                flyChildren.splice(i, 1);
            }
        }
    }
        */

}

function displayFly(fly) {
    console.log(fly);
    let container = document.getElementById('flyImage');
    container.innerHTML = ""; // clear old images
    /*
    layer order bottom -> top
    legs
    abdomen
    antennae
    body
    wings
    shell
    eyes
    bristles
    */

    let phenos = fly.getPhenotype();
    let sex = fly.getSex();

    // establish body color 
    let isBrown = false;
    
    if (phenos[1] == "brown") {
        isBrown = true;
    }
    
    // legs 
    let legDirections = ["frontleft", "frontright", "midleft", "midright", "backleft", "backright"];
    for (let i = 0; i < legDirections.length; i++) {
        const leg = document.createElement("img");
        leg.src = "images/" + phenos[1] + legDirections[i] + ".png";
        leg.className = "fly-layer";
        leg.alt = "leg";
        container.appendChild(leg);
    }


    // abdomen
    if (isBrown) {
        if (sex == 'F') {
            // display brown female ab
            const flyab = document.createElement("img");
            flyab.src = "images/brownfemale.png";
            flyab.className = "fly-layer";
            flyab.alt = "brown female fly abdomen";
            container.appendChild(flyab);
        }
        else {
            // display brown male ab
            const flyab = document.createElement("img");
            flyab.src = "images/brownmale.png";
            flyab.className = "fly-layer";
            flyab.alt = "brown male fly abdomen";
            container.appendChild(flyab);
        }
    }
    else {
        if (sex == 'F') {
            // display wild f ab
            const flyab = document.createElement("img");
            flyab.src = "images/wildfemale.png";
            flyab.className = "fly-layer";
            flyab.alt = "wild female fly abdomen";
            container.appendChild(flyab);
        }
        else {
            // wild male ab
            const flyab = document.createElement("img");
            flyab.src = "images/wildmale.png";
            flyab.className = "fly-layer";
            flyab.alt = "wild male fly abdomen";
            container.appendChild(flyab);
        }
    }
    
    // display antennae, use phenos[6]
    const flyant = document.createElement("img");
    flyant.src = imageMap.get(phenos[6]);
    flyant.className = "fly-layer";
    flyant.alt = "fly antennae";
    container.appendChild(flyant);

    //body 
    // head and body
    if (isBrown) {
        const flybody = document.createElement("img");
        flybody.src = imageMap.get("brown");
        flybody.className = "fly-layer";
        flybody.alt = "brown fly body";
        container.appendChild(flybody);

    }
    else {
        // wildheadbod 
        const flybody = document.createElement("img");
        flybody.src = imageMap.get("wild");
        flybody.className = "fly-layer";
        flybody.alt = "wild fly body";
        container.appendChild(flybody);
    }

    // wings
    let wingType = "";
    wingType += phenos[2] + phenos[3];
    console.log(wingType);
    // display wings
    let source = "";
    source += imageMap.get(wingType) + "left.png";
    console.log(source)
    console.log(imageMap.get(wingType))
    const wingL = document.createElement("img");
    wingL.src = source;
    wingL.className = "fly-layer";
    wingL.alt = "left wing";
    container.appendChild(wingL);

    const wingR = document.createElement("img");
    wingR.src = imageMap.get(wingType) + "right.png";
    wingR.className = "fly-layer";
    wingR.alt = "right wing";
    container.appendChild(wingR);

    // shell
    if (isBrown) {
        // brwn shell
        const shell = document.createElement("img");
        shell.src = "images/brownshell.png";
        shell.className = "fly-layer";
        shell.alt = "brown shell";
        container.appendChild(shell);
        
    }
    else {
        // wild shell 
        const shell = document.createElement("img");
        shell.src = "images/wildshell.png";
        shell.className = "fly-layer";
        shell.alt = "wild shell";
        container.appendChild(shell);
    }

    //eyes
    const eyes = document.createElement("img");
    eyes.src = imageMap.get(phenos[0]);
    eyes.className = "fly-layer";
    eyes.alt = "eyes";
    container.appendChild(eyes);


    let bristleType = phenos[4] + phenos[5];
    // display bris
    const flybris = document.createElement("img");
    flybris.src = imageMap.get(bristleType);
    flybris.className = "fly-layer";
    flybris.alt = "bristles";
    container.appendChild(flybris);
    

}

function switchMenu(menuId) {
    let sections = document.getElementsByClassName("screen");
    for (var i = 0; i < sections.length; i++) {
        sections[i].style.display = "none";
    }
   
    let sectionToShow = document.getElementById(menuId);
    if (sectionToShow == 'Lab') {
        document.getElementById('maleF1').innerHTML = document.getElementById('maleFly').innerHTML;
        document.getElementById('femaleF1').innerHTML = document.getElementById('femaleFly').innerHTML;
        console.log("happened")
    }
    
    document.getElementById(menuId).style.display = "block";
    

}

function displayChoice(gender) {
    if (gender == "male") {
        let dropdown = document.getElementById('maleChoices');
        document.getElementById('maleFly').innerHTML = dropdown.options[dropdown.selectedIndex].text;
    }
    else {
        let dropdown = document.getElementById('femaleChoices');
        document.getElementById('femaleFly').innerHTML = dropdown.options[dropdown.selectedIndex].text;

    }

}

function confirmParents() {
    if (document.getElementById('maleFly').innerHTML == "") {
        document.getElementById('simMessage').innerHTML = "No male parent selected";
        return;
    }
    else {
        maleParent = new Fly('M', document.getElementById('maleChoices').value, document.getElementById('maleFly').innerHTML);
        //console.log("maleparent" + document.getElementById('maleChoices').value);
    }

    if (document.getElementById('femaleFly').innerHTML == "") {
        document.getElementById('simMessage').innerHTML = "No female parent selected";
        return;
    }
    else {
        femaleParent = new Fly('F', document.getElementById('femaleChoices').value, document.getElementById('femaleFly').innerHTML);
        //console.log("fparent" + document.getElementById('femaleChoices').value);
    }

    switchMenu("Lab");
    displayChoice();
    //console.log(maleParent);
    //console.log(femaleParent);
    
}

function confirmCustomAlleles(isFemale) {

    if (isFemale) {  
        document.getElementById('alleleMenuFemale').style.display = "none";
        document.getElementById('alleleMenuMale').style.display = "block";
        let allAlleles = document.getElementById('eyeAlleles').value
        + document.getElementById('bodyAlleles').value
        + document.getElementById('scalloppedAlleles').value
        + document.getElementById('vestigialAlleles').value
        + document.getElementById('forkedAlleles').value
        + document.getElementById('shavenAlleles').value
        + document.getElementById('antAlleles').value;
        femaleParent = new Fly('F', allAlleles, "customFemale");
        //console.log(femaleParent);
        document.getElementById("alleleMenuFemale").style.display = "none";
        document.getElementById("alleleMenuMale").style.display = "block";

    }
    else {
        document.getElementById('alleleMenuMale').style.display = "none";
        let allAlleles = document.getElementById('eyeAllelesM').value
        + document.getElementById('bodyAllelesM').value
        + document.getElementById('scalloppedAllelesM').value
        + document.getElementById('vestigialAllelesM').value
        + document.getElementById('forkedAllelesM').value
        + document.getElementById('shavenAllelesM').value
        + document.getElementById('antAllelesM').value;
        maleParent = new Fly('M', allAlleles, "customMale");
        //console.log(maleParent);
        
        document.getElementById("alleleMenuMale").style.display = "none";
        switchMenu("Lab");

    }

    
    
}

function getEvenNumber(min, max) {
    let even = Math.floor(Math.random() * ((max - min) / 2 + 1)) * 2 + min;
    return even;
}

function getRandomPair(alleles) {
    let index = getEvenNumber(0, alleles.length - 2   );
    let pair = alleles[index] + alleles[index + 1];
    return pair; 

}

function confirmCustomTraits(isFemale) {
    let alleles = "";
    if (isFemale) {
        alleles += document.getElementById("eyeTraits").value;
        let bodyTraits = document.getElementById("bodyTraits").value;
        console.log(bodyTraits);
        alleles += getRandomPair(bodyTraits);
        console.log(alleles);
        let scalloppedTraits = document.getElementById("scalloppedTraits").value;
        alleles += getRandomPair(scalloppedTraits);
        let vestigialTraits = document.getElementById("vestigialTraits").value;
        alleles += getRandomPair(vestigialTraits);
        let forkedTraits = document.getElementById("forkedTraits").value;
        alleles += getRandomPair(forkedTraits);
        let shavenTraits = document.getElementById("shavenTraits").value;
        alleles += getRandomPair(forkedTraits);
        alleles += "XX";

        femaleParent = new Fly('F', alleles, "traitFemale");
        console.log(femaleParent);
        document.getElementById("femaleTraits").style.display = "none";
        document.getElementById("maleTraits").style.display = "block";

    }
    else {
        alleles += document.getElementById("eyeTraits").value;
        let bodyTraits = document.getElementById("bodyTraitsMale").value;
        alleles += getRandomPair(bodyTraits);
        alleles +=  document.getElementById("scalloppedTraits").value;
        let vestigialTraits = document.getElementById("vestigialTraitsMale").value;
        alleles += getRandomPair(vestigialTraits);
        alleles += document.getElementById("forkedTraitsMale").value;
        alleles += document.getElementById("shavenTraitsMale").value;
        alleles += document.getElementById("hairyTraitsMale").value;

        maleParent = new Fly('M', alleles, "traitMale");
        console.log(maleParent);
        document.getElementById("maleTraits").style.display = "none";
        switchMenu("Lab");
    
    }


}

let password = "password";
let hasAccess = false; 
let pending = "";

function submitPassword() {
    document.getElementById('simMessage').innerHTML = "";
    let input = document.getElementById('passwordInput').value;
    if (input == password) {
        hasAccess = true;
        document.getElementById('allelePassword').style.display = "none";
        getAction(pending);
    }
    else {
        document.getElementById('simMessage').innerHTML = "Incorrect Password";
    }

    
}

function togglePassword(action) {
    pending = action;
    if (!hasAccess) {
        if (document.getElementById('allelePassword').style.display == "none") {
        document.getElementById('allelePassword').style.display = "block";
        }
        else {
            document.getElementById('allelePassword').style.display = "none";
            document.getElementById('simMessage').innerHTML = "";
        }
    }
    else {
        getAction(pending);
    }

}


function toggleAlleleKey() {

    if (hasAccess) {
        
        if (document.getElementById('alleleKey').style.display == "none") {
            document.getElementById('alleleKey').style.display = "block";
        }
        else {
            document.getElementById('alleleKey').style.display = "none";
        }

    }

}

function toggleCustomInfo() {
    if (document.getElementById('infoDiv').style.display == "none") {
            document.getElementById('infoDiv').style.display = "block";
    }
    else {
        document.getElementById('infoDiv').style.display = "none";
    }

}

function chooseAlleles() {
    document.getElementById('alleleMenuFemale').style.display = "block";


}

function chooseTraits() {
    document.getElementById('femaleTraits').style.display = "block";
}

function getAction(action) {
    if (action == "alleleKey") {
        toggleAlleleKey();
    }
    else if (action == "chooseAlleles") {
        chooseAlleles();
    }

}
 


