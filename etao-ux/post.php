<?php
/**
 * Post Template
 *
 * This is the default post template.  It is used when a more specific template can't be found to display
 * singular views of the 'post' post type.
 *
 * @package etao-ux
 * @subpackage Template
 */

get_header(); // Loads the header.php template. ?>

	<?php do_atomic( 'before_content' ); // origin_before_content ?>

	
		<?php do_atomic( 'open_content' ); // origin_open_content ?>
		

			<?php if ( have_posts() ) : ?>

				<?php while ( have_posts() ) : the_post(); ?>

					<?php do_atomic( 'before_entry' ); // origin_before_entry ?>

					<div id="post-<?php the_ID(); ?>" class="<?php hybrid_entry_class(); ?>">										
							
									
					   <?php echo apply_atomic_shortcode( 'entry_title', '[entry-title]' ); ?>								
                           
					   <?php echo apply_atomic_shortcode( 'byline', '<div class="post-meta">' . __( 'by [entry-author] Date [entry-published] About [entry-terms taxonomy="category" before=""] [entry-comments-link] [entry-edit-link before=" &middot; "]', 'origin' ) . '</div>' ); ?>
	
					   <div class="entry-summary">
							
						 <?php do_atomic( 'open_entry' ); // origin_open_entry ?>
							
					    <?php the_content(); ?>
								
						<?php wp_link_pages( array( 'before' => '<p class="page-links">' . __( 'Pages:', 'origin' ), 'after' => '</p>' ) ); ?>
								
					 </div>

					<?php do_atomic( 'after_entry' ); // origin_after_entry ?>

					<?php get_sidebar( 'after-singular' ); // Loads the sidebar-after-singular.php template. ?>

					<?php do_atomic( 'after_singular' ); // origin_after_singular ?>
					
					
					<?php get_template_part( 'loop-nav' ); // Loads the loop-nav.php template. ?>

					
					
					
					
					<?php comments_template( '/comments.php', true ); // Loads the comments.php template. ?>

				<?php endwhile; ?>

			<?php endif; ?>

		

		<?php do_atomic( 'close_content' ); // origin_close_content ?>

		

	</article><!-- #content -->

	<?php do_atomic( 'after_content' ); // origin_after_content ?>

<?php get_footer(); // Loads the footer.php template. ?>
