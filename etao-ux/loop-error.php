<?php
/**
 * Loop Error Template
 *
 * Displays an error message when no posts are found.
 *
 * @package Origin
 * @subpackage Template
 */
?>
	<div id="post-0" class="<?php hybrid_entry_class(); ?>">

		<div class="entry-content">

			<p><?php _e( '您要搜索的文章不存在！', 'origin' ); ?></p>

		</div><!-- .entry-content -->

	</div><!-- .hentry .error -->