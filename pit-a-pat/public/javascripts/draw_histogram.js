function drawHistogram(divName, data){
    console.log(divName)
    console.log(data)
    // var chartData = [
    //     {
    //         x: data,
    //         type: 'histogram',
    //         // xbins:{
    //         //     end: 100,
    //         //     start: 0,
    //         //     size : 10
    //         // }
    //     }
    // ];
    // Plotly.newPlot(divName, chartData);

    // var options = {
    //     title: 'Lengths of dinosaurs, in meters',
    //     legend: { position: 'none' },
    // };
    //
    // var chart = new google.visualization.Histogram(document.getElementById(divName));
    // var chartData = google.visualization.arrayToDataTable(data);
    // chart.draw(chartData, options);
    google.charts.load("current", {packages:["corechart"]}) ;
    google.charts.setOnLoadCallback(drawChart);
    function drawChart() {
        new_data = []
        new_data.push(['score'])
        for (var i in data){
            new_data.push([data[i]])
        }
        console.log(new_data)
        var chart_data = google.visualization.arrayToDataTable(new_data);

        var options = {
            legend: {position: 'none'},

        };

        var chart = new google.visualization.Histogram(document.getElementById(divName));
        chart.draw(chart_data, options);
    }
}

