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
codom (blood* they don't actually have blood)
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

    getAlleles() {
        //console.log("ALLELES: " + this.alleles);
        return this.alleles;
    }
    
   
    getPhenotype() {
        
        let phenos = [];
        // eyes 
        if (this.eyes == "LL" || this.eyes == "LY") {
            phenos[0] = "wild";
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
            phenos[2] = "scalloped";
        } 
        else {
            phenos[2] = "wild";
        }

        // vestigial wings 
        if (this.vestigial == "gg") {
            phenos[3] = "vestigial";
        }
        else {
            phenos[3] = "wild";
        }

        // bristles 
        if (this.forked == "rr" || this.forked == "rY") {
            phenos[4] = "forked";
        }
        else {
            phenos[4] = "wild";
        }

        if (this.shaven == "hh") {
            phenos[5] = "shaven";
        }
        else {
            phenos[5] = "wild";
        }

        // antennae
        if (this.hairy == "Xe") {
            phenos[6] = "hairy";
        }
        else {
            phenos[6] = "wild";
        }

        return phenos;
        
    }

}

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
let currFly = document.getElementById('flyDisplay').innerHTML;
let flyChildren = new Array();
function breed100() {
    for (let i = 0; i < 100; i++) {
        flyChildren[i] = breed(femaleParent, maleParent);
    }
    //console.log(flyChildren)
    return flyChildren;
}

let savedFlies = new Array();

function saveFly() {
   savedFlies.push(currFly);

}

function disposeFly(isSaved) {
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
    sectionToShow.style.display = "block";
    

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

    switchMenu('F1Gen');
    displayChoice();
    //console.log(maleParent);
    //console.log(femaleParent);
    
}

function confirmCustom(isFemale) {

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

function getAction(action) {
    if (action == "alleleKey") {
        toggleAlleleKey();
    }
    else if (action == "chooseAlleles") {
        chooseAlleles();
    }

}
 


