const React=require('react');
const Konva=require('konva');
const {Circle,Line}=require('react-konva')

class Antennae extends React.Component {
	render(){
		return(
			<Group y={this.props.y}>
				<Circle x={3*this.props.scale} y={this.props.scale} radius={3} fill={this.props.fill}/>
				<Line y={this.props.scale} x={this.props.scale} points={[2*this.props.scale,4*this.props.scale,2*this.props.scale,0]} strokeWidth={3} stroke={this.props.fill}/>
				<Circle x={7*this.props.scale} y={this.props.scale} radius={3} fill={this.props.fill}/>
				<Line y={this.props.scale} x={this.props.scale} points={[6*this.props.scale,0,6*this.props.scale,4*this.props.scale]} strokeWidth={3} stroke={this.props.fill}/>
			</Group>
		)
	}
}

module.exports=Antennae