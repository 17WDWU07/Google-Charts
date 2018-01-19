google.charts.load('current', {'packages':['corechart', 'controls']});
google.charts.setOnLoadCallback(drawDashboard);

function drawDashboard(){

    $.ajax({
        url: "js/peopleInfo.json",
        dataType: "json",
        success:function(dataFromJSON){
            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Name');
            data.addColumn('number', 'Age');
            data.addColumn('number', 'Income');
            data.addColumn('string', 'Gender');

            for (var i = 0; i < dataFromJSON.length; i++) {
                data.addRow([
                    dataFromJSON[i].first_name + ' ' + dataFromJSON[i].last_name,
                    dataFromJSON[i].age,
                    dataFromJSON[i].annual_income,
                    dataFromJSON[i].gender
                ]);
            };

            var dashboard = new google.visualization.Dashboard(
                document.getElementById('dashboard'));

            var scatterChart = new google.visualization.ChartWrapper({
                chartType: 'ScatterChart',
                containerId: 'chart1',
                options: {
                    width: '100%',
                    height: '100%',
                    legend: 'none',
                    title: 'Age vs Annual Income',
                    colors: ['white'],
                    backgroundColor: {
                        fill:'transparent'
                    },
                    hAxis:{
                        title: "Age",
                        ticks: [20, 40,60,80,100],
                        gridlines: {
                            color: '#7f8c8d'
                        },
                        textStyle: {
                            color: 'white'
                        }
                    },
                    vAxis: {
                        title: "Annual Income",
                        gridlines: {
                            color: '#7f8c8d'
                        },
                        textStyle: {
                            color: 'white'
                        }
                    }
                },
                view:{
                    columns: [1, 2]
                }
            });

            var tableChart = new google.visualization.ChartWrapper({
                    chartType: 'Table',
                    containerId: 'chart2',
                    options:{
                        colors: ['black']
                    }
            });

            var incomeRangeSlider = new google.visualization.ControlWrapper({
                controlType: 'NumberRangeFilter',
                containerId: 'control1',
                options: {
                    filterColumnLabel: 'Income',
                    ui: {
                        labelStacking: "vertical"
                    }
                }
            });

            var genderPicker = new google.visualization.ControlWrapper({
                controlType: 'CategoryFilter',
                containerId: 'control2',
                options:{
                    filterColumnLabel: 'Gender',
                    ui: {
                        allowMultiple: false,
                        allowTyping: false,
                        labelStacking: "vertical"
                    }
                }
            });

            dashboard.bind([incomeRangeSlider, genderPicker], [scatterChart, tableChart]);
            dashboard.draw(data);







        },
        error:function(errorFromJSON){
            console.log("Something has gone wrong");
            console.log(errorFromJson);
            alert("error!!!!!!!!!");
        }
    })

};
