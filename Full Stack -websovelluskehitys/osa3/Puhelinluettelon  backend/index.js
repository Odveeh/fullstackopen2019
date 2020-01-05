
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

//console.log("hello wadsadsads");


const app = express();

morgan.token('type', function (req, res) { return req.headers['content-type'] })
morgan.token('uusi', function (req, res) { return "adsadsads" })
morgan.token('contentt', function (req, res) { return JSON.stringify(req.body)})


morgan(function something(tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      token.req(req, res, 'body'),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms'
    ].join(' ')
  })

app.use(bodyParser.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :contentt'));

let persons = [  
    {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
    },
    {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
    },
    {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
    },

    {
    "name": "Daniel Abramov",
    "number": "123-43-234345",
    "id": 4
    }
    
]


app.get('/', (req, res) => {

    res.send('<h1> Hello adsads!! </h1>')

})

app.get('/info', (req, res) => {

    let date = new Date();
    res.send(`<div> Phonebook has info for ${persons.length} people  </div> <div> ${date} </div>`)

})

app.get('/api/persons', (req, res) => {
    res.json(persons)

})

app.post('/api/persons', (req, res) => {
    
    const person = req.body;
    //console.log("person: ", req.body);

    const randN = Math.floor(Math.random() * (1000 - 1) + 1);
    //console.log("id random: ", randN);
   
    person.id = randN;

    const nameList = persons.map(person => person.name);
    const includes = nameList.includes(person.name);

    //console.log("namelist: ", nameList);
    //console.log("includes: ", includes);

    if(person.name === ''){
        console.log("name missing");
        res.status(400).send({ error: 'name is missing from req content!' });
    } else if (person.number === ''){
        console.log("number is missing");
        res.status(400).send({ error: 'number is missing from req content!' });
    } else if (includes){
        console.log("nimi on jo listoilla!");
        res.status(400).send({ error: 'name is alreayd in the phonebook' });
    } else {
        console.log("adding a person...");
        persons = persons.concat(person);
        res.status(200)
        res.json(person)
    }
    
    //console.log("persons: ", persons)

    

})

app.get('/api/persons/:id', (req, res) => {
    console.log("id: ", req.params.id);
    requestedPerson = persons.filter(person => person.id == req.params.id);
    console.log("requested person: ", requestedPerson)

    if(requestedPerson.length != 0){
        res.json(requestedPerson);
    } else {
        res.status(404).send({ error: 'unknown endpoint' });
        
    }
    
})

app.delete('/api/persons/:id', (req, res) => {
     console.log("deleting id: ", req.params.id)
     persons = persons.filter(person => person.id !== req.params.id)

     res.status(204).end()

})

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})