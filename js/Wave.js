function Wave (direction, A, T, wavelength) {
	var s = this;

	s.direction = direction;
	s.A = A;
	s.T = T;
	s.wavelength = wavelength;
	s.oscillators = new Array();
	s.numOscillatorInOneT = null;
	s.intervalBetweenTwoOscillators = null;
	s.numStartedOscillators = 0;
	s.preTime = null;

	s.addOscillator();
}

Wave.MAX_A = 3;
Wave.MAX_T = 4;
Wave.MAX_WAVELENGTH = 3;

Wave.prototype.start = function () {
	this.preTime = (new Date()).getTime();
};

Wave.prototype.addOscillator = function () {
	var s = this, dx = 0.1;

	s.numOscillatorInOneT = s.wavelength / dx;

	for (var i = 0, dx = 0.1; i < 130; i++) {
		var o = new Oscillator(s.A, s.T);
		o.x = i * dx;

		s.oscillators.push(o);
	}

	if (s.direction < 0) {
		s.oscillators.reverse();
	}
};

Wave.prototype.loop = function () {
	var s = this;

	if (s.preTime === null) {
		s.preTime = nowTime;

		return;
	}

	for (var i = 0, l = s.oscillators.length; i < l; i++) {
		s.oscillators[i].loop();
	}

	if (s.numStartedOscillators < s.oscillators.length) {
		var nowTime = (new Date()).getTime();

		if (nowTime - s.preTime >= s.intervalBetweenTwoOscillators) {
			s.oscillators[s.numStartedOscillators++].start();

			s.preTime = nowTime;
		}
	}
};

Wave.getNewWaveOscillators = function (w1, w2) {
	var res = new Array();

	for (var i = 0,  l = w1.oscillators.length; i < l; i++) {
		var o1 = w1.oscillators[i], o2 = w2.oscillators[l - i - 1];

		var no = new Oscillator();
		no.x = o1.x;
		no.y = o1.y + o2.y;

		res.push(no);
	}

	return res;
};