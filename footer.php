	<footer class="footer">
		<div class="container">
			<div class="columns is-centered">
				<div class="column">
					<div class="footer__contact">
						<h3>FLS International</h3>
						<p>680 E Colorado Blvd Suite 180 Second Floor Pasadena, CA 91101</p>
						<p>(626) 795-2912</p>
						<p>info@fls.net</p>
					</div>
				</div>
				<div class="column">
					<div class="footer__info">
						<h3>Information</h3>

						<ul class="footer__info-links">
							<li>Home</li>
							<li>Locations</li>
							<li>FLS Level Correlations</li>
							<li>Programs</li>
							<li>BPPE Resources</li>
							<li>Academic Calendar</li>
						</ul>
					</div>
				</div>
				<div class="column">
					<div class="footer__affiliations">Affiliate links will go here</div>
				</div>
			</div>
		</div>
	</footer>
	<div class="footer footer__legal">
		<div class="container">
			<div class="columns is-centered">
				<div class="column">
					<p>Copyright © 2020 FLS International | Site Design & Development by <a href="https://akingdebased.github.io/" target="_blank"> Gabriel Gonzalvez</a></p>
				</div>
			</div>
		</div>
	</div>

	<?php if(is_front_page()): ?>
		<script type="text/javascript" src="//code.jquery.com/jquery-1.11.0.min.js"></script>
		<script type="text/javascript" src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
		<script type="text/javascript" src="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"></script>
		<script>
			$('.hero-body__carousel').slick({
				autoplay: true,
				draggable: false,
				// TODO: Weird outline borders appear when clicking on the carousel
				focusOnSelect: false
			});

			$('.fls__location-carousel').slick({
				infinite: true,
				slidesToShow: 3,
				slidesToScroll: 3,
				arrows: true,
			});

			console.log('carousels activated');
			console.log('new theme good');
		</script>
	<?php endif; ?>
	<?php wp_footer(); ?>
</body>

</html>
