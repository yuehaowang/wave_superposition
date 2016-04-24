function ControlLayer () {
	var s = this;
	LExtends(s, LSprite, []);

	s.rightPanel = null;
	s.leftPanel = null;

	s.init();
}

ControlLayer.prototype.init = function () {
	var s = this;

	s.leftPanel = s.createPanel(-1);
	s.addChild(s.leftPanel);

	s.rightPanel = s.createPanel(1);
	s.rightPanel.y = 150;
	s.addChild(s.rightPanel);

	var startBtn = new LButtonSample1("Start", 20);
	startBtn.x = LGlobal.width - 200;
	startBtn.y = 300;
	s.addChild(startBtn);

	startBtn.addEventListener(LMouseEvent.MOUSE_UP, function () {
		isStop = false;

		var w1Data = [
			s.leftPanel.amplitudeRange.value * 0.01 * Wave.MAX_A,
			s.leftPanel.periodRange.value * 0.01 * Wave.MAX_T,
			s.leftPanel.wavelengthRange.value * 0.01 * Wave.MAX_WAVELENGTH,
		];

		var w2Data = [
			s.rightPanel.amplitudeRange.value * 0.01 * Wave.MAX_A,
			s.rightPanel.periodRange.value * 0.01 * Wave.MAX_T,
			s.rightPanel.wavelengthRange.value * 0.01 * Wave.MAX_WAVELENGTH,
		];

		addTwoWaves(w1Data, w2Data);
	});

	var stopBtn = new LButtonSample1("Stop", 20);
	stopBtn.x = LGlobal.width - 120;
	stopBtn.y = 300;
	s.addChild(stopBtn);

	stopBtn.addEventListener(LMouseEvent.MOUSE_UP, function () {
		isStop = true;
	});

	var resetBtn = new LButtonSample1("Reset", 20);
	resetBtn.x = LGlobal.width - 290;
	resetBtn.y = 300;
	s.addChild(resetBtn);

	resetBtn.addEventListener(LMouseEvent.MOUSE_UP, function () {
		s.leftPanel.amplitudeRange.setValue(50);
		s.leftPanel.periodRange.setValue(50);
		s.leftPanel.wavelengthRange.setValue(50);

		s.rightPanel.amplitudeRange.setValue(50);
		s.rightPanel.periodRange.setValue(50);
		s.rightPanel.wavelengthRange.setValue(50);
	});
}

ControlLayer.prototype.createPanel = function (d) {
	var s = this;

	var txt, rangeWidget;

	var panel = new LSprite();

	txt = new LTextField();
	txt.weight = "bold";
	txt.text = "Wave from " + (d < 0 ? "Left" : "Right") + ": ";
	txt.size = 20;
	panel.addChild(txt);
	
	rangeWidget = s.createRangeWithHint("Wavelength (λ): ");
	panel.addChild(rangeWidget);
	panel.wavelengthRange = rangeWidget.range;

	rangeWidget = s.createRangeWithHint("Period (T): ");
	panel.addChild(rangeWidget);
	panel.periodRange = rangeWidget.range;

	rangeWidget = s.createRangeWithHint("Amplitude (A): ");
	panel.addChild(rangeWidget);
	panel.amplitudeRange = rangeWidget.range;

	for (var i = 0, preObj = null; i < panel.numChildren; i++) {
		var o = panel.getChildAt(i);

		if (o) {
			if (preObj) {
				o.y = preObj.getHeight() + preObj.y + 10;
			}

			preObj = o;
		}
	}

	return panel;
}

ControlLayer.prototype.createRangeWithHint = function (hint) {
	var txt, range;

	var layer = new LSprite();

	txt = new LTextField();
	txt.text = hint;
	txt.size = 15;
	layer.addChild(txt);

	range = new LRange(200);
	range.setValue(50);
	range.x = txt.getWidth() + 10;
	layer.addChild(range);

	layer.range = range;

	return layer;
}