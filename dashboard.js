google.charts.load('current', { packages: ['corechart'] });
google.charts.setOnLoadCallback(getSpreadsheetData);

function getSpreadsheetData() {
    var spreadsheetId = '1qrKm91qsGDLg6CyhL4qR8j2uG7qLzw-QU8kdi1bbvyA';
    var range = 'Kematian Berdasarkan Tahun dan Tipe!A6:D29';

    var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/' + spreadsheetId + '/gviz/tq?gid=0&range=' + range);
    query.send(handleQueryResponse);
}

function handleQueryResponse(response) {
    if (response.isError()) {
        console.error('Error: ' + response.getMessage());
        return;
    }

    var data = response.getDataTable();
    drawCharts(data);
}

function drawCharts(data) {
    var formatter = new google.visualization.NumberFormat({ pattern: '0' });
    formatter.format(data, 1);

    var options = {
        title: 'Grafik Penyebab dan Jumlah Kematian dari Tahun 2000-2022 di Indonesia',
        width: 1500,
        height: 700,
        hAxis: { title: 'Tahun' },
        vAxis: { title: 'Jumlah Kematian' },
        colors: ['#ff0000', '#0583F2', '#000000', '#FFFF00'],
    };

    var chart1 = new google.visualization.AreaChart(document.getElementById('chart1'));
    chart1.draw(data, options);
}
