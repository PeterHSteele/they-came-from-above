const React=require('react')
const Konva=require('konva')
const {Rect,Circle,Line}=require('react-konva')
const Group=require('react-konva').Group
const Alien=require("./Alien.js")
const {Trail,Spring,animated}=require('react-spring/dist/konva')
const Antennae=require('./Antennae.js'),Torso=require('./Torso.js'),Legs=require('./Legs.js');

class Disintegration extends React.Component {
	render(){
		let legs=Array(4).fill(0).map((e,i)=>i)
		const rects=Array(10).fill(null).map(function(e,i){
		//return Math.floor(Math.random()*10)
		return i;
		console.log(Spring)
	})
		return(
			<Group x={this.props.x} y={this.props.y}>
				<Spring
				from={{y:0,opacity:10}}
				to={{y:-10,opacity:0}}>
					{props=>(<Group {...props}>
								<Circle x={3*this.props.scale} y={this.props.scale} radius={3} fill={this.props.fill}/>
								<Line y={this.props.scale} x={this.props.scale} points={[2*this.props.scale,4*this.props.scale,2*this.props.scale,0]} strokeWidth={3} stroke={this.props.fill}/>
								<Circle x={7*this.props.scale} y={this.props.scale} radius={3} fill={this.props.fill}/>
								<Line y={this.props.scale} x={this.props.scale} points={[6*this.props.scale,0,6*this.props.scale,4*this.props.scale]} strokeWidth={3} stroke={this.props.fill}/>
							</Group>)}
				</Spring>
				<Spring
				from={{opacity:1,fill:this.props.fill}}
				to={{opacity:0,fill:'red'}}>
				{props=>(
						<Shape 
						{...props}
						sceneFunc={(context,shape)=>{
						context.beginPath();
						context.moveTo(5,35)
						context.lineTo(45,35)
						context.arc(25,35,20,0,Math.PI,true)
						context.closePath();
						context.fillStrokeShape(shape)
						}}/>
					)}
				</Spring>
				<Trail
				items={legs} 
				key={legs=>leg}
				from={{x:0,opacity:1}}
				to={{x:-100,opacity:0}}
				>
					{
				(item,index)=>props=><animated.Rect {...props} style={props} width={5} x={5+(2*index*5)} y={35} height={10} fill={this.props.fill} />
					}
				</Trail>
			</Group>
		)
	}
}

module.exports=Disintegration