import * as readline from 'readline-sync';
import { Fighter } from "./FighterInterface";

// TODO fighter.json raw url hier plaatsens
let url = "https://raw.githubusercontent.com/malik0809/file-server/main/fighters.json";
let options = ["View all data", "Filter by ID", "Exit"];
let fighters: Fighter[] | undefined;

async function main() {
    fighters = await getAllData();
    showOptions();
    let input: number = readline.questionInt("Please enter your choice: ");

    if (input === 1) {
        viewAllData();
    }
    else if (input === 2) {
        filterByID();
    }
    else if (input === 3) {
        console.log("Done");
        process.exit(0);
    }

}

function showOptions() {
    console.log("Welcome to the JSON data viewer!");
    for (let index = 0; index < options.length; index++) {
        const element = options[index];
        console.log(`${index + 1}. ${element}`);
    }
}

async function getAllData() {
    try {
        const response = await fetch(url);
        const data = response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

function viewAllData() {
    if (fighters) {
        for (let index: number = 0; index < fighters.length; index++) {
            const fighter: Fighter = fighters[index];
            console.log(`- ${fighter.naam} (${fighter.id})`);
        }
    }
}

function filterByID() {
    const id: number = readline.questionInt("Please enter the ID you want to filter by: ");
    let fighter: Fighter | undefined;
    if (fighters) {
        fighter = fighters.find((fighter) => fighter.id === id )
    }

    if (fighter) {
        console.log(`- ${fighter.naam} (${fighter.id})\n` +
            `  - Beschrijving: ${fighter.beschrijving}\n` +
            `  - Leeftijd: ${fighter.leeftijd}\n` +
            `  - Actief: ${fighter.actief}\n` +
            `  - Geboortedatum: ${fighter.geboortedatum}\n` +
            `  - Profielfoto: ${fighter.profielfotoUrl}\n` +
            `  - Status: ${fighter.status}\n` +
            `  - Gewichtsklasse: ${fighter.gewichtsklasse}\n` +
            `  - Trainer:\n` +
            `    - ID: ${fighter.trainer.id}\n` +
            `    - Naam: ${fighter.trainer.naam}\n` +
            `    - Specialiteit: ${fighter.trainer.specialiteit}\n` +
            `    - Ervaring: ${fighter.trainer.ervaring}\n` +
            `    - Profielfoto: ${fighter.trainer.profielfotoUrl}`);
    } else {
        console.log("Fighter not found.");
    }
}

main()