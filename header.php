<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<title>FLS International</title>
		<link rel="shortcut icon" href="../images/fav_icon.png" type="image/x-icon">
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
		<link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
		<link rel="stylesheet" href="<?php echo get_bloginfo('template_directory'); ?>/css/bulma.min.css" />
		<link rel="stylesheet" type="text/css" href="<?php echo get_bloginfo('template_directory'); ?>/css/style.css">
		<?php if(is_front_page()): ?>
			<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.css" integrity="sha256-UK1EiopXIL+KVhfbFa8xrmAWPeBjMVdvYMYkTAEv/HI=" crossorigin="anonymous" />
			<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick-theme.min.css" integrity="sha256-4hqlsNP9KM6+2eA8VUT0kk4RsMRTeS7QGHIM+MZ5sLY=" crossorigin="anonymous" />
		<?php endif; ?>
		<?php wp_head(); ?>

		<style>
			html {
				/* TODO: Figure out what's applying a margin-top, and remove this */
				margin-top: 0 !important;
			}
		</style>
	</head>
	<body>
		<?php get_template_part('partials/navbar'); ?>

		<?php if (is_front_page()): ?> 
			<section class="hero is-link is-fullheight">
				<!-- TODO: _.template these carousel slides -->
				<div class="hero-body__carousel">
					<div class="hero-body__carousel-item">
						<div class="columns columns--hero is-centered">
							<div class="column is-one-third">
								<div class="hero__copy-container">
									<h2 class="subtitle hero__copy-title">FLS International</h2>
									<h1 class="hero__copy">
										ENGLISH LANGUAGE PROGRAMS, PATHWAYS & SPECIALTY TOURS
									</h1>
								</div>
							</div>
						</div>
					</div>
					<div class="hero-body__carousel-item">
						<div class="columns columns--hero is-centered">
							<div class="column is-one-third">
								<div class="hero__copy-container">
									<h2 class="subtitle hero__copy-title">FLS International</h2>
									<h1 class="hero__copy">
										ENGLISH LANGUAGE PROGRAMS, PATHWAYS & SPECIALTY TOURS
									</h1>
								</div>
							</div>
						</div>
					</div>
					<div class="hero-body__carousel-item">
						<div class="columns columns--hero is-centered">
							<div class="column is-one-third">
								<div class="hero__copy-container">
									<h2 class="subtitle hero__copy-title">FLS International</h2>
									<h1 class="hero__copy">
										ENGLISH LANGUAGE PROGRAMS, PATHWAYS & SPECIALTY TOURS
									</h1>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		<?php endif; ?>