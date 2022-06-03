const { List, Label } = require("../models");

async function insertData() {
  const p54_08 = await List.create({
    name: "54_08_p",
  });
  for (let i = 0; i <= 179; i++) {
    const name = `frame${i}.png`;
    await Label.create({
      name,
      ListId: p54_08.id,
    });
  }
  const p54_09 = await List.create({
    name: "54_09_p",
  });
  for (let i = 0; i <= 179; i++) {
    const name = `frame${i}.png`;
    await Label.create({
      name,
      ListId: p54_09.id,
    });
  }

  const p54_10 = await List.create({
    name: "54_10_p",
  });
  for (let i = 0; i <= 179; i++) {
    const name = `frame${i}.png`;
    await Label.create({
      name,
      ListId: p54_10.id,
    });
  }

  const r54_11 = await List.create({
    name: "54_11_r",
  });
  for (let i = 0; i <= 179; i++) {
    const name = `frame${i}.png`;
    await Label.create({
      name,
      ListId: r54_11.id,
    });
  }

  const r54_13 = await List.create({
    name: "54_13_r",
  });
  for (let i = 0; i <= 179; i++) {
    const name = `frame${i}.png`;
    await Label.create({
      name,
      ListId: r54_13.id,
    });
  }
  const p54_14 = await List.create({
    name: "54_14_p",
  });
  for (let i = 0; i <= 179; i++) {
    const name = `frame${i}.png`;
    await Label.create({
      name,
      ListId: p54_14.id,
    });
  }
  const r54_15 = await List.create({
    name: "54_15_r",
  });
  for (let i = 0; i <= 179; i++) {
    const name = `frame${i}.png`;
    await Label.create({
      name,
      ListId: r54_15.id,
    });
  }
  const p54_16 = await List.create({
    name: "54_16_p",
  });
  for (let i = 0; i <= 179; i++) {
    const name = `frame${i}.png`;
    await Label.create({
      name,
      ListId: p54_16.id,
    });
  }
}

insertData();
