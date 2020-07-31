import CMS from 'netlify-cms';

import HomePagePreview from './preview-templates/HomePagePreview';

console.log('register me');
CMS.registerPreviewTemplate('home', HomePagePreview);
