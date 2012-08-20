<?php
/**
 * Search Template
 *
 * The search template is loaded when a visitor uses the search form to search for something
 * on the site.
 *
 * @package Origin
 * @subpackage Template
 */

get_header(); // Loads the header.php template. ?>

	<?php do_atomic( 'before_content' ); // origin_before_content ?>

	

		<?php do_atomic( 'open_content' ); // origin_open_content ?>

	

			<?php if ( have_posts() ) : ?>

				<?php while ( have_posts() ) : the_post(); ?>

					<?php do_atomic( 'before_entry' ); // origin_before_entry ?>

						<div id="post-<?php the_ID(); ?>" class="<?php hybrid_entry_class(); ?>">

							<?php do_atomic( 'open_entry' ); // origin_open_entry ?>

							<?php echo apply_atomic_shortcode( 'entry_title', '[entry-title]' ); ?>								
                           
					   <?php echo apply_atomic_shortcode( 'byline', '<div class="post-meta">' . __( 'by [entry-author] Date [entry-published] About [entry-terms taxonomy="category" before=""] [entry-comments-link] [entry-edit-link before=" &middot; "]', 'origin' ) . '</div>' ); ?>
	
							<div class="entry-summary">
								
								<?php the_excerpt(); ?>
								
								<?php wp_link_pages( array( 'before' => '<p class="page-links">' . __( 'Pages:', 'origin' ), 'after' => '</p>' ) ); ?>
								
								
								<?php echo apply_atomic_shortcode( 'entry_meta', '<div class="entry-meta"><a class="more-link" href="' . get_permalink() . '">' . __( '阅读更多', hybrid_get_textdomain() ) . '</a></div>' ); ?>
						
							</div><!-- .entry-summary -->

							<?php do_atomic( 'close_entry' ); // origin_close_entry ?>

						</div>

					<?php do_atomic( 'after_entry' ); // origin_after_entry ?>

				<?php endwhile; ?>

			<?php else : ?>

				<?php get_template_part( 'loop-error' ); // Loads the loop-error.php template. ?>

			<?php endif; ?>

		</article><!-- .hfeed -->

		<?php do_atomic( 'close_content' ); // origin_close_content ?>

		<?php get_template_part( 'loop-nav' ); // Loads the loop-nav.php template. ?>


	<?php do_atomic( 'after_content' ); // origin_after_content ?>

<?php get_footer(); // Loads the footer.php template. ?>