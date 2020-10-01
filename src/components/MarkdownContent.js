import React from 'react';
// import PropTypes from 'prop-types';
import showdown from 'showdown';

const MarkdownContent = ({ content, className, classMap }) => {
	const bindings = Object.keys(classMap).map(key => ({
		type: 'output',
		regex: new RegExp(`<${key}(.*)>`, 'g'),
		replace: `<${key} className="${classMap[key]}" $1>`,
	}));

	const converter = new showdown.Converter({
		extensions: [...bindings],
	});

	converter.setOption('noHeaderId', true);

	return (
		<div
			className={className}
			dangerouslySetInnerHTML={{ __html: converter.makeHtml(content) }}
		/>
	);
};

// TODO: ProptTypes? Necessary?
// MarkdownContent.propTypes = {
// 	content: PropTypes.string,
// 	className: PropTypes.string,
// };

export default MarkdownContent;
