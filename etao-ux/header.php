<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta http-equiv="Content-Type"
	content="<?php bloginfo( 'html_type' ); ?>; charset=<?php bloginfo( 'charset' ); ?>" />
<meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="shortcut icon" href="http://ux.etao.com/favicon.ico" />
<title><?php hybrid_document_title(); ?></title>

<link rel="stylesheet" href="<?php echo get_stylesheet_uri(); ?>" 	type="text/css" />

<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />

<!--[if lt IE 7]>  
<style type="text/css">
  #site-title{ background:url(images/logo-ie.png) no-repeat scroll 0 0;}   
</style>  
<![endif]-->
<!--[if IE]>
   <script src="http://mued.etao.com/wp-content/themes/etao-ux/js/html5.js"></script>
<![endif]--> 
<?php //wp_head(); ?>

</head>

<body class="<?php hybrid_body_class(); ?>">
    
   <?php do_atomic( 'before_header' ); // origin_before_header ?>
   <header>	
		<?php do_atomic( 'open_header' ); // origin_open_header ?>
        <?php hybrid_site_title(); ?>                     
		<nav>
		   <?php get_template_part( 'menu', 'primary' ); // Loads the menu-primary.php template. ?>
		</nav>
		   <?php do_atomic( 'header' ); // origin_header ?>
		<?php do_atomic( 'close_header' ); // origin_close_header ?>
   </header>
	<?php do_atomic( 'after_header' ); // origin_after_header ?>			


	<?php do_atomic( 'open_body' ); // origin_open_body ?>
	
	
	
	
	
	<?php if(is_home()): 
	
	    if(function_exists('wp_slider')): wp_slider('etao-ux '); endif; 
      
	   endif;?>
     
  <div id="main" class="clearfix">
     <article>   
	
	  <?php do_atomic( 'before_main' ); // origin_before_main ?>	  

		<?php do_atomic( 'open_main' ); // origin_open_main ?>
