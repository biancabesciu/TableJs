let tableArray = [
    {
        pet: 'Cat',
        name: 'Millie',
        color: 'White',
        gender: 'female'

    },

    {
        pet: 'Dog',
        name: 'Bruno',
        color: 'Brown',
        gender: 'male'

    },

    {
        pet: 'Giraffe',
        name: 'Tillie',
        color: 'Yellow',
        gender: 'female'

    },

    {
        pet: 'Horse',
        name: 'Frufru',
        color: 'Black',
        gender: 'female'

    },

    {
        pet: 'Dog',
        name: 'Lena',
        color: 'Grey',
        gender: 'female'
    },

    {
        pet: 'Cat',
        name: 'Milo',
        color: 'Tiger',
        gender: 'male'
    }
];

function insertRow(rowObj) {
    let table = document.getElementById('tableBody');

    let newRow = table.insertRow();

    let cel1 = newRow.insertCell(0);
    let cel2 = newRow.insertCell(1);
    let cel3 = newRow.insertCell(2);
    let cel4 = newRow.insertCell(3);

    cel1.innerHTML = rowObj.pet;
    cel2.innerHTML = rowObj.name;
    cel3.innerHTML = rowObj.color;
    cel4.innerHTML = rowObj.gender;

    if(rowObj.gender === 'female') {
        cel4.style.backgroundColor = "#d5a5b1";
    } else {
        cel4.style.backgroundColor = "#7670ab"
    }
}

function addRowButton() {
    let pet = document.getElementById('pet').value;
    let name = document.getElementById('name').value;
    let color = document.getElementById('color').value;
    let gender = document.getElementById('gender').value;

    let rowObj = {
        "pet": pet,
        "name": name,
        "color": color,
        "gender": gender
    };

    insertRow(rowObj);
    tableArray.push(rowObj);

}

function removeRow() {
    let table = document.getElementById('tableBody');

    table.deleteRow(0);

    tableArray.pop();
}

function emptyTable() {
    let table= document.getElementById('tableBody');

    for (let i = 0; i < tableArray.length; i++) {
        table.deleteRow(tableArray[i]);
    }
}

function init () {
    for(let i = 0; i < tableArray.length; i++) {
        insertRow(tableArray[i]);
    }
}
document.addEventListener('DOMContentLoaded', init);

console.log(tableArray);

let th = document.getElementById('sortBtns');
let btn1 = document.createElement('input');
btn1.type = "button";
btn1.value = "UP";
let btn2 = document.createElement('input');
btn2.type = "button";
btn2.value = "DOWN";
th.appendChild(btn1);
th.appendChild(btn2);

btn1.addEventListener('click',  function sortByGenderUp () {
    tableArray.sort(function (a, b) {
         const genderA = a.gender.toUpperCase();
         const genderB = b.gender.toUpperCase();

         if (genderA > genderB) {
             return 1;
         } else if (genderB < genderA) {
             return -1;
         } else {
             return 0;
         }
    });
    emptyTable();
    init();
});


btn2.addEventListener('click',  function sortByGenderDown () {
     tableArray.sort(function (a, b) {
         const genderA = a.gender.toUpperCase();
         const genderB = b.gender.toUpperCase();

         if (genderB > genderA) {
             return 1;
         } else if (genderA < genderB) {
             return -1;
         }  else {
             return 0;
         }
     });
     emptyTable();
     init();
});
