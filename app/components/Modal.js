const React = require('react')
const Spring = require('react-spring').Spring;
const StartButton=require("./StartButton.js")
const {lavender,darkBlue}=require("../colors.js"),CloseButton=require("./CloseButton.js")

class Modal extends React.Component {
	render(){
		
		return (
				<Spring
				from={{opacity:0}}
				to={{opacity:1}}
				>
				{props=>(
					<div id="modal" style={props}>
						<Spring
						from={{top:"0%",transform:"translate(-50%,-50%) scale(1)"}}
						to={{top:"50%",transform:"translate(-50%,-50%) scale(1.1)"}}
						>
						{props1 => (
							<div id="modalContent" style={props1}>
								<CloseButton handleClick={this.props.closeModal}/>
								<h2>Game Over</h2>
									<div>
										<span>{"Score: "+this.props.score}</span>
									</div>
								<StartButton handleClick={this.props.playAgainButton} text={"Play Again"} name={"gameOverButton"} border={lavender} background={darkBlue}/>
							</div>
						)}
						</Spring>
					</div>
				)}
				</Spring>
		)
	}
}

module.exports=Modal