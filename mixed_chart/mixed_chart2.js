new Chart(document.getElementById("mixed-chart"), {
    type: 'bar',
    data: {
        labels: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug'],
        datasets: [{
            label: "Unemployment",
            type: "line",
            borderColor: "#94a25e",
            data: [191581, 168966, 710316, 681015, 762470, 668630, 511273],
            fill: false
        }, {

            label: "Covid Cases",
            type: "bar",
            backgroundColor: ['rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1,
            backgroundColorHover: "#cd763e",

            data: [0, 15010, 118174, 159575, 170908, 181012, 191590],
        }]
    },
    options: {
        title: {
            display: true,
            text: 'NJ Covid Cases vs. Unemployment Rates for 2020',
            fontColor: 'grey',
            fontSize: '19',
            fontStyle: 'bold'

        }
    }
});