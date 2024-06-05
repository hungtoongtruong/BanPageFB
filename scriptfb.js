// Replace with your spreadsheet ID and range
const spreadsheetId = '15pyjMSpqehIcn85E1V1g1wyAF-mGP_vDjhYnGVWEouw';
const range = 'pageprofile!A2:O100'; // Replace with your desired range

$(document).ready(function() { 
    // Replace 'YOUR_API_KEY' with your actual API key
    const apiKey = 'AIzaSyDOtxZrY3YgZaxtr_Ow0wq1QmaMALG73p0';

    // Construct the URL for the Google Sheets API
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

    // Make an AJAX request to fetch the data
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Extract the values from the response
            const values = data.values;
			const numRows = values.length;
			const countupValue = document.getElementById('countup-value');
			countupValue.innerText = numRows;
            // Display the data on the webpage
            const dataContainer = document.getElementById('data-container');
            values.forEach(rowData => {
                // Create a new table row
                const row = document.createElement('tr');
				let idPage;
                // Create table data cells and fill with data
                rowData.forEach((cellData,columnIndex) => {
					
					if (columnIndex === 0) {
						idPage = cellData;
						console.log(idPage);
						}
                   // Check if the column index is 0 or 1
					if (columnIndex === 1 || columnIndex === 5 || columnIndex === 10 || columnIndex === 14) {
						
						// Create a new table data cell
						const cell = document.createElement('td');
						// Fill the cell with data based on the column index
						if (columnIndex === 1) {
							cell.innerHTML = `<a href="https://www.facebook.com/${idPage}" class="text-hover-primary text-gray-600" style="color: #0866FF !important; font-size: larger;" target="_blank">${cellData}</a>`;
						} else if (columnIndex === 5) {
							cell.innerHTML = `<span class="badge badge-light-success fs-7 fw-bold">${cellData}</span>`;
						} else if (columnIndex === 10) {
							//cell.innerHTML = `${parseFloat(cellData).toLocaleString()}`;
							cell.innerHTML =`<div class="fs-2 fw-bold" id="countup-value" data-kt-countup="true" data-kt-countup-prefix="">${parseFloat(cellData).toLocaleString()}</div>`;
						} else if (columnIndex === 14) {
							cell.innerHTML = `<span class="badge badge-light-success fs-7 fw-bold">${cellData}</span>`;
						}

						// Append the cell to the row
						row.appendChild(cell);
					}

					// Increment the column index
					columnIndex++;
				});

                // Append the row to the table
                dataContainer.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
