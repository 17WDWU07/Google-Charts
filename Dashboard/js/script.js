google.charts.load('current', {'packages':['corechart', 'controls', 'geochart'], 'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'});
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
                        ticks: [20, 40,60,80],
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

            dashboard.bind([incomeRangeSlider, genderPicker], [scatterChart]);
            dashboard.draw(data);


            //For the pie to work we need to create it after we create the dashboard.
            //As it uses a different dataset, we need to create a new table everytime we slide the range incomeRangeSlider
            //Each time that happens we are going to create a DataView. A dataView is taken from a table.
            //The view will allow us to filter the data to only show the ones which we actually need.
            //Then we will put that into an array and send that data to the create pie function which we are going to create
            //The first time we do this though we are just going to send though dataFromJSON as this will be the full pie on the load
            drawPie(dataFromJSON);
            drawGeo(dataFromJSON);

            google.visualization.events.addListener(incomeRangeSlider, 'statechange', function () {
                var range = incomeRangeSlider.getState();
                var gender = genderPicker.getState();
                var view = new google.visualization.DataView(data);
                currentGender = gender.selectedValues[0]
                view.setRows(data.getFilteredRows([
                    {
                    column: 2,
                    minValue: range.lowValue,
                    maxValue: range.highValue
                    },
                    {
                        column: 3,
                        value: currentGender
                    }
                ]));

                var filteredRows = view.ol;
                var newData = [];
                for (var i = 0; i < filteredRows.length; i++) {
                    newData.push(dataFromJSON[filteredRows[i]]);
                }
                drawPie(newData);
                drawGeo(newData);
            });

            google.visualization.events.addListener(genderPicker, 'statechange', function () {
                var gender = genderPicker.getState();
                var range = incomeRangeSlider.getState();
                var view = new google.visualization.DataView(data);
                currentGender = gender.selectedValues[0]
                view.setRows(data.getFilteredRows([
                    {
                    column: 2,
                    minValue: range.lowValue,
                    maxValue: range.highValue
                    },
                    {
                        column: 3,
                        value: currentGender
                    }
                ]));
                var filteredRows = view.ol;
                var newData = [];
                for (var i = 0; i < filteredRows.length; i++) {
                    newData.push(dataFromJSON[filteredRows[i]]);
                }
                drawPie(newData);
                drawGeo(newData);
            });





        },
        error:function(errorFromJSON){
            console.log("Something has gone wrong");
            console.log(errorFromJson);
            alert("error!!!!!!!!!");
        }
    })

};


function drawPie(data){
    var dataGender = new google.visualization.DataTable();
    dataGender.addColumn('string', 'Gender');
    dataGender.addColumn('number', 'Ammount');
    var male = 0;
    var female = 0;
    for (var i = 0; i < data.length; i++) {
        if(data[i].gender === "Male"){
            male++;
        } else if(data[i].gender === "Female"){
            female++;
        }
    }
    dataGender.addRow(["Male", male]);
    dataGender.addRow(["Female", female]);

    var options = {
        title: "Male and Female Split",
        backgroundColor: {
            fill:'transparent'
        },
        slices: {
          0: { color: '#2980b9' },
          1: { color: '#e74c3c' }
      },
      pieSliceBorderColor: 'transparent',
      tooltip: {
          trigger: 'hover'
      },
      legend: {
          textStyle: {
              color: 'white'
          }
      }
    }

    var Pie = new google.visualization.PieChart(document.getElementById('chart2'));
    Pie.draw(dataGender, options);
}

function drawGeo(data){
    var dataCountry = new google.visualization.DataTable();
    dataCountry.addColumn('string', 'Country');
    dataCountry.addColumn('number', 'Count');

    var countryArray = [];
    var count = [];
    for (var i = 0; i < data.length; i++) {
        var key = data[i].Country;
        if(countryArray.indexOf(key) >= 0){
            count[countryArray.indexOf(key)]++;
        } else {
            countryArray.push(key);
            count.push(1);
        }
    }
    // console.log(countryArray);
    // console.log(count);

    for (var i = 0; i < countryArray.length; i++) {
        dataCountry.addRow([countryArray[i], count[i]])
    };
    var options = {
        colorAxis: {colors: ['#1abc9c', '#f39c12']},
        backgroundColor: 'transparent',
        datalessRegionColor: 'transparent'
    };
    var chart = new google.visualization.GeoChart(document.getElementById('chart3'));
    chart.draw(dataCountry, options);


}
