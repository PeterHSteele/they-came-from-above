const React=require('react');
const Konva=require('konva');
const {Shape}=require('react-konva')

class Torso extends React.Component {
	render(){
		return(
			<Shape 
				sceneFunc={(context,shape)=>{
					context.beginPath();
					context.moveTo(5,35)
					context.lineTo(45,35)
					context.arc(25,35,20,0,Math.PI,true)
					context.closePath();
					context.fillStrokeShape(shape)
				}}
			fill={this.props.fill}/>
		)
	}
}

module.exports=Torso;