/* global define */
define(function() {
    'use strict';

    return {
        pathHandler: function(changeFunction) {
            var oldPath = window.location.pathname,
                oldQueryString = window.location.search,
                detect,
                check;

            detect = function() {
                if (oldPath !== window.location.pathname || oldQueryString !== window.location.search) {
                    oldPath = window.location.pathname;
                    oldQueryString = window.location.search;

                    changeFunction();
                }
            };

            check = setInterval(function() {
                detect();
            }, 300);
        },

        getCurrentPath: function() {
            var currentPath = window.location.pathname.toLowerCase();

            // if the path doesn't begin with search or tags, then it's a user profile page
            // pattern is /username/sortableSet
            // getting third element, since splitting by / creates three items, first one being blank/null

            if (currentPath.substring(1, 7) === 'search') {
                currentPath = currentPath;
            } else if (currentPath.substring(1, 5) === 'tags') {
                currentPath = '/tags';
            } else {
                currentPath = '/' + currentPath.split('/')[2];
            }

            return currentPath;
        }


    };
});