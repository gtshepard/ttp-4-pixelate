
let num_rows = 0;
let num_cols = 1;

let rootElID = 'pixel-board';
let rootElement = document.getElementById(rootElID);

let addRows = function () {

		if (num_cols == 0) {

			num_cols++;

		}

		let r = document.createElement('tr');

		for (let i = 0; i < num_cols; i++) {

			let c = document.createElement('td');

			r.appendChild(c);

		}

		rootElement.appendChild(r);
		num_rows++;

}

let removeRows = function () {

	let rows = document.querySelectorAll('#' + rootElID + ' tr');
	let lastRow = rows[rows.length - 1];

	rootElement.removeChild(lastRow);

	num_rows--;

	if (num_rows == 0) {

		num_cols = 0;

	}

}


let addCols = function () {

	if (num_rows == 0) {

		num_rows++;

	}

	let rows = document.querySelectorAll('#' + rootElID +' tr');

	for (let i = 0; i < rows.length; i++) {

		let c = document.createElement('td');
		rows[i].appendChild(c);

	}

	num_cols++;

}

let removeCols = function () {

	let rows = document.querySelectorAll('#' + rootElID + ' tr');

	for (let i = 0; i < rows.length; i++) {


		rows[i].removeChild(rows[i].lastElementChild);

	}

	num_cols--;

	if (num_cols == 0) {

		num_rows = 0;

	}
}

document.getElementById('add-rows').onclick = function () { 
	addRows() 
};

document.getElementById('remove-rows').onclick = function () {
	removeRows();
}


document.getElementById('add-cols').onclick = function () {
	addCols();
}

document.getElementById('remove-cols').onclick = function () {
	removeCols();
}