<?php

	$timeline = (get_posts_by_month(
		[
			'numberposts' => -1,
			'post_type' => 'post',
			'tax_query' => [
				[
				'taxonomy' => 'tipos_de_publicacao',
				'terms' => 'timeline',
				'field' => 'slug'
				]
			],
		'order' => 'ASC',
		'orderby' => 'date'
		]
	)); 

?>

<div class="timeline-container">
    <section>
        <h2 class="title-with-graphics title-transform-uppercase"><span>Linha do tempo</span> <span class="line"></span></h2>
    </section>
	<ul class="dates">
		<?php
		foreach($timeline['months'] as $key => $month): ?>
			<li class="date" data-index="<?= $key ?>">
				<span>|</span><?= $month ?>
			</li>
		<?php endforeach; ?>
	</ul>
	<div class="items">
		<?= $timeline['slider'] ?>
	</div>
</div>
