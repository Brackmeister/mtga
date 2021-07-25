# Some tools to help with MTG Arena logs and card lists

# create_decklists.js

This script will read the `GetDeckListsV3` response from the Arena log and using a card database will create a plain text deck list for each deck in your collection.

How to use
* place a card database JSON as `card_db.json` into the `cards` folder
  * needs to be done only once (and each time a new set comes out)
  * use the `prepare_cardlist.js` script to create this file (see below)
* place your deck list as `GetDeckListsV3_response.json` into the `cards` folder
  * for that, open the `Player.log`
  * search for the last line like `[UnityCrossThreadLogger]<== Deck.GetDeckListsV3 {"id":14,"payload"...`
  * copy all from `{"id":14,"payload"` to the end of the line
  * needs to be done each time you add/edit one of your decks
* execute `node create_decklists.js`
  * this will create lists for all of your decks in the `decks` folder

# list_expansion_by_rarity.js

This script will generate a CSV file with the cards of one set and how often you have them in your collection.
The cards will be grouped by rarity (commons and basic lands are skipped), so that you can copy the output to your Hipsters of the Coast Draft tracking Google Sheet.

How to use
* install my "17lands Collection Raw Data Downloader" add-on for Firefox
  * https://addons.mozilla.org/de/firefox/addon/17lands-rawdata/
* download the raw data of your collection for a given expansion
  * browse to https://www.17lands.com/collection
  * after selecting the extension, click on `Download JSON`
  * it will prompt you to save the file called `<extension shortcut>.json` (e.g. `AFR.json`)
  * place it into the `cards` folder
* execute `node list_expansion_by_rarity.js cards/AFR.json`
  * this will create `cards/AFR.json`
* open `cards/AFR.json` with the spreadsheet app of your choice (e.g. OpenOffice Calc)
  * copy the content over the corresponding lined of your copy of the Hipsters' table

# prepare_cardlist.js

This script will transform the Scryfall card database into a format that can be used with the `create_decklists.js` script above.

How to use
* Download the Scryfall card database
  * Download the "Default Cards" file from https://scryfall.com/docs/api/bulk-data
  * place it as `default-cards.json` into the `cards` folder
* Execute `prepare_cardlist.js`
  * this will create the `cards/card_db.json` file required by `create_decklists.js`
