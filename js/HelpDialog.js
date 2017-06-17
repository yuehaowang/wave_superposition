var HelpDialog = {
	HELP_LIST : [
		{type : "title", content : "Hints"},
		{type : "item", content : "1m = " + DRAW_SCALE + "px"},
		{type : "title", content : "About"},
		{type : "item", content : "Designer: Yuehao Wang"},
		{type : "item", content : "Programmer: Yuehao Wang"},
		{type : "item", content : "Email: wangyuehao1999@gmail.com"},
		{type : "item", content : "App Engine: lufylegend.js"},
		{type : "message", content : "For my physics teacher Mr. Lei."},
		{type : "message", content : "Copyright 2017 Yuehao."}
	],
	
	createHelpLayer : function () {
		var list = HelpDialog.HELP_LIST, dW = LGlobal.width * 0.9, dH = LGlobal.height * 0.8;

		var layer = new LSprite();
		layer.graphics.drawRect(0, "", [0, 0, dW, dH], true, "#FFFFFF");

		var contentLayer = new LSprite();
		layer.addChild(contentLayer);

		for (var i = 0, l = list.length, toY = 0; i < l; i++) {
			var obj = list[i], fontSize, fontWeight, lineHeight;

			if (obj.type == "title") {
				fontSize = 18;
				fontWeight = "bold";
				lineHeight = 40;
			} else if (obj.type == "item") {
				fontSize = 12;
				fontWeight = "normal";
				lineHeight = 30;
			} else if (obj.type == "message") {
				fontSize = 12;
				fontWeight = "bold italic";
				lineHeight = 32;
			} else {
				continue;
			}

			var txt = new LTextField();
			txt.size = fontSize;
			txt.weight = fontWeight;
			txt.textAlign = "center";
			txt.text = obj.content;
			txt.x = dW / 2;
			txt.y = toY;
			contentLayer.addChild(txt);

			toY += lineHeight;
		}

		contentLayer.y = (dH - contentLayer.getHeight()) / 2 - 30;

		return layer;
	},

	show : function () {
		LMessageBox.show({displayObject: HelpDialog.createHelpLayer()});
	}
};