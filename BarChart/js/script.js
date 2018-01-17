var statData = [
    {
        Year: "2013",
        Births: 58719,
        Deaths: 29568,
        Marriages: 19237
    },
    {
        Year: "2014",
        Births: 57243,
        Deaths: 31062,
        Marriages: 20125
    },
    {
        Year: "2015",
        Births: 61038,
        Deaths: 31608,
        Marriages: 19947
    },
    {
        Year: "2016",
        Births: 59430,
        Deaths: 31179,
        Marriages: 20235
    },
    {
        Year: "2017",
        Births: 50000,
        Deaths: 30000,
        Marriages: 20000
    }
];

google.charts.load('current', {packages: ['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart(){

    // var data = google.visualization.arrayToDataTable([
    //     ['Year', 'Birth', 'Deaths', 'Marrages'],
    //     ['2013', 58719, 29568, 19237],
    //     ['2014', 57243, 31062, 20125],
    //     ['2015', 61038, 31608, 19947],
    //     ['2016', 59430, 31179, 20235]
    // ]);

    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Year');
    data.addColumn('number', 'Births');
    data.addColumn('number', 'Deaths');
    data.addColumn('number', 'Marriages');
    for (var i = 0; i < statData.length; i++) {
        data.addRow([statData[i].Year, statData[i].Births, statData[i].Deaths, statData[i].Marriages]);
    }

    var options = {
        title: 'Births, Deaths and Marriages from New Zealand',
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

    var chart = new google.visualization.BarChart(document.getElementById('chartLocation'));
    chart.draw(data, options);



}
