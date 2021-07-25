const fs = require('fs');

const mapProperties = ({arena_id, name, cmc, type_line}) => ({arena_id, name, cmc, type_line})

const rawdata = fs.readFileSync('cards/default-cards-20210511090317.json');
const cardlist = JSON.parse(rawdata);

const result = cardlist
    .filter(card => card.arena_id)
    .map(card => mapProperties(card))

const data = JSON.stringify(result);
fs.writeFileSync('cards/card_db.json', data);
