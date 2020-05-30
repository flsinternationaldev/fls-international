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
        <!-- <link rel="stylesheet" href="https://unpkg.com/bulma-modal-fx/dist/css/modal-fx.min.css" /> -->
        <?php wp_head(); ?>
    </head>
    <body>
        <?php if (is_front_page()): ?> 
            <section class="hero is-info is-medium is-bold">
                <div class="hero-head">
                    <?php get_template_part('partials/navbar'); ?>
                </div>
                <div class="hero-body">
                    <div class="container has-text-centered">
                        <h1 class="title">
                            English Language Programs, Pathways & Specialty Tours
                        </h1>
                        <h2 class="subtitle">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </h2>
                    </div>
                </div>
            </section>
        <?php else : ?>
            <?php get_template_part('partials/navbar'); ?>
        <?php endif; ?>