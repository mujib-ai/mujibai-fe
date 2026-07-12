export type DocNavItem = {
  key: string;
  href: string;
};

export type DocNavSection = {
  key: string;
  items: DocNavItem[];
};

export type DocParagraphBlock = { type: 'p'; text: string };
export type DocItemBlock = { type: 'item'; term: string; desc: string };
export type DocStepBlock = { type: 'step'; text: string };
export type DocCalloutBlock = {
  type: 'callout';
  calloutType: 'info' | 'warning' | 'danger';
  title?: string;
  text: string;
};
export type DocCodeBlockData = {
  type: 'code';
  language?: string;
  filename?: string;
  code: string;
};
export type DocCodeTabsBlockData = {
  type: 'codeTabs';
  tabs: { label: string; language?: string; code: string }[];
};

export type DocBlock =
  | DocParagraphBlock
  | DocItemBlock
  | DocStepBlock
  | DocCalloutBlock
  | DocCodeBlockData
  | DocCodeTabsBlockData;

export type DocRichSection = {
  title: string;
  blocks: DocBlock[];
};

export type DocPageContent = {
  eyebrow: string;
  title: string;
  intro: string;
  sections: Record<string, DocRichSection>;
};
