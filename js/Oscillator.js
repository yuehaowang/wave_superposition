function Oscillator (A, T) {
	var s = this;

	s.x = 0;
	s.y = 0;
	s.A = A;
	s.T = T;
	s.isStart = false;
	s.startDate = null;
}

Oscillator.prototype.start = function () {
	var s = this;

	s.isStart = true;
	s.startDate = (new Date()).getTime();
};

Oscillator.prototype.loop = function () {
	var s = this;

	if (!s.isStart) {
		return;
	}

	var nowDate = (new Date()).getTime(), usedTime = nowDate - s.startDate;

	s.y = s.A * Math.sin((usedTime / s.T / TIME_SCALE) * Math.PI * 2);
};