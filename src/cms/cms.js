import CMS from 'netlify-cms-app';

import InPersonProgramsDynamicPagesPreview from './preview-templates/InPersonProgramsPagePreview';
import LocationsDynamicPagesPreview from './preview-templates/LocationsDynamicPagesPreview';
import SpecialtyToursDynamicPages from './preview-templates/SpecialtyToursDynamicPagesPreview';
import OnlineProgramsDynamicPages from './preview-templates/OnlineProgramPagesPreview';

CMS.registerPreviewTemplate(
	'inPersonProgramsDynamicPages',
	InPersonProgramsDynamicPagesPreview
);
CMS.registerPreviewTemplate(
	'locationsDynamicPages',
	LocationsDynamicPagesPreview
);
CMS.registerPreviewTemplate(
	'specialtyToursDynamicPages',
	SpecialtyToursDynamicPages
);
CMS.registerPreviewTemplate(
	'onlineProgramsDynamicPages',
	OnlineProgramsDynamicPages
);

// TODO: Figure out styles at some point
// https://www.netlifycms.org/docs/beta-features/#raw-css-in-registerpreviewstyle
// CMS.registerPreviewStyle('../styles/test.css');

console.log(
	'%c custom templates registered',
	'color: green; font-size: 14px; font-weight: 400'
);
