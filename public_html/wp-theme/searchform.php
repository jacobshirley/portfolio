<?php
/**
 * Template for displaying search forms in Jacob Shirley
 *
 * @package WordPress
 * @subpackage Twenty_Sixteen
 * @since Jacob Shirley 1.0
 */
?>

<form role="search" method="get" class="search-form" action="<?php echo esc_url( home_url( '/' ) ); ?>">
	<label>
		<span class="screen-reader-text"><?php echo _x( 'Search for:', 'label', 'jacobshirley' ); ?></span>
		<input type="search" class="search-field" placeholder="<?php echo esc_attr_x( 'Search &hellip;', 'placeholder', 'jacobshirley' ); ?>" value="<?php echo get_search_query(); ?>" name="s" />
	</label>
	<button type="submit" class="search-submit"><span class="screen-reader-text"><?php echo _x( 'Search', 'submit button', 'jacobshirley' ); ?></span></button>
</form>
