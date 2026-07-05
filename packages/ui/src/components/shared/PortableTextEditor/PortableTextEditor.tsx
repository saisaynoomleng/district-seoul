import React, { useState } from 'react';

import {
  defineSchema,
  EditorProvider,
  PortableTextEditable,
  RenderStyleFunction,
  type PortableTextBlock,
} from '@portabletext/editor';
import { EventListenerPlugin } from '@portabletext/editor/plugins';
import { Bounded } from '../Bounded';
import { Toolbar } from './Toolbar';

export const PortableTextEditor = (): React.JSX.Element => {
  const [value, setValue] = useState<PortableTextBlock[]>([]);

  return (
    <Bounded as="div" size="full">
      <EditorProvider initialConfig={{ schemaDefinition, initialValue: value }}>
        <EventListenerPlugin
          on={(e) => {
            if (e.type === 'mutation') {
              setValue(e.value as PortableTextBlock[]);
            }
          }}
        />
        <Toolbar />
        <PortableTextEditable
          className="border border-brand-black-800 dark:border-brand-black-600 indent-2 py-4 rounded-sm focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-brand-primary-600 outline-none"
          renderStyle={renderStyle}
        />
      </EditorProvider>
    </Bounded>
  );
};

const schemaDefinition = defineSchema({
  decorators: [{ name: 'strong' }, { name: 'em' }, { name: 'underline' }],
  styles: [{ name: 'h1' }, { name: 'h2' }],
  annotations: [],
  lists: [],
  inlineObjects: [],
  blockObjects: [],
});

const renderStyle: RenderStyleFunction = (props) => {
  switch (props.schemaType.name) {
    case 'h1': {
      return <h1>{props.children}</h1>;
    }

    case 'h2': {
      return <h2>{props.children}</h2>;
    }

    default:
      return <>{props.children}</>;
  }
};
