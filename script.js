window.onload = function () {

    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        exportEnabled: true,
        theme: "Light2",
        title: {
            text: "Chart"
        },
        axisY: {
            includeZero: true
        },
        data: [{
            type: "column", //change type to bar, line, area, pie, etc
            indexLabel: "{y}", //Shows y value on all Data Points
            indexLabelFontColor: "#5A5757",
            indexLabelFontSize: 16,
            indexLabelPlacement: "outside",
            dataPoints: [
                { x: 0, y: 71 },
                { x: 1, y: 78 },
                { x: 2, y: 55 },
                { x: 3, y: 50 },
                { x: 4, y: 65 },
            ]
        }]
    });
    chart.render();

    document.getElementById("addDataPoint").addEventListener("click", function () {
        chart.options.data[0].dataPoints.push({ y: Math.round(Math.random() * 100) });
        chart.render();
    });
    document.getElementById("graph").addEventListener("change", function () {
        chart.options.data[0].type = document.getElementById("graph").value;
        chart.render();
    });
    document.getElementById("inputupdater").addEventListener("click", function () {
        chart.options.data[0].dataPoints=[]
        document.getElementById("inputtext").value.split(",").forEach(sd => { chart.options.data[0].dataPoints.push({ y: Number(sd) }) })
        chart.render();
    });



}