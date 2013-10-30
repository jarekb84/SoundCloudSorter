/* global define */
define(['jquery', 'models/sound'], function($, Sound) {
    'use strict';

    return {
        populateSoundList: function(soundList, targetElements) {
            soundList.length = 0; //reset array in case user loaded more content
            $(targetElements.listItemElement).each(function() {
                var sound = new Sound();

                sound.element = this;
                sound.title.value = $(this).find('.soundTitle__title').text().trim().toLowerCase();
                sound.dateTime.value = $(this).find('time').attr('datetime');
                sound.plays.value = $(this).find('.sc-ministats-plays').children().eq(1).text().replace(new RegExp(',', 'g'), '');
                sound.likes.value = $(this).find('.sc-ministats-likes').children().eq(1).text().replace(new RegExp(',', 'g'), '');
                sound.reposts.value = $(this).find('.sc-ministats-reposts').children().eq(1).text().replace(new RegExp(',', 'g'), '');
                sound.comments.value = $(this).find('.sc-ministats-comments').children().eq(1).text().replace(new RegExp(',', 'g'), '');
                //sound.setDuration($(this).find('.timeIndicator__total').children().eq(1).text());
                sound.tag.value = $(this).find('.soundTitle__tag').text().toLowerCase().trim() || 'zzzzzzz';

                soundList.push(sound);
            });
        }
    };
});