/* global define */
define(function() {
    'use strict';
    
    function Group() {
        this.element = null;
        this.className = 'Group';
        this.groupName = {
            value: '',
            friendlyName: 'Name',
            type: 'string',
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
        this.numberFollowers = {
            value: 0,
            friendlyName: 'Followers',
            type: 'int',
            defaultSort: 'max',
            cssClass: ''
        };
        this.joinStatus = {
            value: false,
            friendlyName: 'Joined',
            type: 'bool',
            defaultSort: 'min',
            cssClass: ''
        };
    }

    return Group;
});