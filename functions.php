<?php
/**
 * perfectday functions
 *
 * @package perfectday
 */


function perfectday_js_theme() {

    wp_enqueue_script( 'theme', get_stylesheet_directory_uri() . '/assets/js/script.js', array( 'jquery' ), null, true );

}
add_action( 'wp_enqueue_scripts', 'perfectday_js_theme', 300 );


function perfectday_css_theme() {

    wp_deregister_style('storefront-child-style');
    wp_register_style( 'theme',  get_stylesheet_directory_uri() . '/theme.css', array(), null, null );
    wp_enqueue_style( 'theme' );

}
add_action( 'wp_enqueue_scripts', 'perfectday_css_theme', 300 );

