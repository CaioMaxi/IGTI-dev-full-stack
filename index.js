import { promises as fs } from "fs";
import readline from "readline";
import { rejects } from "assert";

let arrStates = [];
let arrCities = [];
let citiesList = [];
let arrLength = [];
let allStatesQty = [];
let allCitiesWord = [];
let allCitiesWord2 = [];
let arrBigNames = [];
let arrSmallNames = [];
let sortedBigNames = [];
let sortedSmallNames = [];
// let smallNamesToSort = [];
// let bigNamesToSort = [];

readFile();

async function readFile() {
  const states = await fs.readFile("Estados.json");
  arrStates = await JSON.parse(states);
  const cities = await fs.readFile("Cidades.json");
  arrCities = await JSON.parse(cities);

  organizeEverything();
  checkUf();
  checkWordCities();
}

async function organizeEverything() {
  arrStates.forEach((state) => {
    citiesList = [];
    arrCities.forEach((city) => {
      if (state.ID === city.Estado) {
        citiesList.push(city);
      }
    });

    let obj1 = {
      uf: state.Sigla,
      cities: citiesList,
    };

    createStateFile(state, obj1);
  });
}

async function createStateFile(item, content) {
  try {
    await fs.writeFile(`${item.Sigla}.json`, JSON.stringify(content));
  } catch (err) {
    console.log(err);
  }
}

async function checkUf() {
  try {
    arrStates.forEach((state) => {
      quickRead(state.Sigla);
    });

    fiveUfMoreCities();
    fiveUfLessCities();
    biggestCityOfAll();
    smallestCityOfAll();
  } catch (err) {
    console.log(err);
  }
}

function fiveUfMoreCities() {
  setTimeout(() => {
    console.log("   Top 5 states with higher number of cities: ");
    allStatesQty = allStatesQty.sort((a, b) => {
      return b.qty - a.qty;
    });

    let arrMoreCities = [];
    for (let i = 0; i < 5; i++) {
      arrMoreCities.push(`${allStatesQty[i].uf} - ${allStatesQty[i].qty}`);
    }
    console.log(arrMoreCities);
  }, 200);
}

function fiveUfLessCities() {
  setTimeout(() => {
    console.log("   Top 5 states with lesser number of cities: ");
    allStatesQty = allStatesQty.sort((a, b) => {
      return a.qty - b.qty;
    });

    let arrLessCities = [];
    for (let i = 4; i >= 0; i--) {
      arrLessCities.push(`${allStatesQty[i].uf} - ${allStatesQty[i].qty}`);
    }
    console.log(arrLessCities);
  }, 200);
}

async function quickRead(uf) {
  try {
    let quickRead = await fs.readFile(`${uf}.json`);
    let allCities = JSON.parse(quickRead);
    let quantity = allCities.cities.length;

    let obj2 = {
      uf: uf,
      qty: quantity,
    };

    arrLength = obj2;
    allStatesQty.push(arrLength);

    return arrLength;
  } catch (err) {
    console.log(err);
  }
}

async function checkWordCities() {
  try {
    arrStates.forEach((state) => {
      lookForCities(state.Sigla);
    });

    setTimeout(() => {
      console.log("   Biggest city name of each state: ");
      console.log(arrBigNames);
    }, 300);

    setTimeout(() => {
      console.log("   Smallest city name of each state: ");
      console.log(arrSmallNames);
    }, 300);
  } catch (err) {
    console.log(err);
  }
}

async function lookForCities(uf) {
  try {
    let lookForCities = await fs.readFile(`${uf}.json`);
    allCitiesWord = JSON.parse(lookForCities);
    allCitiesWord2 = allCitiesWord;

    sortBigNames(uf);
    sortSmallNames(uf);
  } catch (err) {
    console.log(err);
  }
}

function sortBigNames(uf) {
  allCitiesWord = allCitiesWord.cities.sort((a, b) => {
    return b.Nome.length - a.Nome.length;
  });

  arrBigNames.push(`${allCitiesWord[0].Nome} - ${uf}`);
  // bigNamesToSort.push(allCitiesWord[0]);
}

function sortSmallNames(uf) {
  allCitiesWord2 = allCitiesWord2.cities.sort((a, b) => {
    return a.Nome.length - b.Nome.length;
  });

  arrSmallNames.push(`${allCitiesWord2[0].Nome} - ${uf}`);
  // smallNamesToSort.push(allCitiesWord2[0]);
}

function biggestCityOfAll() {
  setTimeout(() => {
    sortedBigNames = arrBigNames
      .sort((a, b) => {
        return a.localeCompare(b);
      })
      .sort((a, b) => {
        return b.length - a.length;
      });

    console.log("   The biggest city name is:");
    console.log(sortedBigNames[0]);
  }, 500);
}

function smallestCityOfAll() {
  setTimeout(() => {
    sortedSmallNames = arrSmallNames
      .sort((a, b) => {
        return a.localeCompare(b);
      })
      .sort((a, b) => {
        return a.length - b.length;
      });

    console.log("   The smallest city name is:");
    console.log(sortedSmallNames[0]);
  }, 500);
}
