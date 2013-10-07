/* global define */
define(['../../bower_components/jquery/jquery.js'], function($) {
    'use strict';

    function User() {
        this.element = null;
        this.className = 'User';
        this.userName = {
            value: '',
            friendlyName: 'Name',
            type: 'string',
            defaultSort: 'max',
            cssClass: ''
        };
        this.numberFollowers = {
            value: 0,
            friendlyName: 'Followers',
            type: 'int',
            defaultSort: 'max',
            cssClass: ''
        };
        this.numberSounds = {
            value: 0,
            friendlyName: 'Sounds',
            type: 'int',
            defaultSort: 'max',
            cssClass: ''
        };
        this.onlineStatus = {
            value: false,
            friendlyName: 'Online',
            type: 'bool',
            defaultSort: 'min',
            cssClass: ''
        };
        this.subscriptionType = {
            value: '',
            friendlyName: 'Subscription',
            type: 'string',
            defaultSort: 'max',
            cssClass: ''
        };
        this.followingStatus = {
            value: false,
            friendlyName: 'Followed',
            type: 'bool',
            defaultSort: 'min',
            cssClass: ''
        };
    }

    User.prototype.getSubscriptionType = function(iconElement) {
        var classes,
            iconClass = 'zzzzzzz';

        if (iconElement.length) {
            classes = $(iconElement).attr('class').split(' ');

            classes.forEach(function(classPart) {
                if (classPart !== 'sc-status-icon-small' && classPart.match(/^sc-status-icon-/)) {
                    iconClass = classPart;
                }
            });
        }

        this.subscriptionType.value = iconClass.trim().toLowerCase();
    };

    return User;
});