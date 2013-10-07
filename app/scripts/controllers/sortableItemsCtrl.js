/* global define */
define(['../../bower_components/jquery/jquery.js','../../bower_components/lodash/dist/lodash.js' ], function($, _) {
	'use strict';

	return {
		sortItems: function(itemList, itemProperty, propertyType, lastSortedBy) {
			switch (propertyType) {
			case 'string':
				itemList = _.sortBy(itemList, function(item) {
					return item[itemProperty].value;
				});
				itemList = itemList.reverse();
				break;
			case 'date':
				itemList = _.sortBy(itemList, function(item) {
					return item[itemProperty].value;
				});
				break;
			case 'int':
				itemList = _.sortBy(itemList, function(item) {
					return Math.min(parseInt(item[itemProperty].value, 10));
				});
				break;
			case 'bool':
				itemList = _.sortBy(itemList, function(item) {
					return item[itemProperty].value;
				});
				itemList = itemList.reverse();
				break;
			default:
				itemList = _.sortBy(itemList, function(item) {
					return item[itemProperty].value;
				});
				break;
			}

			if (lastSortedBy === 'max') {
				itemList = itemList.reverse();
			}

			return itemList;
		},

		attachItemsToDom: function(itemsToAttach, targetElements) {
			// make sure collection element exists, this is what we append items to
			if ($(targetElements.collectionElement).length > 0) {

				itemsToAttach.forEach(function(item) {
					$(item.element).prependTo(targetElements.collectionElement);
				});
			}
		}
	};
});