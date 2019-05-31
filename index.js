
let num_rows = 0;
let num_cols = 0;

let rootElement = document.getElementById('root');

let addRows = function () {


		let r = document.createElement('tr');

		for (let i = 0; i < num_cols; i++) {

			let c = document.createElement('th');

			r.appendChild(c);

		}

		rootElement.appendChild(r);

}

document.getElementById('add-rows').onclick = function () { 
	addRows() 
};