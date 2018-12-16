const React = require('react')
const StartButton =require('./StartButton')
const colors=require("../colors.js")

class Scoreboard extends React.Component {
render(){
		const styles={
		border:'1px solid '+colors.darkBlue,
		//boxShadow:"2px 2px 2px 1px #BBB",
		margin:"0 5%",
		background:"black",
		textAlign:"center"
	}
		return (
			<div id='scoreboard' style={styles}>
				<div>
					<span>{this.props.score}</span>
				</div>
				<h2>Score</h2>
				<StartButton text={this.props.buttonText} color={"white"} background={colors.darkBlue} border={colors.lavender} handleClick={this.props.handleClick} />
			</div>
		)
	}
}

module.exports=Scoreboard;