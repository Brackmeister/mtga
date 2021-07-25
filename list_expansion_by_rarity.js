const fs = require('fs');

const myArgs = process.argv.slice(2);
const infile = myArgs[0]
const expansion = infile.split(".")[0]

if (!infile) {
  console.log(`Usage: ${process.argv[0]} ${process.argv[1]} <JSON cardlist from 17lands to parse>`)
  return 1
}

const rawdata = fs.readFileSync(infile);
let cardlist = JSON.parse(rawdata).cards;

switch (expansion) {
  case "STX":
    cardlist = cardlist.filter(item => item.card_id < 77480)
    break;
  case "STA":
    cardlist = cardlist.filter(item => item.card_id >= 77480)
    break;
  default:
    break;
}

const groupBy = (items, key) => items.reduce(
    (result, item) => ({
      ...result,
      [item[key]]: [
        ...(result[item[key]] || []),
        item,
      ],
    }),
    {},
  );

const getColor = (card) => {
  if (card.color.length > 1) return "M";
  if (card.color === "") return "C";
  return card.color;
}

const cardsByRarity = groupBy(cardlist, "rarity");

const printByRarity = (groupedCards, rarity, outStream) => {
  groupedCards[rarity]
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach((card, index) => outStream.write(card.name + ";" + getColor(card) + ";" + card.quantity + (index === 0 ? `;${rarity}` : "") + "\n"));
}

const outfile = `${expansion}.csv`
const outStream = fs.createWriteStream(outfile, {
  flags: "w",
});

printByRarity(cardsByRarity, "uncommon", outStream)
printByRarity(cardsByRarity, "rare", outStream)
printByRarity(cardsByRarity, "mythic", outStream)

outStream.end()

console.log(`Wrote cardlist to '${outfile}' to be copied to Hipsters of the Coasts table`)
