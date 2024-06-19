// Replace with your spreadsheet ID and range
const spreadsheetId = '15pyjMSpqehIcn85E1V1g1wyAF-mGP_vDjhYnGVWEouw';
const range = 'pageprofile!A2:O100'; // Replace with your desired range

// Number of records to display per page
const recordsPerPage = 10;

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
            let values = data.values;

            // Sort values by the column with index 10 (11th column) in descending order
            values.sort((a, b) => parseFloat(b[10]) - parseFloat(a[10]));

            // Calculate total number of pages
            const totalPages = Math.ceil(values.length / recordsPerPage);

            // Function to display data for a given page
            function displayPage(pageNumber) {
                // Clear previous data
                const dataContainer = document.getElementById('data-container');
                if (!dataContainer) {
                    console.error('Data container not found.');
                    return;
                }
                dataContainer.innerHTML = '';

                // Calculate start and end index for the current page
                const startIndex = (pageNumber - 1) * recordsPerPage;
                const endIndex = Math.min(startIndex + recordsPerPage, values.length);

                // Iterate over data for the current page
                for (let i = startIndex; i < endIndex; i++) {
                    const rowData = values[i];
                    const row = document.createElement('tr');
                    let idPage;

                    // Create table data cells and fill with data
                    rowData.forEach((cellData, columnIndex) => {
                        if (columnIndex === 0) {
                            idPage = cellData;
                        }
                        // Check if the column index is 1, 5, 10, or 14
                        if (columnIndex === 1 || columnIndex === 5 || columnIndex === 10 || columnIndex === 14) {
                            // Create a new table data cell
                            const cell = document.createElement('td');
                            // Fill the cell with data based on the column index
                            if (columnIndex === 1) {
                                cell.innerHTML = `<a href="https://www.facebook.com/${idPage}" class="text-hover-primary text-gray-600" style="color: #0866FF !important; font-size: larger;" target="_blank">${cellData}</a>`;
                            } else if (columnIndex === 5) {
                                cell.innerHTML = `<span class="badge badge-light-success fs-7 fw-bold">${cellData}</span>`;
                            } else if (columnIndex === 10) {
                                cell.innerHTML = `<div class="fs-2 fw-bold">${parseFloat(cellData).toLocaleString()}</div>`;
                            } else if (columnIndex === 14) {
                                cell.innerHTML = `<span class="badge badge-light-success fs-7 fw-bold">${cellData}</span>`;								
                            } 
                            // Append the cell to the row
                            row.appendChild(cell);
                        }
                    });
					 // Add a new cell for the extra column with the same value as column 10
                    const extraCell = document.createElement('td');
					let priceValue = parseFloat(rowData[10]).toFixed(0);
					let formattedPriceValue = parseFloat(priceValue).toLocaleString();
					let displayPriceValue = formattedPriceValue.slice(0, -4);
                    extraCell.innerHTML = `<div class="fs-2 fw-bold">${displayPriceValue}k</div>`;
                    row.appendChild(extraCell);
                    // Append the row to the table
                    dataContainer.appendChild(row);
                }

                // Update entries information
                updateEntriesInfo(pageNumber);
            }

            // Function to update entries information
            function updateEntriesInfo(pageNumber) {
                const entriesDiv = document.querySelector('.fs-6.fw-semibold.text-gray-700');
				const tongsopageDiv = document.getElementById('tongsopageDiv');
                if (!entriesDiv) {
                    console.error('Entries div not found.');
                    return;
                }

                // Calculate start and end indexes for current page
                const startIndex = (pageNumber - 1) * recordsPerPage + 1;
                const endIndex = Math.min(pageNumber * recordsPerPage, values.length);

                // Update the entries information
                entriesDiv.textContent = `Hiển thị ${startIndex} đến ${endIndex} trang của ${values.length} đang bán`;
				tongsopageDiv.textContent= `${values.length}`;
            }

            // Initial display of first page
            displayPage(1);

            // Pagination controls
            const paginationContainer = document.getElementById('pagination-container');
            if (!paginationContainer) {
                console.error('Pagination container not found.');
                return;
            }
            for (let page = 1; page <= totalPages; page++) {
                const li = document.createElement('li');
                li.classList.add('page-item');
                if (page === 1) {
                    li.classList.add('active');
                }
                const a = document.createElement('a');
                a.classList.add('page-link');
                a.href = '#';
                a.textContent = page;
                a.addEventListener('click', () => {
                    displayPage(page);
                    // Remove 'active' class from all pages
                    const paginationLinks = paginationContainer.querySelectorAll('.page-item');
                    paginationLinks.forEach(link => link.classList.remove('active'));
                    // Add 'active' class to the clicked page
                    li.classList.add('active');
                });
                li.appendChild(a);
                paginationContainer.appendChild(li);
            }
        })
        .catch(error => console.error('Error fetching data:', error));
});
