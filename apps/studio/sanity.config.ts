import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'
import {media} from 'sanity-plugin-media'
import {blockStyles} from 'sanity-plugin-block-styles'

export default defineConfig({
  name: 'default',
  title: 'District Seoul',

  projectId: 'rwq1teez',
  dataset: 'production',

  plugins: [structureTool({structure}), visionTool(), media(), blockStyles()],

  schema: {
    types: schemaTypes,
  },
})
