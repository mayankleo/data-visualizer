var data = [
    { label: "Value0", x: 0, y: 17 },
    { label: "Value1", x: 1, y: 71 },
    { label: "Value2", x: 2, y: 55 },
    { label: "Value3", x: 3, y: 82 },
    { label: "Value4", x: 4, y: 42 },
]
window.onload = function () {

    var table = document.getElementById("editableTable");
    for (let j = 1; j < data.length; j++) {
        let newRow = table.insertRow(table.rows.length);
        for (let i = 0; i < 3; i++) {
            let cell = newRow.insertCell(i);
            cell.contentEditable = "true";
            if (i == 0) {
                cell.textContent = data[j].label;
            } else if (i == 1) {
                cell.textContent = data[j].x;
            } else if (i == 2) {
                cell.textContent = data[j].y
            }
        }
    }

    document.getElementById("addRowBtn").addEventListener("click", function () {
        let newRow = table.insertRow(table.rows.length);
        for (let i = 0; i < table.rows[0].cells.length; i++) {
            let cell = newRow.insertCell(i);
            cell.contentEditable = "true";
            if (i == 0) {
                cell.textContent = "Value" + (table.rows.length - 2);
            } else {
                cell.textContent = table.rows.length - 2;
            }
        }
    });

    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        colorSet: "colorSet3",
        theme: "Light2",
        title: {
            text: "Chart"
        },
        axisX: {
            title: "X"
        },
        axisY: {
            title: "Y",
            includeZero: true
        },
        data: [{
            type: "column",
            indexLabel: "{y}",
            indexLabelFontColor: "#5A5757",
            indexLabelFontSize: 16,
            indexLabelPlacement: "outside",
            dataPoints: data
        }]
    });
    chart.render();

    document.getElementById("addDataPoint").addEventListener("click", function () {
        let ranum = Math.round(Math.random() * 100);
        let newRow = table.insertRow(table.rows.length);
        for (let i = 0; i < table.rows[0].cells.length; i++) {
            let cell = newRow.insertCell(i);
            cell.contentEditable = "true";
            if (i == 0) {
                cell.textContent = "Value" + (table.rows.length - 2);
            } else if (i == 1) {
                cell.textContent = (table.rows.length - 2);
            } else {
                cell.textContent = ranum;
            }
        }
        if (document.getElementById("showlable").checked) {
            chart.options.data[0].dataPoints.push({ label: "Value" + (table.rows.length - 2), x: (table.rows.length - 2), y: ranum });
        } else {
            chart.options.data[0].dataPoints.push({ x: (table.rows.length - 2), y: ranum });
        }
        chart.render();
    });
    document.getElementById("graph").addEventListener("change", function () {
        chart.options.data[0].type = document.getElementById("graph").value;
        chart.render();
    });
    document.getElementById("themecol").addEventListener("change", function () {
        chart.options.theme = document.getElementById("themecol").value;
        chart.render();
    });
    document.getElementById("colors").addEventListener("change", function () {
        chart.options.colorSet = document.getElementById("colors").value;
        chart.render();
    });
    document.getElementById("showlable").addEventListener("change", function () {
        if (document.getElementById("showlable").checked) {
            chart.options.data[0].dataPoints.forEach((element, index) => {
                element.label = "Value" + index;
            });
        } else {
            chart.options.data[0].dataPoints.forEach(element => {
                delete element.label
            });
        }
        chart.render();
    });

    document.getElementById("downloadChart").addEventListener("click", function () {
        chart.exportChart({ format: "png" });
    });
    document.getElementById("Updatedata").addEventListener("click", function () {
        chart.options.axisX.title = table.rows[0].cells[1].textContent;
        chart.options.axisY.title = table.rows[0].cells[2].textContent;
        chart.options.data[0].dataPoints = [];
        let Rowlen = table.rows.length;
        for (let i = 1; i < Rowlen; i++) {
            let dummy;
            if (document.getElementById("showlable").checked) {
                dummy = {
                    label: table.rows[i].cells[0].textContent,
                    x: Number(table.rows[i].cells[1].textContent),
                    y: Number(table.rows[i].cells[2].textContent)
                }
            } else {
                dummy = {
                    x: Number(table.rows[i].cells[1].textContent),
                    y: Number(table.rows[i].cells[2].textContent)
                }
            }

            chart.options.data[0].dataPoints.push(dummy);
        }
        chart.render();
    });

}