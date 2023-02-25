import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { Logo } from './components/logo.js';
import { schemaTypes } from './schemas/index.js';

export default defineConfig({
  name: 'default',
  title: 'Klynge Næringsforening',
  logo: Logo,

  projectId: '95rc74zt',
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
});
