class Wall {
	constructor() {
		this.tiles = [];
		this.hands = {};
		this.wall = {};
		this.reset();
		this.shuffle();
	}

	reset() {
		const suits = ['s', 'p', 'm'];
		const values = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
		const honors = ['E', 'S', 'W', 'N', 'Wh', 'R', 'G'];

		for (let suit in suits) {
			for (let value in values) {
				this.tiles.push(values[value] + suits[suit]);
				this.tiles.push(values[value] + suits[suit]);
				this.tiles.push(values[value] + suits[suit]);
				this.tiles.push(values[value] + suits[suit]);
			}
		}
		for (let honor in honors) {
			this.tiles.push(honors[honor]);
			this.tiles.push(honors[honor]);
			this.tiles.push(honors[honor]);
			this.tiles.push(honors[honor]);
		}
	}

	shuffle() {
		const { tiles } = this;
		let m = tiles.length, i;

		while (m) {
			i = Math.floor(Math.random() * m--);
			[tiles[m], tiles[i]] = [tiles[i], tiles[m]];
		}

		return this;
	}

	// Each player draws 4 tiles at a time until everyone has 12
	deal() {
		let h = Math.floor(this.tiles.length / 2);
		let wallTop = this.tiles.slice(0, h);
		let wallBot = this.tiles.slice(h, this.tiles.length);
		this.hands = {
			'E':[],
			'S':[],
			'W':[],
			'N':[]
		};
		for (let i = 0; i < 3; i ++) {
			Object.keys(this.hands).forEach((hand) => {
				this.hands[hand].push(wallTop.shift());
				this.hands[hand].push(wallTop.shift());
				this.hands[hand].push(wallBot.shift());
				this.hands[hand].push(wallBot.shift());
			});
		}
	//From then, East takes the first and third tile from the top stack
	//while the other players take one
		Array.prototype.push.apply(this.hands.E, wallTop.splice(2, 1));
		this.hands.E.push(wallTop.shift());
		this.hands.S.push(wallBot.shift());
		this.hands.W.push(wallTop.shift());
		this.hands.N.push(wallBot.shift());
		this.wall = {
			'top':wallTop,
			'bot':wallBot
		};
		return this.hands;
	}
}

const tiles = new Wall();
const hands = tiles.deal();
console.log(hands);
console.log(tiles.wall.top.length);
console.log(tiles.wall.bot.length);