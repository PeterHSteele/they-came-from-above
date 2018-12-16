const React = require('react')
const Konva = require('konva')
const Rect = require('react-konva').Rect
const Spring = require('react-spring/dist/konva').Spring,animated=require('react-spring/dist/konva').animated

class ColoredRect extends React.Component {
  constructor(props){
  	super(props)
  	this.state={
  		flag:false
  	}
  	this.handleClick=this.handleClick.bind(this)
  }
  handleClick () { this.setState({ flag: !this.state.flag })};
  render() {
    const { flag } = this.state;
    return (
      <Spring
        native
        from={{ x: 0, shadowBlur: 0, fill: 'rgb(10,50,19)' }}
        to={{
          x: flag ? 150 : 50,
          shadowBlur: flag ? 25 : 5,
          fill: flag ? 'seagreen' : 'hotpink',
          width: flag ? 300 : 50,
          height: flag ? 300 : 50
        }}
      >
        {props => (
          <animated.Rect {...props} y={50} onClick={this.handleClick} />
        )}
      </Spring>
    );
  }
}

module.exports=ColoredRect