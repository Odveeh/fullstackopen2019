import React, { useState } from 'react'
import ReactDOM from 'react-dom';



const Button = (props) => {

  console.log(props);
  const {clickHandler, teksti} = props;

  return(

    <button onClick={clickHandler}> {teksti} </button>
  )

}

const Statistics = (props) => {

  console.log(props);
  const value = props.value;
  const text = props.text;

  return(
      <tr>
          <td> {text} </td>
          <td> {value}</td>
      </tr>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


const updateAnecdote = () => {

 
  let index = Math.floor(Math.random() * anecdotes.length);
  console.log("anecdote:", anecdotes[index]);


  return index;

}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const [anecdoteIndex, setAnecdoteIndex] = useState(0);
  

  //fixattava vielä
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0]);
  const copy = [...votes];
  
  const updateVotes = () => {
    
    copy[anecdoteIndex] += 1;
    console.log("votet", copy);
    setVotes(copy);

  }

  const indexWithMostVotes = () => {
      console.log("array:", votes);
     
      const indexOfMax = votes.indexOf(Math.max(...votes));
      console.log("index with most votes:", indexOfMax);

      return indexOfMax;

  }


  if((good + neutral + bad) > 0){
    return (
        <div>
          
          <h3> Anecdote of the day </h3>
    <p> {anecdotes[anecdoteIndex]} </p>
    <p> has {votes[anecdoteIndex]} votes </p>
    <Button teksti="vote" clickHandler={() => updateVotes()} />
    <Button teksti="next anecdote" clickHandler={() => setAnecdoteIndex(updateAnecdote())} />
  

    <h3> Anecdote with the most votes </h3>
    <p>  {anecdotes[indexWithMostVotes()]} </p>
    <p> has {votes[indexWithMostVotes()]} votes</p>
          <h3> give feedback </h3>
          <Button clickHandler={() => setGood(good + 1)} teksti="good"/>
          <Button clickHandler={() => setNeutral(neutral + 1)} teksti="neutral"/>
          <Button clickHandler={() => setBad(bad + 1)} teksti="bad"/>

        <h3> statistics </h3>
        <table>
          <tbody>
            <Statistics text={"good"} value={good} />
            <Statistics text={"neutral"} value={neutral} />
            <Statistics text={"bad"} value={bad} />
            <Statistics text={"all"} value={good + neutral + bad} />
            <Statistics text={"average"} value={(good + bad * -1) / (good + neutral + bad)} />
            <Statistics text={"positive"} value={good / (good + neutral + bad) * 100} />
          </tbody>
        </table>
       
    
        </div>


    )
   
  } return(
    <div>

    <h3> Anecdote of the day </h3>
    <p> {anecdotes[anecdoteIndex]} </p>
    <p> has {votes[anecdoteIndex]} votes </p>
    <Button teksti="vote" clickHandler={() => updateVotes()} />
    <Button teksti="next anecdote" clickHandler={() => setAnecdoteIndex(updateAnecdote())} />
   

    <h3> Anecdote with the most votes </h3>
    <p>  {anecdotes[indexWithMostVotes()]} </p>
    <p> has {votes[indexWithMostVotes()]} votes</p>



    <h3> give feedback </h3>
    <Button clickHandler={() => setGood(good + 1)} teksti="good"/>
    <Button clickHandler={() => setNeutral(neutral + 1)} teksti="neutral"/>
    <Button clickHandler={() => setBad(bad + 1)} teksti="bad"/>

  <h3> statistics </h3>
    No feedback given.

  </div>
  )
  
}

ReactDOM.render(<App />, document.getElementById('root'));