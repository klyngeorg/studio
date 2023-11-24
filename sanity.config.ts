import { visionTool } from '@sanity/vision';
import { groqdPlaygroundTool } from 'groqd-playground';
import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { defaultDesk } from './desks/default.js';
import { schemaTypes } from './schemas';

function isDevMode() {
  const devInSearch = window ? window.location.search.includes('dev') : false;
  const devInLocalStorage = localStorage
    ? localStorage.getItem('devMode') === 'true'
    : false;
  const devModeEnabled = devInLocalStorage || devInSearch;
  return devModeEnabled;
}

const isDevelopment = process.env.NODE_ENV === 'development';
const showDevTools = isDevelopment || isDevMode();

const devPlugins = [
  deskTool({
    title: 'Admin Desk',
    name: 'admin-desk',
  }),
  visionTool(),
  groqdPlaygroundTool(),
];

export default defineConfig({
  name: 'default',
  title: 'Klynge Næringsforening',

  projectId: '95rc74zt',
  dataset: 'production',

  plugins: [defaultDesk, ...(showDevTools ? devPlugins : [])],

  schema: {
    types: schemaTypes,
  },
});
