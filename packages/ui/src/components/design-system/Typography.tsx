import React from 'react';
import { Bounded, SectionTitle } from '../shared';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '#components/ui/table';

import { MdTextFields } from 'react-icons/md';
import { IoMdChatboxes, IoMdSettings } from 'react-icons/io';
import { IoNewspaper, IoPencil, IoStorefront } from 'react-icons/io5';
import { TbCategoryFilled } from 'react-icons/tb';
import { RiCustomSize, RiPagesFill } from 'react-icons/ri';
import { FaUsersCog } from 'react-icons/fa';
import { GiSkateboard, GiStairsGoal } from 'react-icons/gi';
import { SiNike } from 'react-icons/si';
import { VscCollection } from 'react-icons/vsc';
import { PiFlagBannerFoldFill } from 'react-icons/pi';
import { GrWorkshop } from 'react-icons/gr';
import { Separator } from '../ui';

const Icons = [
  <MdTextFields />,
  <IoMdChatboxes />,
  <IoMdSettings />,
  <IoNewspaper />,
  <IoPencil />,
  <IoStorefront />,
  <TbCategoryFilled />,
  <RiCustomSize />,
  <RiPagesFill />,
  <FaUsersCog />,
  <GiSkateboard />,
  <GiStairsGoal />,
  <SiNike />,
  <VscCollection />,
  <PiFlagBannerFoldFill />,
  <GrWorkshop />,
];

const HEADING = [
  {
    name: 'Heading 1',
    weight: 'bold',
    size: '72px',
    lineHeight: '1',
  },
  {
    name: 'Heading 2',
    weight: 'bold',
    size: '60px',
    lineHeight: '1',
  },
];

const HIERARCHY = [
  {
    name: 'Heading 1',
    weight: 'bold',
    size: '72px',
    lineHeight: '1',
  },
  {
    name: 'Heading 2',
    weight: 'bold',
    size: '60px',
    lineHeight: '1',
  },
  {
    name: 'Body 1',
    weight: 'regular',
    size: '16px',
    lineHeight: '1.5',
  },
  {
    name: 'Body 2',
    weight: 'regular',
    size: '14px',
    lineHeight: '1.5',
  },
  {
    name: 'Body 3',
    weight: 'regular',
    size: '8px',
    lineHeight: '1.5',
  },
];

const BODY = [
  {
    name: 'Body 1',
    weight: 'regular',
    size: '16px',
    lineHeight: '1.5',
  },
  {
    name: 'Body 2',
    weight: 'regular',
    size: '14px',
    lineHeight: '1.5',
  },
  {
    name: 'Body 3',
    weight: 'regular',
    size: '8px',
    lineHeight: '1.5',
  },
];

const Headers = [...new Set(HIERARCHY.flatMap((h) => Object.keys(h)))];

export const Typography = (): React.JSX.Element => {
  return (
    <Bounded className="space-y-12">
      <div className="grid grid-cols-2">
        <div className="flex flex-col gap-y-3">
          <SectionTitle className="font-bold" label1="typography" />
          <p className="text-brand-black-600 dark:text-brand-black-500">
            Typography is part of the overall visual language you use to
            communicate with your users. Just like the visual elements of color,
            form and pattern, typography can set a mood, set a tone and present
            a product the way you want it perceived.
          </p>
        </div>

        <div className="flex justify-center items-center">
          <div className="brandBoxShadow border-4 rounded-lg">
            <p className="text-fs-900 p-8 font-semibold">Aa</p>
          </div>
        </div>
      </div>

      <SectionTitle label1="Typeface" />

      <div className="grid grid-cols-2">
        <div className="flex flex-col gap-y-1 font-heading font-bold text-fs-500">
          <p className="text-brand-black-600">Title/Headings</p>
          <p className="font-bold text-fs-700">Amantic SC</p>
          <p className="tracking-widest">abcdefghijklmnopqrstuvwxyz</p>
          <p className="tracking-widest">abcdefghijklmnopqrstuvwxyz</p>
          <p>1234567890</p>
        </div>

        <div className="flex flex-col gap-y-1 font-body text-fs-500">
          <p className="text-brand-black-600">Body/Text</p>
          <p className="font-bold text-fs-700">Josefin Sans</p>
          <p className="uppercase tracking-widest">
            abcdefghijklmnopqrstuvwxyz
          </p>
          <p className="lowercase tracking-widest">
            abcdefghijklmnopqrstuvwxyz
          </p>
          <p>1234567890</p>
        </div>
      </div>

      <Separator />

      <SectionTitle label1="Hierarchy" />

      <Table>
        <TableHeader>
          <TableRow>
            {Headers.map((header, i) => (
              <TableHead
                key={i}
                className="capitalize font-semibold text-fs-500"
              >
                {header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {HEADING.map((h) => (
            <TableRow key={h.name} className="font-heading">
              <TableCell style={{ fontSize: h.size }}>{h.name}</TableCell>
              <TableCell className="font-body uppercase">{h.weight}</TableCell>
              <TableCell className="font-body uppercase">{h.size}</TableCell>
              <TableCell className="font-body uppercase">
                {h.lineHeight}
              </TableCell>
            </TableRow>
          ))}

          {BODY.map((b) => (
            <TableRow key={b.name} className="font-body">
              <TableCell style={{ fontSize: b.size }}>{b.name}</TableCell>
              <TableCell className="font-body uppercase">{b.weight}</TableCell>
              <TableCell className="font-body uppercase">{b.size}</TableCell>
              <TableCell className="font-body uppercase">
                {b.lineHeight}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Separator />

      <div className="space-y-4">
        <SectionTitle label1="Icons" />
        <div className="grid grid-cols-12 border-2 p-4 place-items-center gap-6 rounded-lg">
          {Icons.map((icon) => (
            <i className="border border-brand-black-300 p-3">{icon}</i>
          ))}
        </div>
      </div>
    </Bounded>
  );
};
