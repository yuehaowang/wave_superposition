LInit(60, "myapp", 414, 736, main);

var DRAW_SCALE = 30, TIME_SCALE = 1000;

var stageLayer, ctrlLayer, demoLayer;
var w1 = null, w2 = null;
var isStop = true;

function main () {
	if (LGlobal.mobile) {
		LGlobal.stageScale = LStageScaleMode.SHOW_ALL;
	}

	LGlobal.screen(LGlobal.FULL_SCREEN);

	var loadList = [
		{path : "./js/Wave.js"},
		{path : "./js/Oscillator.js"},
		{path : "./js/ControlLayer.js"}
	];

	LLoadManage.load(loadList, null, addLayers);
}

function addLayers () {
	stageLayer = new LSprite();
	addChild(stageLayer);

	demoLayer = new LSprite();
	demoLayer.x = 15;
	demoLayer.y = 190;
	stageLayer.addChild(demoLayer);

	demoLayer.graphics.add(function () {
		var c = LGlobal.canvas;

		c.textAlign = "center";
		c.font = "20px Arial";
		c.fillText("Click the 'Start' button to start demo.", LGlobal.width / 2, 30);
	});

	ctrlLayer = new ControlLayer();
	ctrlLayer.x = 20;
	ctrlLayer.y = 380;
	stageLayer.addChild(ctrlLayer);

	stageLayer.addEventListener(LEvent.ENTER_FRAME, onFrame);
}

function addTwoWaves (w1Data, w2Data) {
	w1 = new Wave(1, w1Data[0], w1Data[1], w1Data[2]);
	w1.start();

	w2 = new Wave(-1, w2Data[0], w2Data[1], w2Data[2]);
	w2.start();
}

function onFrame () {
	if (isStop || !w1 || !w2) {
		return;
	}

	w1.loop();
	w2.loop();

	demoLayer.graphics.clear();

	var list = Wave.getNewWaveOscillators(w1, w2);

	for (var i = 0, preOsc = null, l = list.length; i < l; i++) {
		var o = list[i];

		if (preOsc) {
			demoLayer.graphics.drawLine(5, "red", [preOsc.x * DRAW_SCALE, preOsc.y * DRAW_SCALE, o.x * DRAW_SCALE, o.y * DRAW_SCALE]);
		}

		preOsc = o;
	}
}