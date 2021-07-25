const fs = require('fs');

const card_db = require('./cards/card_db.json')

const rawdata = fs.readFileSync('./cards/GetDeckListsV3_response.json');
const decklist = JSON.parse(rawdata).payload;

const printCardsForList = (list, outStream) => {
    while (list?.length > 0) {
        const cardId = list.shift();
        const cardCount = list.shift();

        const card = card_db.find(c => c.arena_id == cardId);

        if (card) {
            outStream.write(`${cardCount} ${card.name}\n`);
        }
    }
}

decklist.forEach(deck => {
    const filename = `./decks/${deck.name.replace(/[^a-z0-9]/gi, '_')}.txt`;
    fs.closeSync(fs.openSync(filename, 'w'));
    const outStream = fs.createWriteStream(filename, {
        flags: "r+",
    });

    console.log(`Deck: ${deck.name}`)
    printCardsForList(deck.mainDeck, outStream);

    if (deck.sideboard?.length > 0) {
        outStream.write("//Sideboard\n");
        printCardsForList(deck.sideboard, outStream);
    }

    outStream.end();
});