function AdvancedWordStructure(text) {
	this.listofwordstrings = getListOfWordsAsString(text);

	this.allWords = [];

	this.root;

	this.createLinkedList = function (listofwordstrings) {
        this.allWords = [];

		wordvalues = [];
		basePos = createVector(50, middleY);

		for (i = 0; i < listofwordstrings.length; i++) {
			if (i == 0) {
				this.root = new Word(listofwordstrings[i], basePos);
				prev_word = this.root;

				wordvalues.push(listofwordstrings[i]);
				this.allWords.push(prev_word);
			} else {
				// als het woord nog niet bestaat
				if (!wordvalues.includes(listofwordstrings[i])) {
					if (prev_word.children.length == 0) {
						new_pos = createVector(
							prev_word.pos.x + 100,
							prev_word.pos.y
						);
					} else {
						if (prev_word.children.length == 1) {
							new_pos = createVector(
								prev_word.pos.x + 100,
								prev_word.pos.y + 50 * prev_word.children.length
							);
						}
					}

					new_word = new Word(listofwordstrings[i], new_pos);

					prev_word.children.push(new_word);

					new_word.parent = prev_word;

					prev_word = new_word;
					wordvalues.push(listofwordstrings[i]);
					this.allWords.push(new_word);
				} else {
					id = this.allWords.findIndex(
						(x) => x.value === listofwordstrings[i]
					);

					prev_word = this.allWords[id];
				}
			}
		}
	};

	this.createLinkedListPositions = (x_spacing,y_spacing) => {
		//root
		let current_layer = [this.root];
		let next_layer = [];

		while (current_layer.length != 0) {
        //for(a=0;a<10;a++){
			// get next layer
			for (i = 0; i < current_layer.length; i++) {
				for (j = 0; j < current_layer[i].children.length; j++) {
					next_layer.push(current_layer[i].children[j]);
				}
			}

			let layer_width = next_layer.length;
			for (i = 0; i < layer_width; i++) {
				next_layer[i].pos = createVector(
					next_layer[i].parent.pos.x + x_spacing,
					this.root.pos.y + y_spacing * i - (layer_width - 1) * (y_spacing/2)
				);
			}
			current_layer = next_layer;
            next_layer = [];
		}
	};

	this.show = (size) => {
		for (i = 0; i < this.allWords.length; i++) {
			this.allWords[i].drawLineToParent();
		}

        for (i = 0; i < this.allWords.length; i++) {
			this.allWords[i].draw(size);
		}
	};

	this.createLinkedList(this.listofwordstrings);
	this.createLinkedListPositions(100,50,20);
}

function Words(text) {
	this.words = [];

	this.sentences = [];

	this.show = () => {
		this.connectWords();

		for (i = 0; i < this.words.length; i++) {
			this.words[i].draw(20);
		}
	};

	this.createWordStructure = function (text) {
		//new_text = text.replace(/[,]+/g, '').toLowerCase()
		new_text = text.toLowerCase();
		var stringlist = new_text.split(".");

		this.sentences = stringlist;

		//console.log(stringlist[0])
		let wordstrings = stringlist[0].split(" ");

		interval = screenWidth / wordstrings.length;

		for (i = 0; i < wordstrings.length; i++) {
			pos = createVector(50 + i * interval, middleY);
			this.words.push(new Word(wordstrings[i], pos));
		}

		//console.log(new_text)
	};

	this.createWordStructure(text);

	this.connectWords = () => {
		stroke(255);
		for (i = 0; i < this.words.length - 1; i++) {
			line(
				this.words[i].pos.x,
				this.words[i].pos.y,
				this.words[i + 1].pos.x,
				this.words[i + 1].pos.y
			);
		}
	};
}
