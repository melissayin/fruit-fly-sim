/*
traits:
X linked + incomp (eye shape) 
complete dom auto (body color) 
X linked recessive (scallopped wings)
auto recess (vestigial wings)
X linked recess (forked bristles)
auto recess (shaven bristles)
Y linked (hairy antennae* not accurate)

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
        // F/f
        this.forked = alleles.substring(8, 10);
        // S/s
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
            phenos[0] = "round";
        }
        else if (this.eyes == "SS" || this.eyes == "SY") {
            phenos[0] = "small";
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
        if (this.vestigial == "vv") {
            phenos[3] = "vestigial";
        }
        else {
            phenos[3] = "wild";
        }

        // bristles 
        if (this.forked == "ff" || this.forked == "fY") {
            phenos[4] = "forked";
        }
        else {
            phenos[4] = "wild";
        }

        if (this.shaven == "ss") {
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
    
    console.log("mom + dad: " + momAllele + dadAllele);

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
        console.log("trait 1:")
        console.log(trait1);
        console.log("trait 2:")
        console.log(trait2);
        
        child += computeGenotype(trait1, trait2, isFemale); 
        index += 2; 
    }
    
    let flyChild = new Fly(sex, child, "child");
    console.log(flyChild);
    let phenotype = flyChild.getPhenotype();
    console.log("pheno: " + phenotype)
    return flyChild;
    
}
function switchMenu(menuId) {
    let sections = document.getElementsByClassName("screen");
    for (var i = 0; i < sections.length; i++) {
        sections[i].style.display = "none";
    }
   
    let sectionToShow = document.getElementById(menuId);
    if (sectionToShow == 'F1Gen') {
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
    console.log(maleParent);
    console.log(femaleParent);
    
}

function toggleAllele() {
    let key = `<table>
                <tr>
                    <td>D</td>
                    <td>Wild body color (Autosomal Dominant)</td>
                </tr>
                <tr>
                    <td>d</td>
                    <td>Brown body color (Autosomal Recessive)</td>
                </tr>
                <tr>
                    <td>L</td>
                    <td>Wild eyes (X-Linked Incomplete Dominance)</td>
                </tr>
                <tr>
                    <td>S</td>
                    <td>Small eyes (X-Linked Incomplete Dominance)</td>
                </tr>
                <tr>
                    <td>LS</td>
                    <td>Round eyes (X-Linked Incomplete Dominance)</td>
                </tr>
                
            </table>`

    if (document.getElementById('alleleKey').innerHTML != "") {
        document.getElementById('alleleKey').innerHTML = "";
    }
    else {
        document.getElementById('alleleKey').innerHTML = key;
    }
}

