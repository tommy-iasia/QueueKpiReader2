let rows = [];

function read(text) {
  let items = [];

  let regex = /\[([\d/: .]+)] \[KPI\] \[(\w+)\s+([\w-.]+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)/g;
  while (true) {
    let match = regex.exec(text);
    if (!match) {
      break;
    }

    let item = {
      time: new Date(match[1]),
      category: match[2],
      queue: match[3],
      count: match[4],
      totalCount: match[5],
      duration: match[6],
      totalDuration: match[7],
    };
    items.push(item);
  }

  return (rows = items);
}

function getData(queue, property) {
  return rows
    .filter((t) => t.queue === `${queue}`)
    .map((t) => ({
      x: t.time,
      y: t[property],
    }));
}

function match(items, others) {
  return items
    .map((t) => {
      let matches = others.filter((s) => Math.abs(t.x - s.x) <= 0.05);
      if (matches.length <= 0) {
        return undefined;
      }

      let ordereds = matches.sort((x, y) => Math.abs(x.x - y.x));
      let closest = ordereds[0];

      return {
        x: t.x,
        y: parseInt(t.y) + parseInt(closest.y),
      };
    })
    .filter((t) => t);
}
