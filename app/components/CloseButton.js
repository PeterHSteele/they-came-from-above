const React=require('react')

class CloseButton extends React.Component {
	render(){
		return (
			<button className={'closeButton'} onClick={this.props.handleClick}>X</button>
		)
	}
}

module.exports=CloseButton;