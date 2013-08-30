chrome.extension.sendMessage({}, function (response) {			
	var searchResultsLoaded = setInterval(function () {								
		if ($('.searchList__item, .soundList__item').length) {
			clearInterval(searchResultsLoaded);  
			
			$(document).ready(function () {			
				insertSortActions();

				$('.searchOptions__navigation, .soundTitle__tagContainer').find('a').on('click', function (){							
					insertSortActions();
				});
								
				var soundList = [];
				
				var Sound = function () {
						this.element = null;
						this.title = null;
						this.time = null;
						this.plays = 0;
						this.likes = 0;
						this.reposts = 0;
						this.comments = 0;
						this.duration = 0;
						this.tag = null;
						
						this.setDuration = function(dur) {
							var tempDuration = dur.split('.')
								, days = 0
								, hours = 0
								, min = 0
								, sec = 0;
							
							switch (tempDuration.length) {
							case 4:
								days = parseInt(tempDuration[0],10);
								hours = parseInt(tempDuration[1],10);
								min = parseInt(tempDuration[2],10);
								sec = parseInt(tempDuration[3],10);
								break;
							case 3:
								hours = parseInt(tempDuration[0],10);
								min = parseInt(tempDuration[1],10);
								sec = parseInt(tempDuration[2],10);										
								break;
							case 2:										
								min = parseInt(tempDuration[0],10);
								sec = parseInt(tempDuration[1],10);										
								break;
							case 1:																	
								sec = parseInt(tempDuration[0],10);
								
								break;																											
							}
							
							this.duration = (days * 86400) + (hours * 3600) + (min * 60) + (sec);									
						}								
					};
					
			   function attachActionEvents() {
					$('.action').on('click', function () {
						
						$('.sorterActions').children().removeClass('sc-button-active');
						$(this).addClass('sc-button-active')
						populateSoundList();
						
						var soundProperty = $(this).data('soundproperty');
						var lastSortedBy = $(this).data('lastsortedby');
						var type = $(this).data('type');

						switch (type) {
						case "string":
							soundList = _.sortBy(soundList, function (sound) {
								return sound[soundProperty];
							});
							soundList.reverse();
							break;
						case "date":
							soundList = _.sortBy(soundList, function (sound) {
								return sound[soundProperty];
							});
							break;
						case "int":
							soundList = _.sortBy(soundList, function (sound) {
								return Math.min(parseInt(sound[soundProperty], 10));
							});
							break;
						default:
							soundList = _.sortBy(soundList, function (sound) {
								return sound[soundProperty];
							});
						}

						if (lastSortedBy === 'min') {
							lastSortedBy = 'max'                                
						} else {
							lastSortedBy = 'min'
							soundList.reverse();
						}
						
						$('.action').data('lastsortedby', 'min'); // resets all to ensure that default sort is max desc when switching between sorts
						$(this).data('lastsortedby', lastSortedBy);
						
						var $searchList = $('.searchList');
						var $tagList = $('.tagsList__list');															
						var classToAttach;
						
						if ($searchList.length > 0){
							classToAttach = '.searchList';
						} else if ($tagList.length > 0){
							classToAttach = '.tagsList__list';
						}
						
						$(soundList).each(function () {
							var sound = this;								
																
							$(sound.element).prependTo(classToAttach);
															
							//$(sound.element).slideUp(500, function () {
							//    $(sound.element).prependTo(".searchList").slideDown(500);
							//});
						});												
					});						
				}
				
				function insertSortActions(){
				
					var searchResultsLoaded = setInterval(function () {												
						if ($('.searchList__item, .soundList__item').length) {									
								clearInterval(searchResultsLoaded);  
								$('.sorterActions').remove(); //clear out if they already exist;
								var actionTemplate =[
									'<div class="sorterActions sc-button-group">',
										'<span style="float: left; margin-right:1em;">Sort By</span>',
										'<button data-lastSortedBy="min" data-type="string" data-soundProperty="title"  	class="action sc-button sc-button-small sc-button-responsive sc-button-title">Title</button>',
										'<button data-lastSortedBy="min" data-type="date" 	data-soundProperty="time" 		class="action sc-button sc-button-small sc-button-responsive sc-button-date"><span class="sc-icon sc-icon-date sc-icon-medium"></span>Date</button>',
										'<button data-lastSortedBy="min" data-type="int" 	data-soundProperty="plays" 		class="action sc-button sc-button-small sc-button-responsive ">Plays</button>',
										'<button data-lastSortedBy="min" data-type="int" 	data-soundProperty="likes" 		class="action sc-button sc-button-small sc-button-responsive sc-button-like">Likes</button>',
										'<button data-lastSortedBy="min" data-type="int" 	data-soundProperty="reposts" 	class="action sc-button sc-button-small sc-button-responsive sc-button-repost">Reposts</button>',
										'<button data-lastSortedBy="min" data-type="int" 	data-soundProperty="comments" 	class="action sc-button sc-button-small sc-button-responsive sc-button-comments" ><span class="sc-icon sc-icon-comment sc-icon-medium"></span>Comments</button>',								
										'<button data-lastSortedBy="min" data-type="int" 	data-soundProperty="duration" 	class="action sc-button sc-button-small sc-button-responsive sc-button-duration"><span class="sc-icon sc-icon-duration sc-icon-medium"></span>Duration</button>',
										'<button data-lastSortedBy="min" data-type="string" data-soundProperty="tag" 		class="action sc-button sc-button-small sc-button-responsive sc-button-tag">Tag</button>',
									'</div>',
									'<hr />',
								].join().replace(new RegExp(",", "g"), '');
																		
								var $searchHeader = $('.search__header');
								var $tagsList = $('.tagsList__list');
								
								if($searchHeader.length > 0){
									$searchHeader.after(actionTemplate);		
								} else if($tagsList.length >0){
									$tagsList.before(actionTemplate);		
								};
								
								attachActionEvents();
							}
						}, 10);							
				}					
				
				function populateSoundList() {
					soundList.length = 0; //reset array incase user loaded more content
					$('.searchList__item,.soundList__item').each(function () {
						var sound = new Sound();									

						sound.element = this;
						sound.title = $(this).find('.soundTitle__title').text();
						sound.time = $(this).find('time').attr('datetime');
						sound.plays = $(this).find('.sc-ministats-plays').children().eq(1).text().replace(new RegExp(",", "g"), '');
						sound.likes = $(this).find('.sc-ministats-likes a').children().eq(1).text().replace(new RegExp(",", "g"), '');
						sound.reposts = $(this).find('.sc-ministats-reposts a').children().eq(1).text().replace(new RegExp(",", "g"), '');
						sound.comments = $(this).find('.sc-ministats-comments a').children().eq(1).text().replace(new RegExp(",", "g"), '');
						sound.setDuration( $(this).find('.timeIndicator__total').children().eq(1).text());
						sound.tag = $(this).find('.soundTitle__tag').text().toLowerCase().trim();
						
						if(sound.tag.length === 0) {
							// hack to sort sounds without a tag last
							sound.tag = 'zzzzzzz';
						}

						soundList.push(sound);																
					});					
				}
			});
		}
	}, 10);            
});