import { graphql, useStaticQuery } from 'gatsby';

const Metadata = () => {
	const { site } = useStaticQuery(
		graphql`
			query METADATA_QUERY {
				site {
					siteMetadata {
						title
						description
					}
				}
			}
		`
	);

	return site.siteMetadata;
};

export default Metadata;
