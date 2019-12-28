import React from 'react'


const Header = (props) => {

    console.log("header props", props);

    return(

        <h2> {props.course.course.name} </h2>

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
  
  console.log("props Content:", props.course.course.parts);

   return(
        <div>
           {props.course.course.parts.map(part => <Part key={part.id} parts={part} />)}
        </div>
   )
    
}


const Total = (props) => {
    
    console.log('props Total', props.course);


    //stackoverflowsta oli apua tässä, meinasi tulla ongelmia kun kyseessä on objectarray
    //https://stackoverflow.com/questions/5732043/javascript-reduce-on-array-of-objects
    const total = props.course.course.parts.reduce((a, b) => {
      console.log('wut is going on', {summa: a.exercises + b.exercises});
      return {exercises: a.exercises + b.exercises};      

    });
    

    return(

        <p> <b> Number of exercises {total.exercises} </b></p>
    )
    

}


const Course = (props) => {

  console.log("course props:", props);

  return(

    <div>
      <Header course={props} />
      <Content course={props} />
      <Total course={props} />
    </div>
    
  )
   
}

//tällaista komponenttiä ei vissiin olisi tarvinnut tehdä, mutta onpahan nyt
const AllCourses = (props) => {

  console.log("all courses props:", props);

  return(
    <div>
       {props.course.map((part) => <Course key={part.courseID} course={part} />)}
    </div>
)

}


export default AllCourses