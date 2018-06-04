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
    editRow(table.children);
}

//alter table row background color
function alternateRowColor(trArray) {
    if(trArray.length % 2) {
        trArray[trArray.length - 1].className = 'odd';
    } else {
        trArray[trArray.length - 1].className = 'even';
    }
}

function editRow(trIndex) {
    document.getElementById("tableBody").ondblclick = function(e) {
        let tr = e.target.parentNode;
        let td = tr.childNodes;
        trIndex = tr.rowIndex;

        // make the row td's  editable
        for( let i = 0; i < td.length; i++){
            td[i].contentEditable = "true";
        }
    };
}
console.log(editRow());




// function arrayMoveRow(arr, fromIndex, toIndex) {
//       while (fromIndex < 0) {
//           fromIndex += arr.length;
//       }
//       while (toIndex < 0) {
//           toIndex += arr.length;
//       }
//       if (toIndex >= arr.length) {
//           let k = toIndex - arr.length;
//           while ((k--) + 1) {
//               arr.push(undefined);
//           }
//       }
//       arr.splice(toIndex, 0, arr.splice(fromIndex, 1)[0]);
//       return arr;
// }


//append delete button to every last cell
//remove row when button is clicked
function removeRow (trArray) {
    let table = document.getElementById('tableBody');
    let btnDelete = document.createElement('input');
    let td = document.createElement('td');
    btnDelete.type = 'button';
    btnDelete.value = "Delete";
    td.appendChild(btnDelete);

    trArray[trArray.length - 1].appendChild(td);

    btnDelete.onclick = function (e) {
        //remove object from array according to index
        let index = e.target.parentNode.parentNode.rowIndex;
        if(index !== -1) {
            tableArray.splice(index - 1, 1);
        }

        //remove row in which the button was clicked
        table.removeChild(e.target.parentNode.parentNode);
    };
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






