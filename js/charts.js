updateData();

async function updateData() {
    const datapoints = await getCurrentData();
    // console.log(datapoints);
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: datapoints.labels,
            datasets: [{
                label: 'Electrical Consumtion (kwh)',
                data: datapoints.currentReadings,
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)'
                ],
                tension: 0.4
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'hour',
                    }
                }
            }
        }
    });
};

// Function to get energy data and parse it.
async function getCurrentData() {
    const labels = [];
    const currentReadings = [];

    //get electricity data
    const urlCurr = '/data/electricity/consumption/1/test.csv';
    const currentFile = await fetch(urlCurr);
    const currentData = await currentFile.text();
    // console.log(currentData);

    //Sort out text data from the csv file
    const currentTable = currentData.split("\n").slice(1);
    //console.log(currentTable);

    currentTable.forEach(row => {
        const column = row.split(',');
        const dateTime = column[0].substring(1).slice(0, -1);
        // const dateTimeConvert = new Date(dateTime);
        // console.log(dateTimeConvert);
        const currentUsage = column[1].substring(1).slice(0, -1);
        labels.push(new Date(dateTime));
        // labels.push(dateTimeConvert);
        // labels.push(dateTime);
        currentReadings.push(currentUsage);
        //console.log(dateTime);
        //console.log(currentReadings);
    });

    //return values to the calling function
    return { labels, currentReadings };
};

// Function to filter the data
function filterData(){
    const labels2 = [...labels];
    // console.log(labels2);
    const startDate = document.getElementById('startDate');
    const endDate = document.getElementById('endDate');

    // get the index number in array
    const indexStartDate = labels2.indexOf(startDate.value);
    const indexEndDate = labels2.indexOf(endDate.value);

    //slice the array to show only selected dates
    const filterDate = labels2.slice(indexStartDate, indexEndDate + 1);

    //replace labels in chart
}