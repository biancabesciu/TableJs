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

    alternateRowColor(table.children);
    removeRow(table.children);
}

//alter table row background color
function alternateRowColor(trArray) {
    if(trArray.length % 2) {
        trArray[trArray.length - 1].className = 'odd';
    } else {
        trArray[trArray.length - 1].className = 'even';
    }
}

//append delete button to every last cell
//remove row when button is clicked
function removeRow (tdArray) {
    let btnDelete = document.createElement('input');
    btnDelete.type = 'button';
    btnDelete.value = "Delete";
    btnDelete.onclick = (function () {
        document.getElementById('tableBody').deleteRow(0);
    });

    tdArray[tdArray.length - 1].appendChild(btnDelete);
}

//adding rows according to the input fields
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

//empty table
function emptyTable() {
    let table= document.getElementById('tableBody');

    for (let i = 0; i < tableArray.length; i++) {
        table.deleteRow(tableArray[i]);
    }
}

//initialize table when load window
function init () {
    for(let i = 0; i < tableArray.length; i++) {
        insertRow(tableArray[i]);
    }
}
document.addEventListener('DOMContentLoaded', init);

console.log(tableArray);

//add event listener to header buttons
//sort array by property object
let buttons = document.getElementsByTagName('table')[0].getElementsByTagName('input');

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function () {
        tableArray.sort(propSort(buttons[i].name, buttons[i].value));
        emptyTable();
        init();
    });
}

//sort function by ascending and descending
function propSort(column, direction) {
    return function(a, b) {
        const A = a[column].toUpperCase();
        const B = b[column].toUpperCase();
        let coefficient = 1,
            result = 0;

        if (direction.toLowerCase() === 'down') {
            coefficient = -1;
        }

        if (A > B) {
            result = 1;
        } else if (A < B) {
            result = -1;
        }
        return coefficient * result;
    }
}








