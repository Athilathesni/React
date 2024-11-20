import React, { Component } from "react";
import { Link } from "react-router-dom";
export class child1 extends Component{

   
    render(){
        return(
            <div>
                CHILD1
                <Link to={'child2'}><span>child2</span></Link>
                <Link to={'child3'}><span>child3</span></Link>
                <Link to={'child4'}><span>child4</span></Link>
            </div>
        )
    }
}



export default child1