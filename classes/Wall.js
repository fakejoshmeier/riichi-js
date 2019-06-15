export default class Wall {
	constructor() {
		this.tiles = [];
		this.hands = {};
		this.wall = {};
		this.reset();
		this.shuffle();
	}

	reset() {
		const suits = ['Souzu', 'Pinzu', 'Manzu'];
		const values = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
		const winds = ['East', 'South', 'West', 'North'];
		const dragons = ['White', 'Green', 'Red'];
		const addTile = (arr, suit, value) => {
			let tile = {
				'suit': suit,
				'value': value,
			};
			arr.push(tile);
			arr.push(tile);
			arr.push(tile);
			arr.push(tile);
		};

		suits.map(suit => values.map(value => addTile(this.tiles, suit, value)));
		winds.map(wind => addTile(this.tiles, 'Wind', wind));
		dragons.map(dragon => addTile(this.tiles, 'Dragon', dragon));
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

	handSort(hand) {
		const tileSort = (a, b) => {
			return a.suit == b.suit ? (a.value > b.value ? 1 : -1) : (a.suit > b.suit ? 1 : -1);
		};
		let h = [];
		let s = [];

		hand.map(t => t.suit == 'Manzu' || t.suit == 'Pinzu' || t.suit == 'Souzu' ? s.push(t) : h.push(t));
		s.sort((a, b) => tileSort(a, b));
		h.sort((a, b) => tileSort(a, b));
		Array.prototype.push.apply(s, h);

		return s;
	}

	// Each player draws 4 tiles at a time until everyone has 12
	//From then, East takes the first and third tile from the top stack
	//while the other players take one

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
		Array.prototype.push.apply(this.hands.E, wallTop.splice(2, 1));
		this.hands.E.push(wallTop.shift());
		this.hands.S.push(wallBot.shift());
		this.hands.W.push(wallTop.shift());
		this.hands.N.push(wallBot.shift());
		Object.keys(this.hands).forEach((hand) => {
			this.hands[hand] = this.handSort(this.hands[hand]);
		});
		this.wall = {
			'top':wallTop,
			'bot':wallBot
		};

		return this.hands;
	}
}