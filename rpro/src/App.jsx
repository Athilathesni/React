// import React from "react";

// class App extends React.Component{
//   list=["one","two","three","four","five"]
//   render(){
//     return(
//       <>
//   {
//     this.list.map((item,index)=>{
//       return <h3 key={index}>{item}</h3>
//     })
//   }
//       </>
//     )
//   }
// }
// export default App

// 2.CLASS
// import React from "react";
// import ListComp from "./componets/ListComp";
// class App extends React.Component{
 
//   render(){
//     return(
//       <>
//  <h2>hello</h2>
//  <ListComp data={"i am team lead"}/>
//       </>
//     )
//   }
// }
// export default App


// 3.STATE

// import React from "react";
// import ListComp from "./componets/ListComp";
// class App extends React.Component{
//   state={
//     count:0
//   }
//   increment=()=>{
//     this.setState({count:this.state.count+=1})
//   }
//  decrement=()=>{
//   this.setState({count:this.state.count-=1})
//  }
//   render(){
//     return(
//       <>
//       <button onClick={this.increment}>click me</button>
//       <button onClick={this.decrement}>click me</button>
//   <ListComp count={this.state.count}/>
//       </>
//     )
//   }
// }
// export default App

// 4.TODOS

// import React from "react";
// class App extends React.Component{
//   state={
//     task:"",
//     todo:[]
//   }
//   changeData=(e)=>{
//     this.setState
//     ({task:e.target.value})
//   }
//   addTask=()=>{
//     this.setState({todo:[...this.state.todo,this.state.task]})
//   }
//   delTask=(index)=>{
//     this.setState({todo:this.state.todo.filter((_,ind)=>ind !==index),
//     })
//   }
//   render(){
//     console.log(this.state);
//     return(
//       <>
//       <input type="text" onChange={this.changeData} />
//       <button onClick={this.addTask}>Add</button>
     
//       <ul>
//         {
//           this.state.todo.map((td,ind)=>(<li key={ind}>{td}
//           <button onClick={()=>this.delTask(ind)}>Delete</button>
//           </li>
//           ))}
//       </ul>
      
      
//       </>

//     )
//   }
// }
// export default App



// 5.LIFE CYCLE METHOD

// import React from "react";
// class App extends React.PureComponent{
//   state={
//     count:5,
//     task:"",
//   }
//   addTask=()=>{
//    this.setState({count:10}) 
//   }

  // componentDidMount(){
  //   alert("hii")
  // }
  // componentWillUnmount(){
  //   alert("hello")
  // }
//   render(){
//     console.log(this.state);
//     return(
//       <>
//       <button onClick={this.addTask}>Add</button>
//       </>

//     )
//   }
// }
// export default App

// 6.UNCONTROLED COMMPONENT

// import React from "react";
// class App extends React.PureComponent{
//   name=React.createRef()
//   age=React.createRef()


// handlesubmit=(e)=>{
//   e.preventDefault()
// console.log(this.name.value);
// console.log(this.age.value);

// }

//   render(){
//     console.log(this.state);
//     return(
//       <>
//      <form action="">
//       <input type="text" placeholder="name" ref={input=>this.name=input} />
//       <input type="text" placeholder="age" ref={input=>this.age=input} />
//       <button onClick={this.handlesubmit}>click</button>
//      </form>
//       </>
//     )
//   }
// }
// export default App


// 7.Routing


import React from "react";
import child1 from "./component/child1"
import child2 from "./component/child2"
import child3 from "./component/child3"
import child4 from "./component/child4"
import { BrowserRouter,Routes,Route } from "react-router-dom";
class App extends React.PureComponent{
  

  render(){
    console.log(this.state);
    return(
      <>
     <BrowserRouter>
     <Routes>
      <Route path="/" Component={child1}/>
      <Route path="/child2" Component={child2}/>
      <Route path="/child3" Component={child3}/>
      <Route path="/child4" Component={child4}/>
     </Routes>
     </BrowserRouter>
      </>
    )
  }
}
export default App
