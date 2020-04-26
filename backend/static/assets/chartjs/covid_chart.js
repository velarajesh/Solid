// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

dates = []
cases = []

$.get("https://covidtracking.com/api/v1/us/daily.json", function (data, status) {
    if(status === 'success') {
        data.forEach(item => {
            let year = item.date.toString()
            year = year.substr(0, 4)
            let month = item.date.toString()
            month = month.substr(4, 2)
            let day = item.date.toString()
            day = day.substr(6, 2)

            let date = `${year}-${month}-${day}`

            start_date = '2020-03-01'
            date_now = Date()
            if (start_date <= date && date <= date_now) {
                dates.unshift(date)
                cases.unshift(item.positive / 10000)
            }
        })
    }
    else{
        console.log("Unsuccessful query")
    }
    var ctx = document.getElementById("covid-usa");
    var myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: "COVID 19 Cases",
                lineTension: 0.3,
                backgroundColor: "rgba(2,117,216,0.2)",
                borderColor: "rgba(2,117,216,1)",
                pointRadius: 5,
                pointBackgroundColor: "rgba(2,117,216,1)",
                pointBorderColor: "rgba(255,255,255,0.8)",
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(2,117,216,1)",
                pointHitRadius: 50,
                pointBorderWidth: 2,
                data: cases,
            }],
        },
        options: {
            scales: {
                xAxes: [{
                    time: {
                        unit: 'date'
                    },
                    gridLines: {
                        display: false
                    },
                    ticks: {
                        maxTicksLimit: 7
                    }
                }],
                yAxes: [{
                    ticks: {
                        min: 0,
                        max: 100,
                        maxTicksLimit: 5
                    },
                    gridLines: {
                        color: "rgba(0, 0, 0, .125)",
                    }
                }],
            },
            legend: {
                display: false
            }
        }
    });

});

// Area Chart Example

