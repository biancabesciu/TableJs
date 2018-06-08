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

let columnIndex = [
    "pet",
    "name",
    "color",
    "gender"
];

let trDragged;
let table = document.getElementById('tableBody');

function insertRow(rowObj) {
    let newRow = table.insertRow();

    let cel1 = newRow.insertCell(0);
    let cel2 = newRow.insertCell(1);
    let cel3 = newRow.insertCell(2);
    let cel4 = newRow.insertCell(3);

    cel1.innerHTML = rowObj.pet;
    cel2.innerHTML = rowObj.name;
    cel3.innerHTML = rowObj.color;
    cel4.innerHTML = rowObj.gender;

    //make row draggable
    //give it a class of dropzone
    newRow.draggable = "true";

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

//add event listener when dblclick in a cell
table.addEventListener('dblclick', function(eventDblclick) {
    let td = eventDblclick.target;
    td.contentEditable = 'true';
    td.focus();

    td.addEventListener('blur', updateCellValue);
});

//update cell with the new value
function updateCellValue (eventBlur) {
    let td = eventBlur.target;
    let newValue = td.textContent;
    td.innerHTML = newValue;

    //get row and cell index
    let rowIndex = td.parentNode.rowIndex - 1;
    let cellIndex = td.cellIndex;
    let columnName = columnIndex[cellIndex];

    tableArray[rowIndex][columnName] = newValue;

    td.contentEditable = 'false';

    td.removeEventListener('blur', updateCellValue);
}

//append delete button to every last cell
//remove row when button is clicked
function removeRow (trArray) {
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
    for (let i = 0; i < tableArray.length; i++) {
        table.deleteRow(tableArray[i]);
    }
}

//recreate table using tableArray data
function createTable () {
    for(let i = 0; i < tableArray.length; i++) {
        insertRow(tableArray[i]);
    }
}

document.addEventListener('DOMContentLoaded', createTable);


//add event listener to header buttons
//sort array by property object
let buttons = document.getElementsByTagName('table')[0].getElementsByTagName('input');

for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function () {
        tableArray.sort(propSort(buttons[i].name, buttons[i].value));
        emptyTable();
        createTable();
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

/* events fired on the draggable target */
table.addEventListener("drag", function(event) {

}, false);

table.addEventListener("dragstart", function(event) {
    // store a ref. on the dragged elem
    trDragged = event.target;
    trDragged.setAttribute("id", "draggable");
    trDragged.classList.remove('dropzone');

    event.dataTransfer.setData("text/plain", null);
    // make it half transparent
    event.target.style.opacity = .5;
}, false);

table.addEventListener("dragend", function(event) {
    // reset the transparency
    event.target.style.opacity = "";
}, false);

/* events fired on the drop targets */
table.addEventListener("dragover", function(event) {
    // prevent default to allow drop
    event.preventDefault();
}, false);

table.addEventListener("dragenter", function(event) {
    // highlight potential drop target when the draggable element enters it
    if (event.target.parentNode.className === "dropzone") {
        event.target.parentNode.style.background= "purple";
    }
}, false);

table.addEventListener("dragleave", function(event) {
    // reset background of potential drop target when the draggable element leaves it
    if (event.target.parentNode.className === "dropzone") {
        event.target.parentNode.style.background = "";
    }
}, false);

table.addEventListener("drop", function(event) {
    // prevent default action (open as link for some elements)
    event.preventDefault();

    // move dragged elem to the selected drop target
    if (event.target.className === "dropzone") {
        event.target.style.background = "";

        event.target.style.background = "";
        trDragged.parentNode.removeChild(trDragged);
        event.target.appendChild(trDragged);
    }
}, false);

// function arrayDragDrop(arr, fromIndex, toIndex) {
//        while (fromIndex < 0) {
//            fromIndex += arr.length;
//        }
//        while (toIndex < 0) {
//            toIndex += arr.length;
//        }
//        if (toIndex >= arr.length) {
//            let k = toIndex - arr.length;
//            while ((k--) + 1) {
//                arr.push(undefined);
//            }
//        }
//        arr.splice(toIndex, 0, arr.splice(fromIndex, 1)[0]);
//        return arr;
// }

