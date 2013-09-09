Sound Cloud Sorter
================

Chrome Extension adding sorting options to the search results.
[Chrome Extension Page](https://chrome.google.com/webstore/detail/soundcloud-sorter/nligpjaegfdmckodpadnlhpbjimpiclp)

Currently can sort by

| Sounds       | Users           | Groups  |
| ------------- |-------------| -----|
| Title      | User Name| Group Name|
| Date      | Sounds| Sounds  |
| Plays  | Followers |    Followers |
| Likes  | Online Status|    Join Status |
| Reposts  | Subscription Type|   |
| Comments  | Follow Status|   |
| Tag  | |   |

	
Works best with the Sounds search page. If there are any bugs or feature requests, submit an issue.

Thanks to [Swader](https://github.com/Swader/ChromeSkel_a) for the chrome extension skeleton.

v0.3 release 2013-09-08

    + major overhaul of codebase, should allow for easier extensibility
    + added sorting to user profile tabs, ie following, followers, sets, likes, comments, groups
    + sorting actions should be relevant to current set of items
        - ie when looking at a list of users/groups, sort actions for sounds are not shown
    + removed sorting by Duration, looks like sound cloud changed how they present this information
        - need to come up with alternative way of retrieving that data, if at all possible.
    + minor performance improvements

v0.2 release 2013-08-29

	+ added sorting by duration and tag
	+ added more icons, and updated button styles. 
		- now when you click on a button an active style is added so user knows which sorting they using.
	+ sort actions added to tags page
	+ updated screenshots

v0.1 release 2013-08-25

	+ added basic sorting of tilte, date, play count, likes, reposts, and comments
	+ clicking on a button will sort by maximum value descending, so largest values are up top
		- for date this is changed to show earliest dates up top

