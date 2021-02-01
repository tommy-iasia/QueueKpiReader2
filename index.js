$(function () {
  $('input[type="file"]').change(function () {
    let reader = new FileReader();
    reader.onload = () => {
      read(reader.result);
      reload();
    };

    reader.readAsText(this.files[0]);

    $(".file").addClass("disabled");
    $(".chart").addClass("active");
  });
});

function reload() {
  var lines = getLines();
  draw(lines);
}

let getLines = () => {
  let queueIds = [
    ...new Set(
      rows
        .map((t) => /([\w-.]+)\.(addQueue|process|timewait|timeused)/.exec(t.queue))
        .filter((t) => t)
        .map((t) => t[1])
    ),
  ];

  return queueIds.flatMap((queueId) => [
    {
      label: `${queueId}.addQueue`,
      data: getData(`${queueId}.addQueue`, "totalCount"),
    },
    {
      label: `${queueId}.process`,
      data: getData(`${queueId}.process`, "totalCount"),
    },
  ]);
};
