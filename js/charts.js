updateData();

// Function to get data and save to json

async function getData() {

    const electricUrl = '/data/electricity/consumption/1/20220206-20220507.csv';
    const gasUrl = '/data/gas/consumption/1/20220206-20220507.csv';

    // retrieve data from CSV file
    const elecFile = await fetch(electricUrl);
    const elecData = await elecFile.text();

    const gasFile = await fetch(gasUrl);
    const gasData = await gasFile.text();

    // Maybe i should create a function to get the text file slice it and put the data into an array.

    const elecDp = elecData.split(/\r?\n/);
    const gasDp = gasData.split(/\r?\n/);

    // map first array and concat the gas and electrical data into one array
    const datapoints = elecDp.map((o, i) => o.concat(",", gasDp[i]));

    datapoints.forEach(row => {
        const column = row.split(',');
        const column3 = column.splice(2, 1);

        const time = column[0].substring(1).slice(0, -1);
        const elec = column[1].substring(1).slice(0, -1);
        const gas = column[1].substring(1).slice(0, -1);
    });

    //     dataTable.forEach(row => {
    //         const column = row.split(',');
    //         const data1 = column[0].substring(1).slice(0, -1);
    //         const data2 = column[1].substring(1).slice(0, -1);
    //         results.push(new Date(data1));
    //         results.push(data2);
    //     });

};

// Function to filter the data
// function filterData() {
//     //Call function to get data from CSV.
//     const datapoints = await getCurrentData();
//     const labels2 = [...datapoints.labels];
//     // console.log(labels2);
//     const startDate = document.getElementById('startDate');
//     const endDate = document.getElementById('endDate');

//     // get the index number in array
//     const indexStartDate = labels2.indexOf(startDate.value);
//     const indexEndDate = labels2.indexOf(endDate.value);

//     //slice the array to show only selected dates
//     const filterDate = labels2.slice(indexStartDate, indexEndDate + 1);

//     //replace labels in chart
// };

// function to update chart with temporary data
async function updateData() {
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            datasets: [{
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3, 6],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)'
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
};

// Function to get energy data and parse it.
// function for linked date picker
// $(function () {
//     $('#startdate').datetimepicker();
//     $('#enddate').datetimepicker({
// useCurrent: false //Important! See issue #1075
// });
//     $("#startdate").on("dp.change", function (e) {
//         $('#enddate').data("DateTimePicker").minDate(e.date);
//     });
//     $("#enddate").on("dp.change", function (e) {
//         $('#startdate').data("DateTimePicker").maxDate(e.date);
//     });
// });