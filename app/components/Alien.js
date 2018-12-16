const React = require('react')
const Konva = require("konva");
const {Spring,animated,Trail}=require('react-spring/dist/konva');
Group=require('react-konva').Group,
Rect=require('react-konva').Rect,
Line=require("react-konva").Line,
Circle=require("react-konva").Circle,
Text=require("react-konva").Text,
Shape=require("react-konva").Shape;
const {green,darkBlue}=require("../colors.js")
const Antennae=require('./Antennae.js'),Torso=require('./Torso.js'),Legs=require('./Legs.js');


class Alien extends React.Component{
	constructor(){
		super();
		this.state={
			reverse:false,
			reset:false
		}
		this.bouncer=React.createRef();
		this.bounceAntennae=this.bounceAntennae.bind(this)
		//this.stretch=this.stretch.bind(this)
	}

	/*stretch(){
		console.log(this.bouncer.current)
		this.bouncer.current.to({
			y:-5,
			duration:1
		})
	}

	componentDidMount(){
		this.stretch()
	}*/

	bounceAntennae(){
		this.setState({
			reverse:!this.state.reverse,
			reset:!this.state.reset
		})
	}

	render(){
		const s=5;
		let legs=Array(4).fill(0).map((e,i)=>(<Rect 
			key={i} 
			x={s+(2*i*s)} 
			y={7*s} 
			height={2*s} 
			width={s} 
			fill={green}/>
			))
		//let legs=Array(4).fill(0).map((e,i)=>i) 
		let antennaeY=this.props.animated?0:5;
		let legsX=this.props.animated?5:0
		
		//let legsStyle=this.props.disintegration?{y:70,opacity:0}:{y:35,opacity:1}
		
		return (
			<Group x={this.props.x} y={this.props.y}>
				<Antennae scale={s} y={antennaeY} fill={green}/>
				<Torso fill={green}/>
				<Legs x={legsX} legs={legs}/>
			</Group>	
		)/*:(
			<Group></Group>
		)*/
	}
}

module.exports=Alien