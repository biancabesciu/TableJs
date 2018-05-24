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

function init () {
    for(let i = 0; i < tableArray.length; i++) {

        let backgroundColor;
        let pet = tableArray[i].pet;

        if(pet === 'Cat') {
            backgroundColor = "aliceBlue";
        } else if (pet === 'Giraffe') {
            backgroundColor = "#4d4c59";
        } else if (pet === 'Dog'){
            backgroundColor = "#71777d";
        } else if (pet === 'Horse') {
            backgroundColor = "#f7f6f0";
        }

        let table =
            '<tr class="change-color" style ="background-color: ' + backgroundColor + '">' +
            '<td class="pet">' + tableArray[i].pet + '</td>' +
            '<td class="name">' + tableArray[i].name + '</td>' +
            '<td class="color">' + tableArray[i].color+ '</td>' +
            '<td class="gender">' + tableArray[i].gender + '</td>' +
            '</tr>';

        let tds = document.getElementsByTagName('td');
        for(let i = 0; i < tds.length; i++) {
            tds[i].contentEditable = 'true';
        }

        document.getElementById('tableBody').insertAdjacentHTML("beforeend", table);
    }
}
document.addEventListener('DOMContentLoaded', init);

function addRow() {
    let table = document.getElementById('tableBody');
    let tr = document.getElementsByTagName('tr');
    let td = document.getElementsByTagName('td');

    let pet = document.getElementById('pet').value;
    let name = document.getElementById('name').value;
    let color = document.getElementById('color').value;
    let gender = document.getElementById('gender').value;

    let newRow = table.insertRow(0);

    let cel1 = newRow.insertCell(0);
    let cel2 = newRow.insertCell(1);
    let cel3 = newRow.insertCell(2);
    let cel4 = newRow.insertCell(3);

    cel1.innerHTML = pet;
    cel2.innerHTML = name;
    cel3.innerHTML = color;
    cel4.innerHTML = gender;

    const newObj = {
        pet: pet,
        name: name,
        color: color,
        gender: gender
    };

    tableArray.push(newObj);
    console.log(tableArray);
}

function removeRow() {
    let table = document.getElementById('tableBody');

    table.deleteRow(0);

    tableArray.pop();
 }

function sortByName () {
    tableArray.sort(function (a, b) {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();

        if (nameA > nameB) {
            return 1;
        } else if (nameA < nameB) {
            return -1;
        } else {
            return 0;
        }
    });
}
console.log(tableArray.sort(sortByName()));

