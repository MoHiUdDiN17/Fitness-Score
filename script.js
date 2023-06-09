let userData = [];
// let countryObj = [];
const tableBody = document.querySelector('#table_body');
const scoreHeader = document.querySelector('#score_column');
const highestScore = document.querySelector('#Highest-score');

let scoreAscending = false;
let maxScore = 0;
let highestMan;

const sortUserScores = () => {
    const tempData = [...userData];
    tempData.sort((a, b) => scoreAscending ? a.score - b.score : b.score - a.score);
    scoreAscending = !scoreAscending;
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }
    console.log(tempData);
    renderTableRows(tempData);
}

document.getElementById('myInput').addEventListener("keydown", () => {
    let message = document.getElementById('myInput').value;
    console.log(message);
    const temp = [...userData];
    const filteredUser = temp.filter(element => {
        const userName = element?.name?.toLowerCase();
        const value = userName.search(message.toLowerCase());
        const country = element?.country?.toLowerCase();
        const value1 = country.search(message.toLowerCase());
        if (value === -1 && value1 === -1)
            return 0;
        return 1;
    })
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }
    renderTableRows(filteredUser);
})

// const CountryPerson = (data) => {
//     const countrySet = new Set();
//     data?.forEach(element => countrySet.add(element.country));
//     countrySet?.forEach(countryName => {
//         let obj = { country: "", person: 0 };
//         let count = 0;;
//         data?.forEach(element => {
//             countryName === element.country ? count += 1 : "";
//         })
//         obj.country = countryName;
//         obj.person = count;
//         countryObj.push(obj);
//     })
//     console.log(countryObj);
// }

const highestScorePerson = (data) => {
    data?.forEach(element => {
        if (element.score > maxScore) {
            maxScore = element.score;
            highestMan = element;
        }
    });
    const img = document.createElement('img');
    img.src = highestMan.photo;
    img.classList.add('p-2', 'sizing');
    const div = document.createElement('div');
    div.classList.add('text-1xl', 'lg:text-2xl', 'text-orange-700');
    const p1 = document.createElement('h1');
    const p2 = document.createElement('h1');
    const p3 = document.createElement('h1');
    p1.textContent = 'Name    : ' + highestMan.name;
    p2.textContent = 'Country : ' + highestMan.country;
    p3.textContent = 'Score   : ' + highestMan.score;
    div.appendChild(p1);
    div.appendChild(p2);
    div.appendChild(p3);
    highestScore.appendChild(img);
    highestScore.appendChild(div);
}

const renderTableRows = (data) => {
    data?.forEach((user, i) => {
        const tRow = document.createElement('tr');
        const td1 = document.createElement('td');
        const td2 = document.createElement('td');
        const td3 = document.createElement('td');
        const td4 = document.createElement('td');
        const td5 = document.createElement("img");
        td1.textContent = i + 1;
        td1.classList.add('p-3', `${i % 2 === 0 ? 'bg-white' : 'bg-sky-50'}`)
        td5.src = user.photo;
        td5.classList.add('p-2', 'resize', `${i % 2 === 0 ? 'bg-white' : 'bg-sky-50'}`);
        td2.textContent = user.name;
        td2.classList.add('p-3', `${i % 2 === 0 ? 'bg-white' : 'bg-sky-50'}`);
        td3.textContent = user.country;
        td3.classList.add('p-3', `${i % 2 === 0 ? 'bg-white' : 'bg-sky-50'}`);
        td4.textContent = user.score;
        td4.classList.add('p-3', `${i % 2 === 0 ? 'bg-white' : 'bg-sky-50'}`);
        tRow.appendChild(td1);
        tRow.appendChild(td5);
        tRow.appendChild(td2);
        tRow.appendChild(td3);
        tRow.appendChild(td4);
        tableBody.appendChild(tRow);
    })
}

const main = async () => {
    const response = await fetch(
        'https://64743e827de100807b1a84ab.mockapi.io/api/v1/leaderboard/users'
    );
    userData = await response.json();
    renderTableRows(userData);
    highestScorePerson(userData);
    // CountryPerson(userData);
    return userData;
}

main();