import axios from 'axios'
const urli = 'http://localhost:3001/persons'

const addPerson = newPerson => {
    console.log("axios post urli: ", urli);
    return axios.post(urli, newPerson);
}

const deletePerson = id => {
    const deleteURL = urli + `/${id}`;
    console.log("axios delete urli:", urli + `/${id}`);
    return axios.delete(deleteURL);
}

const returnAll = () => {
    console.log("axios get")
    return axios.get(urli);
}

const replacePerson = (id, changedData) => {
    const replaceURL = urli + `/${id}`;
    console.log("axios replace")
    return axios.put(replaceURL, changedData);

}

export default {
    addPerson,
    deletePerson,
    returnAll,
    replacePerson
};