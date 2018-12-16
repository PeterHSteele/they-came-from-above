const React=require('react');
const Konva=require('konva');
const {Rect}=require('react-konva');

class Legs extends React.Component {
	render(){
		return (
			<Group x={this.props.x}>
				{this.props.legs}
			</Group>
		)
	}
}

module.exports=Legs;