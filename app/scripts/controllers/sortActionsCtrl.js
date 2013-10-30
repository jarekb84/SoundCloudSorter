/* global define */
define(['jquery', 'services/soundService', 'services/userService', 'services/groupService','controllers/sortableItemsCtrl','helpers/string'], function($, SoundService, UserService, GroupService, SortableItemsCtrl) {
	'use strict';

	function updateLastSortedBy(element) {
		var lastSortedBy = $(element).data('lastsortedby');

		if (lastSortedBy === 'min') {
			lastSortedBy = 'max';
		} else {
			lastSortedBy = 'min';
		}

		// resets all to default sort, so when user switches between sort actions, their default sort is first used
		$('.sortAction').each(function() {
			var $sortAction = $(this),
				defaultSort = $sortAction.data('defaultsort');

			$sortAction.data('lastsortedby', defaultSort);
		});

		$(element).data('lastsortedby', lastSortedBy);

		return lastSortedBy;
	}

	function attachActionEvents(targetElements) {
		$('.sortAction').on('click', function() {
			$('.sorterActions').children().removeClass('sc-button-active');
			$(this).addClass('sc-button-active');

			var itemProperty = $(this).data('itemproperty'),
				propertyType = $(this).data('type'),
				lastSortedBy = updateLastSortedBy(this),
				itemList = [];

			// had to add hardcoded class name rather then using object.constructor.name
			// otherwise minified version broke this switch statement
			switch (targetElements.object.className) {
			case 'Sound':
				SoundService.populateSoundList(itemList, targetElements);
				break;
			case 'User':
				UserService.populateUserList(itemList, targetElements);
				break;
			case 'Group':
				GroupService.populateGroupList(itemList, targetElements);
				break;
			}

			itemList = SortableItemsCtrl.sortItems(itemList, itemProperty, propertyType, lastSortedBy);
			SortableItemsCtrl.attachItemsToDom(itemList, targetElements);
		});
	}

	function insertSortActions(targetElements) {
		$('.sorterActions').remove(); //clear out if they already exist;
		var actionTemplate,
			actions = [];

		if (!targetElements.object) {
			//if no object (sound, group, user) has been defined, then no sort actions should be added
			return null;
		}

		var obj = targetElements.object;
		for (var property in obj) {
			if (obj.hasOwnProperty(property) && property !== 'element' && property !== 'className') {
				var action = '<button data-lastSortedBy="{0}" data-defaultSort={0} data-type="{1}" data-itemProperty="{2}" class="sortAction sc-button sc-button-small sc-button-responsive sc-button-title {3}">{4}</button>';
				action = action.format(obj[property].defaultSort, obj[property].type, property, obj[property].cssClass, obj[property].friendlyName);
				actions.push(action);
			}
		}

		actionTemplate = [
			'<div class="sorterActions sc-button-group">',
			'<span style="float: left; margin-right:1em;">Sort By</span>',
			actions.join(''),
			'<hr />',
			'</div>'
		];

		var $headerElement = $(targetElements.headerElement);
		var $listElemetns = $(targetElements.listItemElement);

		if ($headerElement.length > 0 && $listElemetns.length > 0) {
			$headerElement[targetElements.insertMethod](actionTemplate.join(''));

		} else {
			setTimeout(function() {
				insertSortActions(targetElements);
			}, 500);
		}
	}

	return {
		'updateLastSortedBy': updateLastSortedBy,
		'attachActionEvents': attachActionEvents,
		'insertSortActions': insertSortActions
	};
});