/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"hs/com/orgchart/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
