updateData();

async function updateData() {
    const datapoints = await getCurrentData();
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
    const urlCurr = '../data/electricity/consumption/1/test.csv';
    const currentFile = await fetch(urlCurr);
    const currentData = await currentFile.text();
    // console.log(currentData);

    //Sort out text data from the csv file
    const currentTable = currentData.split("\n").slice(1);
    //console.log(currentTable);

    currentTable.forEach(row => {
        const column = row.split(',');
        const dateTime = column[0].substring(1).slice(0, -1);
        //console.log(dateTime);
        const currentUsage = column[1].substring(1).slice(0, -1);
        labels.push(new Date(dateTime));
        currentReadings.push(currentUsage);
        //console.log(dateTime);
        //console.log(currentReadings);
    });

    //return values to the calling function
    return { labels, currentReadings };
};



// Below code fot dummy data on the chart.

// const ctx = document.getElementById('myChart').getContext('2d');
// const myChart = new Chart(ctx, {
//     type: 'line',
//     data: {
//         labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
//         datasets: [{
//             label: 'Current in kwh',
//             data: [6, 9, 3, 5, 2, 3, 4, 8],
//             backgroundColor: [
//                 'rgba(255, 99, 132, 1)'
//             ], 
//             borderColor: [
//                 'rgba(255, 99, 132, 1)'
//             ],
//             tension: 0.4
//         },{
//             label: 'Gas in m³',
//             data: [5, 8, 6, 3, 4, 6, 3, 2],
//             backgroundColor: [
//                 'rgba(54, 162, 235, 1)'
//             ],
//             borderColor: [
//                 'rgba(54, 162, 235, 1)'
//             ],
//             tension: 0.4
//         }]
//     },
//     options: {
//         scales: {
//             y: {
//                 beginAtZero: true
//             }
//         }
//     }
// });