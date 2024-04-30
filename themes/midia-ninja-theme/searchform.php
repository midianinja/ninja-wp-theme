<form id="searchform" role="search" method="get" class="searchform" action="<?php echo home_url('/'); ?>">
	<div>
		<span class="screen-reader-text"><?php echo _x('Search for:', 'label') ?></span>
		<input type="text" class="search-field"
			placeholder="<?php echo esc_attr_x('What are you looking for?', 'placeholder') ?>"
			value="<?php echo get_search_query() ?>" name="s"
			title="<?php echo esc_attr_x('Search for:', 'label') ?>" />

		<input type="submit" class="search-submit" value="<?php echo esc_attr_x('Search', 'submit button') ?>" />
	</div>
</form>