<?php get_header(); ?>
<div class="error-404">
    <div class="gif">
        
    </div>
    <button onclick="redirectToHome()"><?php echo __('back to homepage', 'ninja'); ?></button>

</div>
<?php get_footer(); ?>

<script>
function redirectToHome() {
    window.location.href = "<?php echo home_url(); ?>";
}
</script>