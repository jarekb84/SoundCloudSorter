/* global define */
define(['../../bower_components/jquery/jquery.js', '/models/user.js'], function($, User) {
    'use strict';

    return {
        populateUserList: function(userList, targetElements) {
            userList.length = 0; //reset array in case user loaded more content
            $(targetElements.listItemElement).each(function() {
                var user = new User(),
                    $row = $(this);

                user.element = this;
                user.userName.value = $row.find('.userItem__title').children().eq(0).text().trim().toLowerCase() || $row.find('.userBadge__usernameLink').text().trim().toLowerCase();
                user.numberFollowers.value = $row.find('.sc-ministats-followers').children().eq(1).text().replace(new RegExp(',', 'g'), '') || 0;
                user.numberSounds.value = $row.find('.sc-ministats-sounds').children().eq(1).text().replace(new RegExp(',', 'g'), '') || 0;
                user.onlineStatus.value = $row.find('.sc-status-icon').hasClass('sc-status-icon-online');
                user.getSubscriptionType($row.find('.userBadge__title [class*="sc-status-icon-"]'));
                user.followingStatus.value = $row.find('.sc-button-follow').hasClass('sc-button-selected');

                userList.push(user);
            });
        }
    };
});