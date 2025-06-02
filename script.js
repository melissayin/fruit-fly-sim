class Fly {
    constructor(sex, bodyAlleles, eyeAlleles) {
        this.sex = sex;
        this.bodyAlleles = bodyAlleles;
        this.eyeAlleles = eyeAlleles;
    }

    getBodyGenotype() {
        return this.bodyAlleles.join('');
    }

    getEyeGenotype() {
        return this.eyeAlleles.join('');
    }
}

let maleParent;
let femaleParent;


function switchMenu(menuId) {
    let sections = document.getElementsByClassName("screen");
    for (var i = 0; i < sections.length; i++) {
        sections[i].style.display = 'none';
    }
   
    let sectionToShow = document.getElementById(menuId);
    sectionToShow.style.display = 'block';

}

function displayChoice(gender) {
    if (gender == "male") {
        let dropdown = document.getElementById('maleChoices');
        document.getElementById('maleFly').innerHTML = dropdown.value;
    }
    else {
        let dropdown = document.getElementById('femaleChoices');
        document.getElementById('femaleFly').innerHTML = dropdown.value;

    }

}

function confirmParents() {
    if (document.getElementById('maleFly').innerHTML == "") {
        document.getElementById('simMessage').innerHTML = "No male parent selected";
        return;
    }
    else {
        maleParent = document.getElementById('maleFly');
    }

    if (document.getElementById('femaleFly').innerHTML == "") {
        document.getElementById('simMessage').innerHTML = "No female parent selected";
        return;
    }
    else {
        femaleParent = document.getElementById('femaleFly');
    }

    switchMenu('F1Gen');
    
}

