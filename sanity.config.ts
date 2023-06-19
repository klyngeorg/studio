import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { defaultDesk } from './desks/default.js';
import { schemaTypes } from './schemas';

const isDevelopment = process.env.NODE_ENV === 'development';

const devPlugins = [
  deskTool({
    title: 'Admin Desk',
    name: 'admin-desk',
  }),
  visionTool(),
];

export default defineConfig({
  name: 'default',
  title: 'Klynge Næringsforening',

  projectId: '95rc74zt',
  dataset: 'production',

  plugins: [defaultDesk, ...(isDevelopment ? devPlugins : [])],

  schema: {
    types: schemaTypes,
  },
});
