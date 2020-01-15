import React, { Component } from 'react';
import '../main.css';



class Menu extends Component {
    constructor(props){
        super(props);
        this.state = {
            menuMargin: -10,
            buttonMargin: 0,
            buttonText: String.fromCharCode(8657) + String.fromCharCode(8657),
            cubeCount: 0,
        };
        this.openCloseMenu = this.openCloseMenu.bind(this);
        this.addCube = this.addCube.bind(this);
    }
    openCloseMenu(){
        if(this.state.buttonMargin ===0) {
            this.setState({
                menuMargin: -40,
                buttonMargin: 300,
                buttonText: String.fromCharCode(8659) + String.fromCharCode(8659)
            });
        }else{
            this.setState({
                menuMargin: -10,
                buttonMargin: 0,
                buttonText: String.fromCharCode(8657) + String.fromCharCode(8657)
            });
        }
    }
    componentWillReceiveProps(){
        this.setState({cubeCount: this.props.cubeCount});
    }
    addCube(){
        this.props.addCube(this.props.cubeCount+1)
    }
    render() {
        return(
            <div style = {{top: this.state.menuMargin}} className="menu__block">
                <button onClick={this.addCube} className="menu__button">Add Cube</button>
                <button onClick ={this.openCloseMenu}
                        className="menu__button">{this.state.buttonText}</button>
            </div>
        )
    }
}

export default Menu;

