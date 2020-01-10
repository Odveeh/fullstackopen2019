
require('dotenv').config()


let PORT = process.env.PORT;
let passu = process.env.DBPASSWORD
let tietokanta = 'blogsDB';
let mongoURL =  `mongodb+srv://odveeh99:${passu}@cluster0-aqgau.mongodb.net/${tietokanta}?retryWrites=true&w=majority`;

console.log("process env node env: ", process.env.NODE_ENV)

if(process.env.NODE_ENV === 'test'){
    console.log("testitietokanta!");
    const testitietokanta = 'blogsDBtest';
    mongoURL =  `mongodb+srv://odveeh99:${passu}@cluster0-aqgau.mongodb.net/${testitietokanta}?retryWrites=true&w=majority`;
}

module.exports = {
    PORT,
    mongoURL,
    passu
}