const React =require('react')
const Konva = require('konva')
const Shape = require('react-konva').Shape
const Rect = require('react-konva').Rect
const Group = require('react-konva').Group;
const green = require('../colors.js').green
const Spring = require('react-spring').Spring

class MissileLauncher extends React.Component {
	constructor(props){
		super(props)
		this.state={
			reverse:false,
			reset:false,
			count:0
		}
	}
	update(){
			this.setState({
				reset:!this.state.reset,
				reverse:!this.state.reverse,
				count:this.state.count+1
			})
	}
	render(){
		return (	
				<Group y={this.props.y} x={this.props.x} fill={this.props.fill} stroke={this.props.stroke} strokeWidth={2}>
					<Spring
					reset
					reverse
					onRest={()=>this.update()}
					from={{fill:this.props.fill}}
					to={{fill:this.props.gameOver?'red':this.props.fill}}
					>{props=>(
						<Rect {...props} reset reverse y={50} x={23} height={8} width={3}>
						</Rect>
					)}
					</Spring>
					<Spring
					reset={this.state.reset}
					reverse={this.state.reverse}
					onRest={()=>this.update()}
					from={{fill:this.props.fill}}
					to={{fill:this.props.gameOver?'red':this.props.fill}}
					>{props=>(
						<Rect {...props} y={58} x={3} height={6} width={45}>
						</Rect>
					)}
					</Spring>
					<Spring
					reset={this.state.reset}
					reverse={this.state.reverse}
					onRest={()=>this.update()}
					from={{fill:this.props.fill}}
					to={{fill:this.props.gameOver?'red':this.props.fill}}
					>{props=>(
						<Rect {...props} y={64} height={14} width={50}>
						</Rect>
					)}
					</Spring>
				</Group>
			
			)
	}
}

module.exports=MissileLauncher