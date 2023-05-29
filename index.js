import _ from 'lodash'

export default function solution(content) {
    //BEGIN
    const rows = content.split('\n');
    const data = rows.slice(1).map((row) => row.split(','));
    console.log(`Count: ${data.length}`);

    // step 2
    const countries = data.map(row => row[1]);
    const Uniqcountries = _.uniq(countries);
    console.log(Uniqcountries.length);

    //step 3
    const countCrash = data.map(row => row[3]);
    const companies = data.map(row => row[0]);
    const indexMinCrash = countCrash.indexOf(String(Math.min(...countCrash)));
    const indexMaxCrash = countCrash.indexOf(String(Math.max(...countCrash)));
    console.log(`${companies[indexMaxCrash]}: ${String(Math.max(...countCrash))} and ${companies[indexMinCrash]}: ${String(Math.min(...countCrash))}`)

    //step 4
    const listDead = data.map(row => row[4]);
    const countDead = listDead.reduce((acc, curr) => acc = Number(acc) + Number(curr));
    const listDamage = data.map(row => row[5]);
    const countDamage = listDamage.reduce((acc, curr) => acc = Number(acc) + Number(curr));
    console.log(`Умерших: ${Math.round(countDead / (countDead + countDamage) * 100)}%`);
    console.log(`Раненых: ${Math.round(countDamage / (countDead + countDamage) * 100)}%`);

    //step 5
    const safeRatings = {};
    data.map((dat) => safeRatings[dat[1]] = []);
    data.map((dat) => safeRatings[dat[1]].push(dat[6]));

    const average = (values) => values.reduce((acc, el) => Number(acc) + Number(el), 0) /
        values.length;

    for (let prop in safeRatings) {
        safeRatings[prop] = average(safeRatings[prop])
    }
    const entries = Object.entries(safeRatings);
    let safestCountry = entries[0][0];
    entries.reduce((acc, elem) => {
        if (Number(elem[1] > acc)) {
            safestCountry = elem[0];
            return Number(elem[1]);
        }
        return acc;
    }, 0);
    console.log(safestCountry);
    //END
}
