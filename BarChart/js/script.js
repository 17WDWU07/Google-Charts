google.charts.load('current', {packages: ['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart(){

    var data = google.visualization.arrayToDataTable([
        ['Year', 'Birth', 'Deaths', 'Marrages'],
        ['2013', 58719, 29568, 19237],
        ['2014', 57243, 31062, 20125],
        ['2015', 61038, 31608, 19947],
        ['2016', 59430, 31179, 20235]
    ]);

    var options = {
        title: 'Births, Deaths and Marrages from New Zealand',
        subtitle: 'over the last 4 years',
        hAxis:{
            title: 'Number',
            minValue: 0
        },
        vAxis: {
            title: 'Year'
        },
        animation:{
            startup:true,
            duration: 1000,
            easing: 'out'
        }
    };

    var chart =  new google.visualization.BarChart(document.getElementById('chartLocation'));
    chart.draw(data, options);



}
