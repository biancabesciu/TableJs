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
// createTable();///asta se executa ACUM!!
// document.addEventListener('DOMContentLoaded', createTable); ///asta se executa dupa ce se incarca toata pagina (adica asincron, adica dupa ce se executa tot codul care exista in main.js)


let dragSrcEl = null;
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
    newRow.className = "row";
    newRow.draggable = "true";

    newRow.addEventListener('dragstart', handleDragStart, false);
    newRow.addEventListener('dragenter', handleDragEnter, false);
    newRow.addEventListener('dragover', handleDragOver, false);
    newRow.addEventListener('dragleave', handleDragLeave, false);
    newRow.addEventListener('drop', handleDrop, false);
    newRow.addEventListener('dragend', handleDragEnd, false);

    alternateRowColor(table.children);
    removeRow(table.children);
}

//alter table row background color
function alternateRowColor(trArray) {
    if(trArray.length % 2) {
        trArray[trArray.length - 1].classList.add('odd');
    } else {
        trArray[trArray.length - 1].classList.add('even');
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
function removeRow () {
    let trArray = document.getElementById('tableBody').children;
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


// events fired on the draggable target
function handleDragStart(e) {
    dragSrcEl = this;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
    dragSrcEl.style.background = '#c3d1dd';
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault(); // Necessary. Allows us to drop.
    }

    // Don't do anything if dropping the same row we're dragging.
    if (dragSrcEl !== this) {
        // Set the source row's HTML to the HTML of the row we dropped on.
        dragSrcEl.innerHTML = this.innerHTML;
    }

    e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

    return false;
}

function handleDragEnter() {
    // this / e.target is the current hover target.
    this.classList.add('over');
}

function handleDragLeave() {
    this.classList.remove('over');  // this / e.target is previous target element.
}

function handleDrop(e) {
    // this / e.target is current target element.

    if (e.stopPropagation) {
        e.stopPropagation(); // stops the browser from redirecting.
    }

    // Don't do anything if dropping the same row we're dragging.
    if (dragSrcEl !== this) {
        // Set the source row's HTML to the HTML of the row we dropped on.
        dragSrcEl.innerHTML = this.innerHTML;
    }

    this.innerHTML = e.dataTransfer.getData('text/html');
    dragSrcEl.style.background = '';

    return false;
}

function handleDragEnd() {
    // this/e.target is the source node.

    [].forEach.call(table.children, function (row) {
        row.classList.remove('over');
    });
}

