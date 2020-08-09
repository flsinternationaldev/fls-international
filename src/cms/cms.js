import CMS from 'netlify-cms-app';

import HomePagePreview from './preview-templates/HomePagePreview';
import ProgramsPagePreview from './preview-templates/ProgramsPagePreview';

console.log('go!');
CMS.registerPreviewTemplate('home', HomePagePreview);
CMS.registerPreviewTemplate('programs', ProgramsPagePreview);
