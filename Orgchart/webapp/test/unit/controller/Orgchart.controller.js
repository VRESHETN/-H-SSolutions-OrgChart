/*global QUnit*/

sap.ui.define([
	"hs/com/orgchart/controller/Orgchart.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Orgchart Controller");

	QUnit.test("I should test the Orgchart controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});
