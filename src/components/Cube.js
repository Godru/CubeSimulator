import React, { Component } from 'react';
import '../main.css';
class Cube extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: undefined,
            rollInterval: {},
            rollIntervalTimer: 0,
            moveCube: false,
            topDifference: 0,
            top: 100,
            leftDifference: 0,
            left: 100,
            rollValue: 1,
            canRoll: true
        };
      //  this.moveCubeBeginTouch = this.moveCubeBeginTouch.bind(this);
        this.moveCubeBeginClick = this.moveCubeBeginClick.bind(this);
        this.getRandomInt = this.getRandomInt.bind(this);
        this.cubeRollBegin = this.cubeRollBegin.bind(this);
        this.cubeRollRolling = this.cubeRollRolling.bind(this);
    }
    componentWillMount(){
        this.setState({ left: this.props.left,
                        id: this.props.id
        });
    }
    componentWillReceiveProps(nextProps){
            this.setState({
                top: this.props.topMouse,
                left: this.props.leftMouse
            });
    }
    /* moveCubeBeginTouch(e){
         if(e.touches !== undefined) {
             this.setState({
                 moveCube: true,
                 topDifference: e.touches[0].clientY - this.state.top,
                 leftDifference: e.touches[0].clientX - this.state.left
             });
         }
         this.props.setMove(true);
     }
     moveCubeMovingTouch(e){
         this.setState({
             top: e.touches[0].clientY - this.state.topDifference,
             left: e.touches[0].clientX - this.state.leftDifference
         });
     }*/
    moveCubeBeginClick(e){
         this.setState({
            moveCube: true
       });
        this.props.setMove(this.state.id, e.clientY - this.state.top, e.clientX - this.state.left);

    }
    getRandomInt(min,max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    cubeRollRolling(){
        this.setState({ rollValue: this.getRandomInt(1,8),
                        rollIntervalTimer: this.state.rollIntervalTimer + 1});
        if(this.state.rollIntervalTimer === 10) {
            clearInterval(this.state.rollInterval);
            this.setState({ rollIntervalTimer: 0,
                            canRoll: true});
        }
    }
    cubeRollBegin(){
        if(this.state.canRoll) {
            this.setState({ rollInterval: setInterval(() => this.cubeRollRolling(), 100),
                            canRoll: false});
        }
    }

    render() {
      //  console.log(this.state.id);
        return (
            <div onDoubleClick={this.cubeRollBegin}
                 onMouseDown={this.moveCubeBeginClick}

                 style = {{top: this.state.top, left: this.state.left}}
                 className="cube__block">
                <div className="cube__main"/>
                <div className="cube__down"/>
                <div className="cube__up"/>
                <div className="cube__line_down-right"/>
                <div className="cube__line_down-left"/>
                <div className="cube__line_up"/>
                <div className="cube__number">{this.state.rollValue}</div>
            </div>
        );
    }
}
//  onTouchMove={this.moveCubeMovingTouch} onTouchStart={this.moveCubeBeginTouch}
export default Cube;