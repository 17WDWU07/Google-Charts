google.charts.load('current', {packages: ['corechart']});
google.charts.setOnLoadCallback(drawChart);

function drawChart(){

    $.ajax({
        url: "js/carData.json",
        dataType: "json",
        success: function(carData){
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Car model');
            data.addColumn('number', 'Amount on Roads');
            for (var i = 0; i < carData.length; i++) {
                data.addRow([carData[i].CarModel, carData[i].NumberOnRoads]);
            }

            var options = {
                title: 'Cars on the Road'
            };

            var chart = new google.visualization.PieChart(document.getElementById('chartLocation'));
            chart.draw(data, options);
        },
        error: function(error){
            console.log(error);
            alert("Something went wrong, Can't connect to server.");
        }
    });

}
