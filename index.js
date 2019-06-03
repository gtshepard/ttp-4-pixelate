

// Default empty board size
let num_rows = 0;
let num_cols = 0;

let rootElID = 'pixel-board';
let rootElement = document.getElementById(rootElID);

let selectedColor = "red"; // Default color value

let allowFreeDraw = false; // Default free draw state


// Change color of element based on current
// SELECT value by id
let setColor = ((id) =>  {

  selectedColor = document.getElementById(id).value;

});

document.getElementById("color-selector").onchange = function () {
	
	setColor("color-selector");

}

// Set clicking functionalities to each cell
let makeClickable = function (el) {

	el.props = {
		clicked: false
	};

	el.onmousedown = function () {

		// When mouse is clicked and held, enable
		// free drawing functionalities
		allowFreeDraw = true;

		if (el.props.clicked == false) {
			el.style.backgroundColor = selectedColor;
		}

		else {
			el.style.backgroundColor = "transparent";
			allowFreeDraw = false;
		}

		// Toggle between cell filled or empty
		el.props.clicked = !el.props.clicked;

	}

	el.onmouseup = function () {
		
		// When mouse is released disable
		// free drawing
		allowFreeDraw = false;
	}

	el.onmouseover = function () {

		if (allowFreeDraw == false) {

			return;

		}

		el.style.backgroundColor = selectedColor;
		el.props.clicked = true;
	}

}

// Add rows of `num_cols` length
let addRows = function () {

	let r = document.createElement('tr');

	for (let i = 0; i < num_cols; i++) {

		let c = document.createElement('td');

		makeClickable(c);

		r.appendChild(c);

	}

	num_rows++;

	rootElement.appendChild(r);

}

let removeRows = function () {

	// Do nothing if there are no more rows
	if (num_rows <= 0) {
		return;
	}

	let rows = document.querySelectorAll('#' + rootElID + ' tr');
	let lastRow = rows[rows.length - 1];

	// Remove the last row from the table
	rootElement.removeChild(lastRow);

	num_rows--;

	// If there are no more rows, reset number of columns as well
	// This gives us a clean board to start with.
	if (num_rows <= 0) {

		num_cols = 0;

	}

}

// Add columns to table by adding a cell to the end
// of each row
let addCols = function () {

	let rows = document.querySelectorAll('#' + rootElID +' tr');

	for (let i = 0; i < rows.length; i++) {

		let c = document.createElement('td');
		
		makeClickable(c);

		rows[i].appendChild(c);

	}

	num_cols++;

}

// Remove columns by removing the last cell from
// each row
let removeCols = function () {

	if (num_cols <= 0) {
		return;
	}

	let rows = document.querySelectorAll('#' + rootElID + ' tr');

	for (let i = 0; i < rows.length; i++) {


		rows[i].removeChild(rows[i].lastElementChild);

	}

	num_cols--;

	if (num_cols <= 0) {

		num_rows = 0;

		rootElement.innerHTML = "";
	}
}

// Clear the board
let clearBoard = function () {

	rootElement.innerHTML = "";

	num_rows = 0;
	num_cols = 0;

}

// Fills the board with the selected color
let fillBoard = function () {

	let cells = document.querySelectorAll('#' + rootElID + ' td');

	for (let i = 0; i < cells.length; i++) {
	
		cells[i].style.backgroundColor = selectedColor; 
	
	}	

}

// Empties the existing board of color
let emptyBoard = function () {

	let cells = document.querySelectorAll('#' + rootElID + ' td');

	for (let i = 0; i < cells.length; i++) {
	
		cells[i].style.backgroundColor = "transparent"; 
	
	}

}


// Set controls/button click handlers
document.getElementById('add-rows').onclick = function () { 

	if (num_cols == 0) {

		num_cols = 1; // Used to create a 1x1 board
					  // instead of 1x0

	}

	addRows();

	document.getElementById('num-rows').innerHTML = num_rows;

};

document.getElementById('remove-rows').onclick = function () {
	
	removeRows();

	document.getElementById('num-rows').innerHTML = num_rows;

}


document.getElementById('add-cols').onclick = function () {
	
	if (num_cols == 0) {
		addRows(); // Used to create a 1x0 board
				   // instead of 0x1
	}

	addCols();

	document.getElementById('num-cols').innerHTML = num_cols;

}

document.getElementById('remove-cols').onclick = function () {
	
	removeCols();
	document.getElementById('num-cols').innerHTML = num_cols;
}


document.getElementById('btn-clear').onclick = function () {

	clearBoard();

	document.getElementById('num-rows').innerHTML = num_rows;
	document.getElementById('num-cols').innerHTML = num_cols;

}

document.getElementById('btn-fill').onclick = function () {

	fillBoard();

}


document.getElementById('btn-empty').onclick = function () {

	emptyBoard();

}
