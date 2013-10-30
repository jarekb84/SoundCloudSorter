/* global define */
define(['jquery', 'services/pathService', 'models/targetElements', 'controllers/sortActionsCtrl'], function($, PathService, TargetElements, SortActionsCtrl) {
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