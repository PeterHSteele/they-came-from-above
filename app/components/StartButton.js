const React=require('react');
let yes="yes"

class StartButton extends React.Component {
	
	render(){
		const styles={
		border:"3px solid "+this.props.border,
		color:this.props.color,
		margin:"5%",
		padding:"10%",
		borderRadius:"50%",
		fontSize:"1.5em",
		color:"black",
		fontFamily:"'Dancing Script',cursive"
	}
		return(
			<button type="button" name={this.props.name} style={styles} onClick={this.props.handleClick}>{this.props.text}</button>
		)
	}
}

module.exports=StartButton