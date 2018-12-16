//background
//keep score
//dissapation konva shape
//when do aliens win (if they get below bunker)
//fix if you hit start button for a second time
//audio
//handle game over
//levels?
//refactor mapping functions in game loop
var x='x'
var React=require('react')
var Konva= require('konva');
var Stage=require('react-konva').Stage,
Layer=require('react-konva').Layer,
Rect=require("react-konva").Rect,
Text=require("react-konva").Text;
Group=require("react-konva").Group
const Alien = require('./alien.js')
const ColoredRect = require('./ColoredRect.js')
const MissileLauncher=require('./MissileLauncher.js')
const Bulwark=require('./Bulwark.js')
const StartButton=require('./StartButton.js')
const Missile=require("./Missile.js")
const {green,darkBlue,lavender}=require("../colors.js")
const Explosion=require('./Explosion.js'),Disintegration=require("./Disintegration.js"),Scoreboard=require('./Scoreboard.js'),Modal=require('./Modal.js')
require('../index.css')
const explosionProps = {
	rotation:25,
	numPoints:5
}
//import { Stage, Layer, Rect, Text } from 'react-konva';
/*
class ColoredRect extends React.Component{
	render(){
		return(
			<Rect 
			x={10} 
			y={10} 
			width={50}
			height={50}
			fill={'green'}/>
		);
	}
}
*/
let interval=-1;
let count=0;
const width=800,height=600;
let cooldown;
const gameOverHeight=400


class Game extends React.Component {
	constructor(){
		super();
		this.state={
			launcher:[{x:100,y:500}],
			//aliens:Array(20).fill(true),
			aliens:[],
			bulwarks:Array(4).fill(10),
			level:1,
			alienOffsetX:0,
			alienOffsetY:0,
			animated:false,
			missiles:[],
			alienMissiles:[],
			game:false,
			explosions:[],
			gameOver:false,
			score:0,
			level:0,
			modal:false,
			gameIsReadyToPlay:true
		}

		this.handleKeyDown=this.handleKeyDown.bind(this);
		this.startGame=this.startGame.bind(this);
		this.findIntersection=this.findIntersection.bind(this);
		this.onPlayerHit=this.onPlayerHit.bind(this)
		this.onAlienHit=this.onAlienHit.bind(this)
		this.handleGameOver=this.handleGameOver.bind(this);
		this.setUpGame=this.setUpGame.bind(this);
		this.playAgain=this.playAgain.bind(this)
		this.closeModal=this.closeModal.bind(this);
	}

	handleKeyDown(e){
		e.preventDefault();
		if (this.state.gameOver){
			return;
		}
		//console.log(`the pressed key was ${e.key}`)
		let launcher=this.state.launcher,game=this.state.game;
		const that=this
		if (e.key=="ArrowLeft"&&game||e.key=="ArrowRight"&&game){
			let timeout=-1
			function move(){
				if (e.key=="ArrowLeft"&&launcher[0].x>=7||launcher[0].x<width-57&&e.key=="ArrowRight"){
					e.key=="ArrowLeft"?launcher[0].x-=6:launcher[0].x+=6
					that.setState({
						launcher:launcher
					})
			}
			}
			function loop(){
				move()
				timeout=setTimeout(loop,10)
			}
			function startMoving(){
				if (timeout==-1){
					loop();
				}
			}
			function stopMoving(){
				clearTimeout(timeout)
			}
			startMoving()
			document.addEventListener('keyup',stopMoving)
		}
		if (e.key==" "){
			//console.log('cooldown '+cooldown)
			if (!cooldown&&this.state.game){
				let missiles=this.state.missiles;
				let launcher=this.state.launcher
				var missile={
					x:launcher[0].x+23,
					y:launcher[0].y
				}
				missiles.push(missile);
				this.setState({
					missiles:missiles
				})
				cooldown=true
				let timeoutId=setTimeout(function(){
					cooldown=false
				},1800)
			}
		}
	}

	alienFiresMissile(atPlayer){
		function areClose(x1,x2){
			return (Math.abs(x1-x2)<width/20||Math.abs(x1-x2)<50)
		}
		//console.log('alien fires missile')
		let aliens=this.state.aliens,alienFiringMissile,alienMissiles=this.state.alienMissiles;
		const player=this.state.launcher;
		//let fireMissile=Math.random()>.5?true:false;
		aliens=aliens.reverse()
		if (atPlayer){
			alienFiringMissile=aliens.find(e=>areClose(e.x,player[0].x));
		}else{
			alienFiringMissile=aliens[Math.floor(Math.random()*10)]
		}
		//console.log(alienFiringMissile)
		if(alienFiringMissile){
			let missile={x:alienFiringMissile.x+25,y:alienFiringMissile.y+50}
			alienMissiles.push(missile);
			this.setState({alienMissiles:alienMissiles})
		}
	}

	setUpAliensAndMissiles(){
		let aliens = Array((this.state.level+1)*10).fill(null);
		aliens=aliens.map(function(e,i){
			let x;
			if (i%10<3){
				x=50*(i%10)
			}else if(i%10>=3&&i%10<7){
				x=50*(i%10)+20
			}else{
				x=50*(i%10)+40
			}
			return {
				x:x,
				y:Math.floor(i/10)*50,
				alive:true
			}
		});
		return aliens
	}

	setUpBulwarks(){
		let bulwarks = Array(4).fill(null);
		bulwarks=bulwarks.map(function(e,i){
			return {
				health:10,
				x:50+180*i,
				y:450
			}
		})
		return bulwarks
	}

	setUpGame(){
		let bulwarks=this.state.bulwarks,level=this.state.level,score=this.state.score
		let aliens=this.setUpAliensAndMissiles();
		if (level===0){
			bulwarks=this.setUpBulwarks();
			score=0
		}
		this.setState({
			aliens:aliens,
			bulwarks:bulwarks,
			missiles:[],
			alienMissiles:[],
			score:score,
			gameIsReadyToPlay:true
		})
	}

	componentDidMount(){
		window.addEventListener('keydown',this.handleKeyDown)
		this.setUpGame()
	}

	componentWillUnmount(){
		window.removeEventListener('keydown',this.handleKeyDown)
	}

	findIntersection(missileArray,obsArray,onHitFunction,hitBoxWidthx,explosionArray){
		for (let i=0;i<obsArray.length;i++){
			for (let j=0;j<missileArray.length;j++){
				//console.log(aliens[i].x+' '+missiles[j].x)//&&aliens[i].y+45>missiles[j].y&&aliens[i].y<missiles[j].y)
				if (obsArray[i].x+hitBoxWidthx>missileArray[j].x&&obsArray[i].x<missileArray[j].x&&obsArray[i].y+45>missileArray[j].y&&obsArray[i].y<missileArray[j].y){
					let that=this;
					explosionArray=onHitFunction(obsArray,i,explosionArray);
					//console.log(obsArray)
					missileArray.splice(j,1)
					//console.log(missiles)
				}
			}
		}
		if (explosionArray&&explosionArray.length){
			console.log(explosionArray)
			//console.log([missileArray])
			this.setState({
				explosions:explosionArray,
				[obsArray]:obsArray,
				[missileArray]:missileArray
			})
			
		}else{
			this.setState({
				[obsArray]:obsArray,
				[missileArray]:missileArray
			})
		}
	}

	onAlienHit(arr,index,explosions){
		let score=this.state.score,level=this.state.level
		let explosion=arr.splice(index,1)
		delete explosion[0].alive;
		//console.log(explosion[0])
		explosion[0].disint=Math.random()>.5?true:false
		this.setState({
			score:score+(10+5*level)
		})
		return explosions.concat(explosion)

	}

	onBulwarkHit(arr,index){
		//console.log(arr[index].health)
		arr[index].health>1?arr[index].health--:arr.splice(index,1);
	}

	onPlayerHit(){
		this.handleGameOver()
		/*clearInterval(interval)
		this.setState({
			gameOver:true,
			game:false
		})*/
	}

	playAgain(){
		this.setState({
			game:false,
			gameOver:false,
			score:0,
			modal:false
		})
		this.setUpGame()
	}

	handleGameOver(){
		count=0
		clearInterval(interval)
		this.setState({
			level:0,
			gameOver:true,
			game:false,
			modal:true,
		})
	}

	closeModal(){
		this.setState({
			modal:false,
			game:true
		})
	}

	handleLevelUp(){
		clearInterval(interval)
		count=0
		this.setState({
			level:this.state.level+1,
			game:false
		})
		this.setUpGame();
		let timeoutId=setTimeout(this.startGame,1500)
	}


	startGame(){
		let level=this.state.level;
		const that=this;
		if (!this.state.game){
			this.setState({
				game:true,
				gameOver:false,
				gameIsReadyToPlay:false
			})
			interval=setInterval(function(){
				//console.log(that.state)
				//console.log('count '+count)
				let missiles=that.state.missiles;
				let bulwarks=that.state.bulwarks;
				let aliens=that.state.aliens;
				let alienMissiles=that.state.alienMissiles
				let player=that.state.launcher;
				//console.log(that.state.explosions)
				let explosions=that.state.explosions;
				if (aliens.length==0){
					that.handleLevelUp();
					return;
				}
				

				if (missiles.length){
					that.findIntersection(missiles,bulwarks,that.onBulwarkHit,100,[])
					that.findIntersection(missiles,aliens,that.onAlienHit,45,explosions)
					missiles=missiles.filter((e,i)=>e.y>0)
					missiles=missiles.map(function(e,i){
						return {
							x:e.x,
							y:e.y-20
						}
					})
				}
				if (alienMissiles.length){
					that.findIntersection(alienMissiles,bulwarks,that.onBulwarkHit,100,[])
					that.findIntersection(alienMissiles,player,that.onPlayerHit,50,[])
					alienMissiles=alienMissiles.filter((e,i)=>e.y<height)
					alienMissiles=alienMissiles.map(function(e,i){
						//console.log("mapping")
						return {
							x:e.x,
							y:e.y+20
						}
					})
				}
				if (count%10==0){
					if (Math.random()>=.6){
						that.alienFiresMissile(true);
					}
					if (Math.random()>=.8){
						that.alienFiresMissile(false);
					}
				}
				if (count%100||count==0){
					let inc;
					(Math.floor(count/100))%2?inc=-2:inc=2
					aliens=aliens.map(function(e,i){
						return {
							x:e.x+inc,
							y:e.y,
							alive:e.alive
						}
					})
					explosions=explosions.map(function(e){
						return {
							x:e.x+inc,
							y:e.y,
						}
					})
					that.setState({
						//explosions:explosions,
						aliens:aliens,
						animated:!that.state.animated,
						missiles:missiles,
						alienMissiles:alienMissiles
					})
				}else{
					let x, newAlienY=aliens.find(function(e,i){
						return (e.y>400&&e.alive);
					})
					if (newAlienY){
						that.handleGameOver();
						/*clearInterval(interval)
						this.setState({
							gameOver:true
						})*/
					}
					(count%200)==0?x=0:x=200
					aliens=aliens.map(function(e,i){
						return {
							x:e.x,
							y:e.y+60,
							alive:e.alive
						}
					})
					explosions=explosions.map(function(e){
						return {
							x:e.x,
							y:e.y+60,
						}
					})
					
					that.setState({
						//explosions:explosions,
						aliens:aliens,
						animated:!that.state.animated,
						missiles:missiles,
						alienMissiles:alienMissiles
					})
				}
				count++
				//console.log(explosions)
			},100-(5*level))
		}else{
			console.log("count "+count+"ready "+this.state.gameIsReadyToPlay)
			if (count===1&&!this.state.gameIsReadyToPlay){
				console.log('here')
				this.playAgain()
			}
		}
	}
	

	render(){
		//console.log(require("react-konva").Rect)
		/*var stage=new Konva.Stage({
			container:'container',
			width:500,
			height:500
		});
		var layer = new Konva.Layer()

		var circle = new Konva.Circle({
		  x: stage.getWidth() / 2,
		  y: stage.getHeight() / 2,
		  radius: 70,
		  fill: 'red',
		  stroke: 'black',
		  strokeWidth: 4
		});

		layer.add(circle);
		stage.add(layer);
		layer.draw()
		let alienOffsetX=0
		let alienOffsetY=0
		//const bulwarks=this.state.bulwarks.map((e,i)=><Bulwark x={50+180*i} />)
		const aliens=this.state.aliens.map((e,i,a)=>{
			let y = Math.floor(i/10)*46+this.state.alienOffsetY;
			let x=0; 
			if (i%10<3){
				x=50*(i%10)+this.state.alienOffsetX;
				//return <Alien x={50*(i%10)+this.state.alienOffsetX} y={y}/>
			}else if(i%10>=3&&i%10<7){
				x=50*(i%10)+20+this.state.alienOffsetX;
				//return <Alien x={50*(i%10)+20+this.state.alienOffsetX} y={y}/>
			}else{
				x=50*(i%10)+40+this.state.alienOffsetX;
				//return <Alien x={50*(i%10)+40+this.state.alienOffsetX} y={y}/>
			}
			return <Alien x={x} y={y} animated={this.state.animated}/>

		})*/

	/*	let legs=Array(4).fill(0).map((e,i)=>(<Rect 
			key={i} 
			x={s+(2*i*s)} 
			y={7*s} 
			height={2*s} 
			width={s} 
			fill={green}/>
		*/
		const buttonText=this.state.gameOver&&!this.state.gameIsReadyToPlay&&!this.state.modal?"Play Again":"Start Game";
		const aliens = this.state.aliens.map((e,i)=><Alien key={i} x={e.x} y={e.y} animated={this.state.animated} alive={e.alive}/>)
		const missiles=this.state.missiles.map((e,i)=><Missile key={i} x={e.x} y={e.y} fill={darkBlue} />)
		const bulwarks=this.state.bulwarks.map((e,i)=><Bulwark key={i} x={e.x} y={e.y} health={e.health} fill={darkBlue} stroke={lavender}/>)
		const alienMissiles=this.state.alienMissiles.map((e,i)=><Missile x={e.x} key={i} y={e.y} fill={green}/>)
		const explosions=this.state.explosions.map(function(e,i){/*console.log(e)*/;if(e.disint===true){ return <Explosion x={e.x} key={i} y={e.y} geometry={explosionProps} />}else{ return<Disintegration scale={5} x={e.x} key={i} y={e.y} fill={green}/>}})
		return(
			<div id="wrapper">
				<div id='game'>
					<h1>Space Invaders</h1>
					<div id="canvasWrapper">
						<Stage width={width} height={height}>
							<Layer>
								<Rect width={width} height={height} fill={'black'}></Rect>
							</Layer>
							<Layer>
								<Group>{aliens}</Group>
								<Group>{bulwarks}</Group>
								<Group>{missiles}</Group>
								<Group>{alienMissiles}</Group>
								<Group>{explosions}</Group>
								<MissileLauncher gameOver={this.state.gameOver} screenHeight={height} x={this.state.launcher[0].x} y={this.state.launcher[0].y} fill={darkBlue} stroke={lavender}/>
							</Layer>
						</Stage>
					</div>
					<Scoreboard buttonText={buttonText} score={this.state.score} stroke={lavender} handleClick={this.startGame} />
				</div>
				{this.state.modal?<Modal playAgainButton={this.playAgain} score={this.state.score} closeModal={this.closeModal}/>:null}
			</div>
		)
	}

}

module.exports=Game