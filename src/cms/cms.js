import CMS from 'netlify-cms-app';

import HomePagePreview from './preview-templates/HomePagePreview';
import ProgramsPagePreview from './preview-templates/ProgramsPagePreview';
import ApplicationLandingPreview from './preview-templates/ApplicationLandingPreview';

CMS.registerPreviewTemplate('home', HomePagePreview);
CMS.registerPreviewTemplate('programs', ProgramsPagePreview);
// TODO: Why isn't the datepicker styling properly?
CMS.registerPreviewTemplate('application-landing', ApplicationLandingPreview);

CMS.registerPreviewStyle('../styles/test.css');

console.log('pls?');
console.log(
	'%c custom templates registered',
	'color: green; font-size: 14px; font-weight: 400'
);
