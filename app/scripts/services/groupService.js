/* global define */
define(['jquery', 'models/group'], function($, Group) {
    'use strict';

    return {
        populateGroupList: function(groupList, targetElements) {
            groupList.length = 0; //reset array in case user loaded more content
            $(targetElements.listItemElement).each(function() {
                var group = new Group(),
                    $row = $(this);

                group.element = this;
                group.groupName.value = $row.find('.groupItem__title a').text().trim().toLowerCase() || $row.find('.groupBadge__title a').text().trim().toLowerCase();
                group.numberSounds.value = $row.find('.sc-ministats-sounds').text().trim().replace(new RegExp(',', 'g'), '');
                group.numberFollowers.value = $row.find('.sc-ministats-followers').text().trim().replace(new RegExp(',', 'g'), '');
                group.joinStatus.value = $row.find('.sc-button-follow').hasClass('sc-button-selected');

                groupList.push(group);
            });
        }
    };
});