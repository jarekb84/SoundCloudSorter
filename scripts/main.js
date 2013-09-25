/*global chrome, _*/
//noinspection JSUnresolvedVariable,JSUnresolvedFunction
chrome.extension.sendMessage({}, function () {
    "use strict";

    function getCurrentPath (){
        var currentPath = window.location.pathname.toLowerCase();

        // if the path doesn't begin with search or tags, then it's a user profile page
        // pattern is /username/sortableSet
        // getting third element, since splitting by / creates three items, first one being blank/null

        if(currentPath.substring(1,7) === "search") {
            currentPath = currentPath;
        } else if (currentPath.substring(1,5) === "tags"){
            currentPath = "/tags";
        } else {
            currentPath = "/" + currentPath.split('/')[2];
        }

        return currentPath;
    }

    String.prototype.format = function () {
        var str = this,
            args = arguments;
        return str.replace(String.prototype.format.regex, function(item) {
            var intVal = parseInt(item.substring(1, item.length -1),10),
                replace;

            if (intVal >= 0) {
                replace = args[intVal];
            } else if (intVal === -1) {
                replace = "{";
            } else if (intVal === -2) {
                replace = "}";
            } else {
                replace = "";
            }

            return replace;
        });
    };
    String.prototype.format.regex = new RegExp("{-?[0-9]+}", "g");

    function TargetElements() {
        // given the current page user is on, determine which dom elements should be used to
        // retrieve data and where to insert the sort actions and sorted list of elements

        this.listItemElement = null; // <li> element to target
        this.collectionElement = null; // element to which sorted items will be attached to
        this.headerElement = null; // element to which sorting actions buttons are added to
        this.insertMethod = null; // determines where sorting actions are added to, can be before or after
        this.currentPath = null;
        this.object = null; // Type of object to use when generating template, sound, group, user
    }

    TargetElements.prototype.getElements = function() {
        this.currentPath = getCurrentPath();

        switch (this.currentPath) {
            case "/search":
            case "/search/sounds":
            case "/search/sets":
                this.headerElement = '.search__header';
                this.insertMethod = 'after';
                this.collectionElement = '.searchList';
                this.listItemElement = '.searchList__item';
                this.object = new Sound();
                break;

            case "/search/people":
                this.headerElement = '.search__header';
                this.insertMethod = 'after';
                this.collectionElement = '.searchList';
                this.listItemElement = '.searchList__item';
                this.object = new User();
                break;

            case "/search/groups":
                this.headerElement = '.search__header';
                this.insertMethod = 'after';
                this.collectionElement = '.searchList';
                this.listItemElement = '.searchList__item';
                this.object = new Group();
                break;

            case "/tags":
                this.headerElement = '.tagsList__list';
                this.insertMethod = 'before';
                this.collectionElement = '.tagsList__list';
                this.listItemElement = '.soundList__item';
                this.object = new Sound();
                break;

            case "/sets":
            case "/likes":
                this.headerElement = '.userNetworkTop';
                this.insertMethod = 'after';
                this.collectionElement = '.soundList';
                this.listItemElement = '.soundList__item';
                this.object = new Sound();
                break;

            case "/following":
            case "/followers":
                this.headerElement = '.userNetworkTop';
                this.insertMethod = 'after';
                this.collectionElement = '.usersList';
                this.listItemElement = '.usersList__item';
                this.object = new User();
                break;

            case "/groups":
                this.headerElement = '.userNetworkTop';
                this.insertMethod = 'after';
                this.collectionElement = '.groupsList';
                this.listItemElement = '.groupsList__item';
                this.object = new Group();

                break;

            case "/comments":
                this.headerElement = '.userNetworkTop';
                this.insertMethod = 'after';
                this.collectionElement = '.userNetworkCommentsList';
                this.listItemElement = '.userNetworkCommentsList__item';

                break;
            default:

                break;
        }
    };

    function Group() {
        this.element = null;
        this.groupName = {
            value : '',
            friendlyName: 'Name',
            type : 'string',
            defaultSort : 'max',
            cssClass : ''
        };
        this.numberSounds =  {
            value : 0,
            friendlyName: 'Sounds',
            type : 'int',
            defaultSort : 'max',
            cssClass : ''
        };
        this.numberFollowers = {
            value : 0,
            friendlyName: 'Followers',
            type : 'int',
            defaultSort : 'max',
            cssClass : ''
        };
        this.joinStatus = {
            value : false,
            friendlyName: 'Joined',
            type : 'bool',
            defaultSort : 'min',
            cssClass : ''
        };
    }

    function User() {
        this.element = null;
        this.userName ={
            value : '',
            friendlyName: 'Name',
            type : 'string',
            defaultSort : 'max',
            cssClass : ''
        };
        this.numberFollowers = {
            value : 0,
            friendlyName: 'Followers',
            type : 'int',
            defaultSort : 'max',
            cssClass : ''
        };
        this.numberSounds = {
            value : 0,
            friendlyName: 'Sounds',
            type : 'int',
            defaultSort : 'max',
            cssClass : ''
        };
        this.onlineStatus = {
            value : false,
            friendlyName: 'Online',
            type : 'bool',
            defaultSort : 'min',
            cssClass : ''
        };
        this.subscriptionType = {
            value : '',
            friendlyName: 'Subscription',
            type : 'string',
            defaultSort : 'max',
            cssClass : ''
        };
        this.followingStatus = {
            value : false,
            friendlyName: 'Followed',
            type : 'bool',
            defaultSort : 'min',
            cssClass : ''
        };
    }

    function Sound() {
        this.element = null;
        this.title = {
            value : '',
            friendlyName: 'Title',
            type : 'string',
            defaultSort : 'max',
            cssClass : ''
        };
        this.dateTime = {
            value : null,
            friendlyName: 'Date',
            type : 'date',
            defaultSort : 'max',
            cssClass : ''
        };
        this.plays = {
            value : 0,
            friendlyName: 'Plays',
            type : 'int',
            defaultSort : 'max',
            cssClass : ''
        };
        this.likes = {
            value : 0,
            friendlyName: 'Likes',
            type : 'int',
            defaultSort : 'max',
            cssClass : ''
        };
        this.reposts = {
            value : 0,
            friendlyName: 'Reposts',
            type : 'int',
            defaultSort : 'max',
            cssClass : ''
        };
        this.comments = {
            value : 0,
            friendlyName: 'Comments',
            type : 'int',
            defaultSort : 'max',
            cssClass : ''
        };
        /*this.duration = {
            value : 0,
            friendlyName: 'Duration',
            type : 'int',
            defaultSort : 'max',
            cssClass : ''
        };*/
        this.tag = {
            value : '',
            friendlyName: 'Tag',
            type : 'string',
            defaultSort : 'max',
            cssClass : ''
        };
    }

    /*Sound.prototype.setDuration = function (dur) {
        var tempDuration = dur.split('.'),
            days = 0,
            hours = 0,
            min = 0,
            sec = 0;

        switch (tempDuration.length) {
            case 4:
                days = parseInt(tempDuration[0], 10);
                hours = parseInt(tempDuration[1], 10);
                min = parseInt(tempDuration[2], 10);
                sec = parseInt(tempDuration[3], 10);
                break;
            case 3:
                hours = parseInt(tempDuration[0], 10);
                min = parseInt(tempDuration[1], 10);
                sec = parseInt(tempDuration[2], 10);
                break;
            case 2:
                min = parseInt(tempDuration[0], 10);
                sec = parseInt(tempDuration[1], 10);
                break;
            case 1:
                sec = parseInt(tempDuration[0], 10);

                break;
        }

        this.duration.value = (days * 86400) + (hours * 3600) + (min * 60) + sec;
    };*/

    function sortItems(itemList, itemProperty, propertyType, lastSortedBy) {
        switch (propertyType) {
        case "string":
            itemList = _.sortBy(itemList, function (item) {
                return item[itemProperty].value;
            });
            itemList = itemList.reverse();
            break;
        case "date":
            itemList = _.sortBy(itemList, function (item) {
                return item[itemProperty].value;
            });
            break;
        case "int":
            itemList = _.sortBy(itemList, function (item) {
                return Math.min(parseInt(item[itemProperty].value, 10));
            });
            break;
        case "bool":
            itemList = _.sortBy(itemList, function (item) {
                return item[itemProperty].value;
            });
            itemList = itemList.reverse();
            break;
        default:
            itemList = _.sortBy(itemList, function (item) {
                return item[itemProperty].value;
            });
            break;
        }

        if (lastSortedBy === 'max') {
            itemList = itemList.reverse();
        }

        return itemList;
    }

    function populateSoundList(soundList, targetElements) {
        soundList.length = 0; //reset array in case user loaded more content
        $(targetElements.listItemElement).each(function () {
            var sound = new Sound();

            sound.element = this;
            sound.title.value = $(this).find('.soundTitle__title').text().trim().toLowerCase();
            sound.dateTime.value = $(this).find('time').attr('datetime');
            sound.plays.value = $(this).find('.sc-ministats-plays').children().eq(1).text().replace(new RegExp(",", "g"), '');
            sound.likes.value = $(this).find('.sc-ministats-likes').children().eq(1).text().replace(new RegExp(",", "g"), '');
            sound.reposts.value = $(this).find('.sc-ministats-reposts').children().eq(1).text().replace(new RegExp(",", "g"), '');
            sound.comments.value = $(this).find('.sc-ministats-comments').children().eq(1).text().replace(new RegExp(",", "g"), '');
            //sound.setDuration($(this).find('.timeIndicator__total').children().eq(1).text());
            sound.tag.value = $(this).find('.soundTitle__tag').text().toLowerCase().trim() || 'zzzzzzz';

            soundList.push(sound);
        });
    }

    function populateUserList(userList, targetElements){
        userList.length = 0; //reset array in case user loaded more content
        $(targetElements.listItemElement).each(function () {
            var user = new User(),
                $row = $(this);

            user.element = this;
            user.userName.value = $row.find('.userItem__title').children().eq(0).text().trim().toLowerCase() || $row.find('.userBadge__usernameLink').text().trim().toLowerCase();
            user.numberFollowers.value = $row.find('.sc-ministats-followers').children().eq(1).text().replace(new RegExp(",", "g"), '') || 0;
            user.numberSounds.value = $row.find('.sc-ministats-sounds').children().eq(1).text().replace(new RegExp(",", "g"), '') || 0;
            user.onlineStatus.value = $row.find('.sc-status-icon').hasClass('sc-status-icon-online');
            user.subscriptionType.value = $row.find('.sc-status-icon').text().trim().toLowerCase() || 'zzzzzzz';
            user.followingStatus.value = $row.find('.sc-button-follow').hasClass('sc-button-selected');

            userList.push(user);
        });
    }

    function populateGroupList(groupList, targetElements){
        groupList.length = 0; //reset array in case user loaded more content
        $(targetElements.listItemElement).each(function () {
            var group = new Group(),
                $row = $(this);

            group.element = this;
            group.groupName.value = $row.find('.groupItem__title a').text().trim().toLowerCase() || $row.find('.groupBadge__title a').text().trim().toLowerCase();
            group.numberSounds.value = $row.find('.sc-ministats-sounds').text().trim().replace(new RegExp(",", "g"), '');
            group.numberFollowers.value = $row.find('.sc-ministats-followers').text().trim().replace(new RegExp(",", "g"), '');
            group.joinStatus.value = $row.find('.sc-button-follow').hasClass('sc-button-selected');

            groupList.push(group);
        });

    }

    function attachItemsToDom(itemsToAttach,targetElements) {
        // make sure collection element exists, this is what we append items to
        if ($(targetElements.collectionElement).length > 0) {

            itemsToAttach.forEach(function (item) {
                $(item.element).prependTo(targetElements.collectionElement);
            });
        }
    }

    function updateLastSortedBy(element) {
        var lastSortedBy = $(element).data('lastsortedby');

        if (lastSortedBy === 'min') {
            lastSortedBy = 'max';
        } else {
            lastSortedBy = 'min';
        }

        // resets all to default sort, so when user switches between sort actions, their default sort is first used
        $('.sortAction').each(function(){
            var $sortAction = $(this),
                defaultSort = $sortAction.data('defaultsort');

            $sortAction.data('lastsortedby', defaultSort);
        });

        $(element).data('lastsortedby', lastSortedBy);

        return lastSortedBy;
    }

    function attachActionEvents(targetElements) {
        $('.sortAction').on('click', function () {
            $('.sorterActions').children().removeClass('sc-button-active');
            $(this).addClass('sc-button-active');

            var itemProperty = $(this).data('itemproperty'),
                propertyType = $(this).data('type'),
                lastSortedBy = updateLastSortedBy(this),
                itemList = [];

            switch(targetElements.object.constructor.name){
                case "Sound":
                    populateSoundList(itemList, targetElements);
                    break;
                case "User":
                    populateUserList(itemList, targetElements);
                    break;
                case "Group":
                    populateGroupList(itemList, targetElements);
                    break;
            }

            itemList = sortItems(itemList, itemProperty, propertyType, lastSortedBy);
            attachItemsToDom(itemList,targetElements);
        });
    }

    function insertSortActions(targetElements) {
        $('.sorterActions').remove(); //clear out if they already exist;
        var actionTemplate,
            actions = [];

        if(!targetElements.object){
            //if no object (sound, group, user) has been defined, then no sort actions should be added
            return null;
        }

        var obj = targetElements.object;
        for (var property in obj) {
            if(obj.hasOwnProperty(property) && property !== 'element'){
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

        if ($headerElement.length > 0) {
            $headerElement[targetElements.insertMethod](actionTemplate.join(''));
        }
    }

    function pathHandler(changeFunction) {
        var oldPath = window.location.pathname,
            detect,
            check;

        detect = function () {
            if (oldPath !== window.location.pathname) {
                oldPath = window.location.pathname;
                changeFunction();
            }
        };

        check = setInterval(function () {
            detect();
        }, 100);
    }

    function init() {
        $(document).ready(function () {
            var targetElements = new TargetElements();

            targetElements.getElements();

            insertSortActions(targetElements);
            attachActionEvents(targetElements);

            pathHandler(function () {
                targetElements.getElements();
                insertSortActions(targetElements);
                attachActionEvents(targetElements);
            });
        });
    }

    var sortableContentLoaded = setInterval(function () {
        if ($(' .l-main .searchList__item, .l-main .soundList__item,  .l-main  .usersList__item,  .l-main .groupsList__item').length) {
            clearInterval(sortableContentLoaded);

            init();
        }
    }, 100);
});