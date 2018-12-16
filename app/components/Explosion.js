const React=require('react')
const Konva=require('konva')
const Star = require('react-konva').Star


class Explosion extends React.Component {
	constructor(props){
		super(props)
	}

	componentDidMount(){
		this.changeSize()
	}

	changeSize () {
		let timeout;
		let that=this
		this.star.to({
			scaleX:2,
			scaleY:2,
			duration:.3
		})
		this.smallStar.to({
			innerRadius:2,
			outerRadius:4,
			duration:.3
		})
		timeout=setTimeout(function(){
			that.star.to({
				scaleX:0,
				scaleY:0,
				duration:.3
			})
		},300,that)
	}
	render(){
		return (
			<Group x={this.props.x+20} y={this.props.y+20} ref={node=>{
					this.star=node;
				}}>
				<Star 
				fill={'red'} 
				numPoints={this.props.geometry.numPoints} 
				innerRadius={6} 
				outerRadius={15} 
				rotation={this.props.geometry.rotation}>
				</Star>
				<Star fill={"yellow"}
					innerRadius={3}
					outerRadius={8} 
					numPoints={this.props.geometry.numPoints}
					rotation={this.props.geometry.rotation} />
				<Star fill={"orange"}
					ref={node=>{
						this.smallStar=node;
					}}
					innerRadius={0}
					outerRadius={0} 
					numPoints={this.props.geometry.numPoints}
					rotation={this.props.geometry.rotation} />
			</Group>
		)
	}
}

module.exports=Explosion