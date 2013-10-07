/* global define */
define(['../../bower_components/jquery/jquery.js', '/services/pathService.js', '/models/targetElements.js', '/controllers/sortActionsCtrl.js'], function($, PathService, TargetElements, SortActionsCtrl) {
	'use strict';

	return {
		init: function() {
			$(document).ready(function() {
				var targetElements = new TargetElements();

				targetElements.getElements();

				SortActionsCtrl.insertSortActions(targetElements);
				SortActionsCtrl.attachActionEvents(targetElements);

				PathService.pathHandler(function() {
					targetElements = new TargetElements();
					targetElements.getElements();
					SortActionsCtrl.insertSortActions(targetElements);
					SortActionsCtrl.attachActionEvents(targetElements);
				});
			});
		}
	};
});