<?php
/**
 * Index Template
 *
 * This is the default template.  It is used when a more specific template can't be found to display
 * posts.  It is unlikely that this template will ever be used, but there may be rare cases.
 *
 * @package eato-ux
 * @subpackage Template
 */

get_header(); // Loads the header.php template. ?>


	<?php do_atomic( 'before_content' ); // origin_before_content ?>	

		<?php do_atomic( 'open_content' ); // origin_open_content ?>			
             
			<?php
			if (have_posts ()) :
				?>

			  <?php while ( have_posts() ) : the_post(); ?>

				<?php do_atomic( 'before_entry' ); // origin_before_entry ?>

					<div id="post-<?php the_ID(); ?>"	class="<?php hybrid_entry_class(); ?>">										
							
									
					   <?php echo apply_atomic_shortcode( 'entry_title', '[entry-title]' ); ?>								
                           
					   <?php echo apply_atomic_shortcode( 'byline', '<div class="post-meta">' . __( 'by [entry-author] Date [entry-published] About [entry-terms taxonomy="category" before=""] [entry-comments-link] [entry-edit-link before=" &middot; "]', 'origin' ) . '</div>' ); ?>
	
					   <div class="entry-summary">
							
						 <?php do_atomic( 'open_entry' ); // origin_open_entry ?>

					    <?php /* if ( current_theme_supports( 'get-the-image' ) ) {
								
							if ( is_sticky ( $post->ID ) ) {								
									 get_the_image( array( 'meta_key' => 'Thumbnail', 'size' => 'single-thumbnail', 'image_class' => 'featured' ) );									
							} else {									
								   	 get_the_image( array( 'meta_key' => 'Thumbnail', 'size' => 'single-thumbnail', 'image_class' => 'featured' ) );									
						    }
								
					    }*/ ?>
							
					    <?php the_content(); ?>
								
						<?php wp_link_pages( array( 'before' => '<p class="page-links">' . __( 'Pages:', 'origin' ), 'after' => '</p>' ) ); ?>
						
						
						<?php echo apply_atomic_shortcode( 'entry_meta', '<div class="entry-meta"><a class="more-link" href="' . get_permalink() . '">' . __( '阅读更多', hybrid_get_textdomain() ) . '</a></div>' ); ?>
									
					 </div>

					<?php do_atomic( 'close_entry' ); // origin_close_entry ?>

				</div>

				<?php do_atomic( 'after_entry' ); // origin_after_entry ?>

			<?php endwhile; ?>

		<?php else : ?>

			<?php get_template_part( 'loop-error' ); // Loads the loop-error.php template. ?>

		<?php endif; ?>
			
			<!-- loop nav for etao -->
		<?php get_template_part( 'loop-nav' ); // Loads the loop-nav.php template. ?>
           
      </article>           
		

		<?php do_atomic( 'close_content' ); // origin_close_content ?>	
      
	<?php do_atomic( 'after_content' ); // origin_after_content ?>
    
<?php get_footer(); // Loads the footer.php template. ?>
