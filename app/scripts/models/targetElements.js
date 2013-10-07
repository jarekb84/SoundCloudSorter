/* global define */
define(['/models/sound.js','/models/user.js','/models/group.js','/services/pathService.js'], function(Sound, User, Group, pathService) {
    'use strict';

    function TargetElements() {
        // given the current page user is on, determine which dom elements should be used to
        // retrieve data and where to insert the sort actions and sorted list of elements

        this.listItemElement = null; // <li> element to target
        this.collectionElement = null; // element to which sorted items will be attached to
        this.headerElement = null; // element to which sorting actions buttons are added to
        this.insertMethod = null; // determines where sorting actions are added to, can be before or after
        this.currentPath = null;
        this.object = null; // Type of object to use when generating template. ie sound, group, user
    }

    TargetElements.prototype.getElements = function() {
        this.currentPath = pathService.getCurrentPath();

        switch (this.currentPath) {
        case '/search':
        case '/search/sounds':
        case '/search/sets':
            this.headerElement = '.search__header';
            this.insertMethod = 'after';
            this.collectionElement = '.searchList';
            this.listItemElement = '.searchList__item';
            this.object = new Sound();
            break;

        case '/search/people':
            this.headerElement = '.search__header';
            this.insertMethod = 'after';
            this.collectionElement = '.searchList';
            this.listItemElement = '.searchList__item';
            this.object = new User();
            break;

        case '/search/groups':
            this.headerElement = '.search__header';
            this.insertMethod = 'after';
            this.collectionElement = '.searchList';
            this.listItemElement = '.searchList__item';
            this.object = new Group();
            break;

        case '/tags':
            this.headerElement = '.tagsList__list';
            this.insertMethod = 'before';
            this.collectionElement = '.tagsList__list';
            this.listItemElement = '.soundList__item';
            this.object = new Sound();
            break;

        case '/sets':
        case '/likes':
            this.headerElement = '.userNetworkTop';
            this.insertMethod = 'after';
            this.collectionElement = '.soundList';
            this.listItemElement = '.soundList__item';
            this.object = new Sound();
            break;

        case '/following':
        case '/followers':
            this.headerElement = '.userNetworkTop';
            this.insertMethod = 'after';
            this.collectionElement = '.usersList';
            this.listItemElement = '.usersList__item';
            this.object = new User();
            break;

        case '/groups':
            this.headerElement = '.userNetworkTop';
            this.insertMethod = 'after';
            this.collectionElement = '.groupsList';
            this.listItemElement = '.groupsList__item';
            this.object = new Group();

            break;

        case '/comments':
            this.headerElement = '.userNetworkTop';
            this.insertMethod = 'after';
            this.collectionElement = '.userNetworkCommentsList';
            this.listItemElement = '.userNetworkCommentsList__item';

            break;
        default:

            break;
        }
    };
    
    return TargetElements;
});