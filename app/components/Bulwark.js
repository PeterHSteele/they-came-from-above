const React = require('react')
const Konva = require('konva')
const {Shape,Line,Group} = require('react-konva')

class Bulwark extends React.Component {
	render(){
		return (
			<Group y={this.props.y} x={this.props.x}>
				<Shape
				fill={this.props.fill}
				stroke={this.props.stroke}
				strokeWidth={3}
				sceneFunc={(context,shape)=>{
					context.beginPath();
					context.moveTo(80,10)
					context.lineTo(25,10)
					context.arc(25,30,20,1.5*Math.PI,Math.PI,true)
					context.lineTo(5,60)
					context.arc(20,60,15,Math.PI,0,true)
					context.lineTo(35,50)
					//context.ellipse(50,50,10,15,Math.PI,Math.PI,0)
					context.lineTo(70,50)
					context.lineTo(70,60)
					context.arc(85,60,15,Math.PI,0,true)
					context.lineTo(100,30)
					context.arc(80,30,20,0,1.5*Math.PI,true)
					context.closePath()
					context.fillStrokeShape(shape);
				}}/>
				<Line points={[6,55,25,45,21,36,38,28,33,22,55,18]} stroke={this.props.health>8?this.props.fill:"white"} lineCap={'square'} strokeWidth={2}/>
				<Line points={[82,73.5,77,62,79,50,58,38,68,35]} stroke={this.props.health>4?this.props.fill:"white"} lineCap={'square'} strokeWidth={2}/>
			</Group>
		)
	}
}

module.exports=Bulwark