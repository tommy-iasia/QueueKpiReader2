function draw(lines) {
  let colors = [
    "255, 99, 132",
    "54, 162, 235",
    "255, 206, 86",
    "75, 192, 192",
    "153, 102, 255",
    "255, 159, 64",
    "159, 255, 64",
    "255, 102, 153",
    "206, 86, 255",
    "206, 255, 86",
  ];

  let datasets = lines.map((t, i) => {
    let color = colors[i];
    return {
      backgroundColor: [`rgba(${color}, 0.2)`],
      borderColor: [`rgba(${color}, 1)`],
      borderWidth: 1,
      showLine: true,
      ...t,
    };
  });

  $("#chart").remove();
  $("body").append('<canvas id="chart" width="1200" height="800"></canvas>');

  let context = document.getElementById("chart").getContext("2d");
  new Chart(context, {
    type: "scatter",
    data: {
      datasets: datasets,
    },
    options: {
      responsive: false,
      scales: {
        xAxes: [
          {
            type: "time",
            time: {
              unit: "minute",
              unitStepSize: 60,
            },
          },
        ],
      },
    },
  });
}
