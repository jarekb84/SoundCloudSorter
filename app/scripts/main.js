/* global require */
require(['../../app/bower_components/jquery/jquery','/controllers/soundCloudSorterCtrl.js'], function($, soundCloudSorterCtrl) {
	'use strict';
	var sortableContentLoaded = setInterval(function() {
		if ($(' .l-main .searchList__item, .l-main .soundList__item,  .l-main  .usersList__item,  .l-main .groupsList__item').length) {
			clearInterval(sortableContentLoaded);

			soundCloudSorterCtrl.init();
		}
	}, 100);
});