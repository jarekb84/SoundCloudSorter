/* global define */
define(function() {
    'use strict';

    function Sound() {
        this.element = null;
        this.className = 'Sound';
        this.title = {
            value: '',
            friendlyName: 'Title',
            type: 'string',
            defaultSort: 'max',
            cssClass: ''
        };
        this.dateTime = {
            value: null,
            friendlyName: 'Date',
            type: 'date',
            defaultSort: 'max',
            cssClass: ''
        };
        this.plays = {
            value: 0,
            friendlyName: 'Plays',
            type: 'int',
            defaultSort: 'max',
            cssClass: ''
        };
        this.likes = {
            value: 0,
            friendlyName: 'Likes',
            type: 'int',
            defaultSort: 'max',
            cssClass: ''
        };
        this.reposts = {
            value: 0,
            friendlyName: 'Reposts',
            type: 'int',
            defaultSort: 'max',
            cssClass: ''
        };
        this.comments = {
            value: 0,
            friendlyName: 'Comments',
            type: 'int',
            defaultSort: 'max',
            cssClass: ''
        };
        this.duration = {
            value: 0,
            friendlyName: 'Duration',
            type: 'int',
            defaultSort: 'max',
            cssClass: ''
        };
        this.tag = {
            value: '',
            friendlyName: 'Tag',
            type: 'string',
            defaultSort: 'max',
            cssClass: ''
        };
    }

    Sound.prototype.setDuration = function(dur) {
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
    };

    return Sound;
});