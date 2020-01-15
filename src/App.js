import React, { Component } from 'react';
import './App.css';
import Cube from './components/Cube.js';
import Menu from './components/Menu.js';


class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            cubeCount: 1,
            topMouse: 0,
            leftMouse: 0,
            moveCube: false,
            moveCubeNumber: -1,
            cubePositionX: [],
            cubePositionY: [],
            topDifference: 0,
            leftDifference: 0
        };
        this.moveCubeMovingClick = this.moveCubeMovingClick.bind(this);
     //   this.moveCubeMovingTouch = this.moveCubeMovingTouch.bind(this);
        this.moveCubeEndClick = this.moveCubeEndClick.bind(this);
        this.setMove = this.setMove.bind(this);
        this.fillCubes = this.fillCubes.bind(this);
        this.addCube = this.addCube.bind(this);
    }

   /* moveCubeMovingClick(e){
        this.setState({
            topMouse: e.clientY,
            leftMouse: e.clientX
        });
    }
    moveCubeMovingTouch(e){
        if(e.touches !== undefined && this.state.moveCube) {
            this.setState({
                topMouse: e.touches[0].clientY,
                leftMouse: e.touches[0].clientX
            });
        }
    }

    moveCubeEndClick(){
        this.setState({moveCube: false});
    }*/
    moveCubeMovingClick(e){
        if(this.state.moveCubeNumber !== -1) {
            let cubePositionY = this.state.cubePositionY;
            let cubePositionX = this.state.cubePositionX;
            cubePositionY[this.state.moveCubeNumber] = e.clientY - this.state.topDifference;
            cubePositionX[this.state.moveCubeNumber] = e.clientX - this.state.leftDifference;
            this.setState({
                cubePositionX: cubePositionX,
                cubePositionY: cubePositionY
            });
        }
    }
    moveCubeEndClick(){
        this.setState({ moveCubeNumber: -1});
    }
    setMove(id,topDifference,leftDifference){
        this.setState({ moveCubeNumber: id,
                        topDifference: topDifference,
                        leftDifference: leftDifference
        });
    }
    addCube(cubeCount){
        this.setState({cubeCount: cubeCount});
    }
    fillCubes(){
        let cube =[];
        let cubePositionX = [];
        let cubePositionY = [];
        for(let i=0;i<this.state.cubeCount;i++){
            cubePositionX[i] = i * 50;
            cubePositionY[i] = 100;
            cube.push(<Cube left = {i*50} key ={i} id ={i}
                            setMove = {this.setMove} moveCube = {this.state.moveCube}
                            topMouse = {this.state.cubePositionY[i]}
                            leftMouse = {this.state.cubePositionX[i]}/>);
        }

        return cube;
    }

    render() {
      //  console.log(this.state.topMouse);
    return (
        <div onMouseMove={this.moveCubeMovingClick} onMouseUp={this.moveCubeEndClick} className="App">
            <header className="App-header">
                {this.fillCubes()}
                <Menu cubeCount = {this.state.cubeCount} addCube = {this.addCube}/>
            </header>
        </div>
    );
  }
}
//onTouchMove={this.moveCubeMovingTouch} onTouchEnd={this.moveCubeEndClick}
export default App;
