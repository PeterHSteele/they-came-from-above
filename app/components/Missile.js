const React =require('react')
const Konva = require('konva')
const Shape = require('react-konva').Shape
const Rect  = require('react-konva').Rect
const green = require('../colors.js').green;

class Missile extends React.Component {
	render(){
		return(
			<Rect x={this.props.x} y={this.props.y} fill={this.props.fill} width={4} height={8}/>
 		)
	}
}

module.exports=Missile