import type { ReactNode } from 'react';

import type { DocBlock, DocRichSection } from '@/features/docs/types';
import { renderRichText } from '@/features/docs/lib/renderRichText';

import { Callout } from './Callout';
import { CodeBlock } from './CodeBlock';
import { CodeTabs } from './CodeTabs';
import { DocHeading } from './DocHeading';
import { DocList, DocOrderedList, DocParagraph, DocSection } from './DocText';

type BlockGroup =
  | { type: 'item-group'; blocks: Extract<DocBlock, { type: 'item' }>[] }
  | { type: 'step-group'; blocks: Extract<DocBlock, { type: 'step' }>[] }
  | Exclude<DocBlock, { type: 'item' | 'step' }>;

function groupBlocks(blocks: DocBlock[]): BlockGroup[] {
  const groups: BlockGroup[] = [];

  for (const block of blocks) {
    const last = groups[groups.length - 1];

    if (block.type === 'item') {
      if (last?.type === 'item-group') {
        last.blocks.push(block);
      } else {
        groups.push({ type: 'item-group', blocks: [block] });
      }
    } else if (block.type === 'step') {
      if (last?.type === 'step-group') {
        last.blocks.push(block);
      } else {
        groups.push({ type: 'step-group', blocks: [block] });
      }
    } else {
      groups.push(block);
    }
  }

  return groups;
}

function DocBlockGroup({ group }: { group: BlockGroup }): ReactNode {
  switch (group.type) {
    case 'p':
      return <DocParagraph>{renderRichText(group.text)}</DocParagraph>;
    case 'item-group':
      return (
        <DocList>
          {group.blocks.map((item, i) => (
            <li key={i}>
              <span className="font-semibold text-foreground">
                {renderRichText(item.term)}
              </span>{' '}
              — {renderRichText(item.desc)}
            </li>
          ))}
        </DocList>
      );
    case 'step-group':
      return (
        <DocOrderedList>
          {group.blocks.map((step, i) => (
            <li key={i}>{renderRichText(step.text)}</li>
          ))}
        </DocOrderedList>
      );
    case 'callout':
      return (
        <Callout type={group.calloutType} title={group.title}>
          {renderRichText(group.text)}
        </Callout>
      );
    case 'code':
      return (
        <CodeBlock
          code={group.code}
          language={group.language}
          filename={group.filename}
        />
      );
    case 'codeTabs':
      return <CodeTabs tabs={group.tabs} />;
    default:
      return null;
  }
}

export function DocRichSectionView({ section }: { section: DocRichSection }) {
  return (
    <DocSection>
      <DocHeading level={2}>{section.title}</DocHeading>
      {groupBlocks(section.blocks).map((group, i) => (
        <DocBlockGroup key={i} group={group} />
      ))}
    </DocSection>
  );
}
