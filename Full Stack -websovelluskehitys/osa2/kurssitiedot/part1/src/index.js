import React from 'react';
import ReactDOM from 'react-dom';



const Header = (props) => {

    return(

        <h1> {props.course.name} </h1>

    )

}

const Part = (props) => {

    return(
        <p>
            {props.parts.name} {props.parts.exercises}
        </p>      

    )

}


const Content = (props) => {
   
   return(
        <div>
            <Part parts={props.course.parts[0]} />
            <Part parts={props.course.parts[1]} />
            <Part parts={props.course.parts[2]} />
        </div>
   )
    
}


const Total = (props) => {
    
    let total = props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises
    
    return(

        <p>Number of exercises {total}</p>
    )
    

}


const Course = (props) => {

  return(

    <div>
      <Header course={props.course} />
      <Content course={props.course} />
    </div>
    
  )
   
}


const App = () => {

    const course = {
        name: 'Half Stack application development',
        parts: [
          {
            name: 'Fundamentals of React',
            exercises: 10
          },
          {
            name: 'Using props to pass data',
            exercises: 7
          },
          {
            name: 'State of a component',
            exercises: 14
          }
        ]
      }


  
    return (
        <div>
            <Course course={course} />
        </div>
    )
  }


ReactDOM.render(<App />, document.getElementById('root'));


