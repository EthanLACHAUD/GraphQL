var input = document.getElementById("input").value;
var querySomme = `
    query {
        sommeDeXPremierNombres(nombres: ${input})
    }
`;
var queryFact = `
    query {
        fact(n: ${input})
    }
`;
var queryFibo = `
    query {
        fibonacci(n: ${input})
    }
`;

function sumOfNumbers() {
    const input = document.getElementById("input").value;
    const querySomme = `
        query {
            sommeDeXPremierNombres(nombres: ${input})
        }
    `;
    fetch('http://localhost:8080/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: querySomme })
    })
    .then(response => response.json())
    .then(data => {
        if (data.errors) {
            console.error(data.errors);
            return;
        }
        const resultat = document.createElement("p");
        resultat.innerHTML = `La somme des ${input} premiers nombres est : ${data.data.sommeDeXPremierNombres}`;
        document.body.appendChild(resultat);
    })
    .catch(error => console.error('Erreur lors de la récupération des données:', error));
}

function factorial() {
    const input = document.getElementById("input").value;
    const queryFact = `
        query {
            fact(n: ${input})
        }
    `;
    fetch('http://localhost:8080/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queryFact })
    })
    .then(response => response.json())
    .then(data => {
        if (data.errors) {
            console.error(data.errors);
            return;
        }
        const resultat = document.createElement("p");
        resultat.innerHTML = `Le factoriel de ${input} est : ${data.data.fact}`;
        document.body.appendChild(resultat);
    })
    .catch(error => console.error('Erreur lors de la récupération des données:', error));
}

function fibonacci() {
    const input = document.getElementById("input").value;
    const queryFibo = `
        query {
            fibonacci(n: ${input})
        }
    `;
    fetch('http://localhost:8080/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queryFibo })
    })
    .then(response => response.json())
    .then(data => {
        if (data.errors) {
            console.error(data.errors);
            return;
        }
        const resultat = document.createElement("p");
        resultat.innerHTML = `Le ${input}-ème nombre de Fibonacci est : ${data.data.fibonacci}`;
        document.body.appendChild(resultat);
    })
    .catch(error => console.error('Erreur lors de la récupération des données:', error));
}
