const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        datasets: [{
            label: 'Current in kwh',
            data: [6, 9, 3, 5, 2, 3, 4, 8],
            backgroundColor: [
                'rgba(255, 99, 132, 1)'
            ], 
            borderColor: [
                'rgba(255, 99, 132, 1)'
            ],
            tension: 0.4
        },{
            label: 'Gas in m³',
            data: [5, 8, 6, 3, 4, 6, 3, 2],
            backgroundColor: [
                'rgba(54, 162, 235, 1)'
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)'
            ],
            tension: 0.4
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