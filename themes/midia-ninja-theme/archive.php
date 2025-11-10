<?php

/**
 * The template for displaying archive pages
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 */

get_header();
?>

<div class="index-wrapper">
	<div class="container">
		<div class="row">

			<div class="infos">
				<div class="info">
					<?php if ($main_category): ?>
						<span class="category-<?= $main_category->slug ?>">
							<a href="<?= get_category_link($main_category->term_id) ?>"><?= $main_category->name ?></a>
						</span>
					<?php endif; ?>
					<?php foreach ($categories as $category): ?>
						<?php if ($category->term_id !== $main_category->term_id): ?>
							<span class="category-<?= $category->slug ?>">
								<a href="<?= get_category_link($category->term_id) ?>"><?= $category->name ?></a>
							</span>
						<?php endif; ?>
					<?php endforeach; ?>
				</div>
			</div><!-- .infos -->

			<main class="content col-md-9">
				<div class="posts">

					<?php while (have_posts()) : the_post(); ?>
						<?php get_template_part('template-parts/content/post'); ?>
					<?php endwhile; ?>
				</div>
				<?php get_template_part('template-parts/content/pagination'); ?>
			</main>

			<aside class="col-md-3">
				<?php dynamic_sidebar('sidebar-posts') ?>
			</aside>
		</div>
	</div>
</div>


<?php get_footer(); ?>
