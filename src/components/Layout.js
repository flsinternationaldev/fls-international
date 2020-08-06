import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import Footer from './footer/Footer';
import Navbar from './navbar/Navbar';
import Metadata from './Metadata';
// import { withPrefix } from 'gatsby';

// TODO: Properly implement the content of the <head> tag
// <!DOCTYPE html>
// <html>
//   <head>
//     <meta charset="utf-8" />
//     <meta http-equiv="X-UA-Compatible" content="IE=edge" />
//     <meta name="viewport" content="width=device-width, initial-scale=1" />
//     <title>FLS International</title>
//     <link
//       rel="shortcut icon"
//       href="../images/fav_icon.png"
//       type="image/x-icon"
//     />
//     <!-- TODO: Do we really need all of animate.css? -->
//     <link
//       rel="stylesheet"
//       href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css"
//     />
//     <!-- TODO: Transfer this font over to the WordPress implementation -->
//     <link
//       href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&display=swap"
//       rel="stylesheet"
//     />
//     <link rel="stylesheet" href="../css/bulma.min.css" />
//     <link rel="stylesheet" href="../css/icons.css" />
//     <link rel="stylesheet" type="text/css" href="../css/style.css" />
//     <!-- Only necessary on front page -->
//     <link
//       rel="stylesheet"
//       href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.9.0/slick.min.css"
//       integrity="sha256-UK1EiopXIL+KVhfbFa8xrmAWPeBjMVdvYMYkTAEv/HI="
//       crossorigin="anonymous"
//     />

//     <style>
//       html {
//         /* TODO: Figure out what's applying a margin-top, and remove this */
//         margin-top: 0 !important;
//       }
//     </style>

const TemplateWrapper = ({ children, isHome }) => {
	const { title, description } = Metadata();

	return (
		<Fragment>
			<Helmet>
				<html lang="en" />
				<title>{title}</title>
				<meta name="description" content={description} />

				{/* <link
					rel="apple-touch-icon"
					sizes="180x180"
					href={`${withPrefix('/')}img/apple-touch-icon.png`}
				/>
				<link
					rel="icon"
					type="image/png"
					href={`${withPrefix('/')}img/favicon-32x32.png`}
					sizes="32x32"
				/>
				<link
					rel="icon"
					type="image/png"
					href={`${withPrefix('/')}img/favicon-16x16.png`}
					sizes="16x16"
				/>

				<link
					rel="mask-icon"
					href={`${withPrefix('/')}img/safari-pinned-tab.svg`}
					color="#ff4400"
				/>
				<meta charSet="utf-8" /> */}

				{/* TODO: Set up all the social media meta content */}
				{/* <meta property="og:type" content="business.business" />
				<meta property="og:title" content={title} />
				<meta property="og:url" content="/" />
				<meta
					property="og:image"
					content={`${withPrefix('/')}img/og-image.jpg`}
				/> */}
			</Helmet>
			<Navbar isHome={isHome} />
			{children}
			<Footer />
		</Fragment>
	);
};

export default TemplateWrapper;
