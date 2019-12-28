import React from 'react';
import AllCourses from './AllCourses'



const App = () => {

    const course = [

        
       {
        courseID: 1,
        name: 'Half Stack application development',
        parts: [
          {
            id: 1,
            name: 'Fundamentals of React',
            exercises: 10
          },
          {
            id: 2,
            name: 'Using props to pass data',
            exercises: 7
          },
          {
            id: 3,
            name: 'State of a component',
            exercises: 14
          },
          {
            id: 4,
            name: 'Redux',
            exercises: 11
          }
          
        ]
      },

      
      {
        courseID: 2,
        name: 'Node.js',
        parts: [
          {
            name: 'Routing',
            exercises: 3,
            id: 1
          },
          {
            name: 'Middlewares',
            exercises: 7,
            id: 2
          }
        ]
      },

      
      {
        courseID: 3,
        name: 'Node.js',
        parts: [
          {
            name: 'Routing',
            exercises: 3,
            id: 1
          },
          {
            name: 'Middlewares',
            exercises: 7,
            id: 2
          }
        ]
      },
      
      {
        courseID: 4,
        name: 'Node.js',
        parts: [
          {
            name: 'Routing',
            exercises: 3,
            id: 1
          },
          {
            name: 'Middlewares',
            exercises: 7,
            id: 2
          }
        ]
      }
    ]



  
    return (
        <div>
          <h1> Web development curriculum </h1>

            <AllCourses course={course} />

        </div>
    )
  }


  export default App