function setChart(chartData, total) {
  var dataColumns = [];
  var dataNames = {};

  for (let i = 0; i < chartData.length; i++) {
    dataColumns.push([i, chartData[i]['count']]);
    dataNames[i] = chartData[i]["_id"]["name"];
  }

  require(['c3', 'jquery'], function (c3, $) {
    var chart = c3.generate({
      bindto: '#chart',
      data: {
        columns: dataColumns,
        type: 'pie',
        colors: {
          '0': tabler.colors["blue-darker"] / total,
          '1': tabler.colors["blue-dark"] / total,
          '2': tabler.colors["blue"] / total,
          '3': tabler.colors["blue-light"] / total,
          '4': tabler.colors["blue-lighter"] / total,
          '5': tabler.colors["red-lighter"] / total,
          '6': tabler.colors["red-light"] / total,
          '7': tabler.colors["red"] / total,
          '8': tabler.colors["red-dark"] / total,
          '9': tabler.colors["red-darker"] / total,
        },
        names: dataNames
      },
      axis: {
      },
      legend: {
        show: true,
      },
      padding: {
        bottom: 0,
        top: 0
      },
    });
  });
}