import { NodeTypeAsyncOperation } from '@stoplight/elements-core/types';

export type TableOfContentsProps = {
  tree: TableOfContentsItem[];
  activeId: string;
  Link: CustomLinkComponent;
  maxDepthOpenByDefault?: number;
  externalScrollbar?: boolean;
  onLinkClick?(): void;
};

export type CustomLinkComponent = React.ComponentType<{
  to: string;
  className?: string;
  children: React.ReactNode;
}>;

export type TableOfContentsItem = TableOfContentsDivider | TableOfContentsGroupItem;

export type TableOfContentsDivider = {
  title: string;
};

export type TableOfContentsGroupItem =
  | TableOfContentsGroup
  | TableOfContentsNodeGroup
  | TableOfContentsNode
  | TableOfContentsExternalLink;

export type TableOfContentsGroup = {
  title: string;
  items: TableOfContentsGroupItem[];
};

export type TableOfContentsExternalLink = {
  title: string;
  url: string;
};

export type TableOfContentsNode<
  T = 'http_service' | 'http_operation' | 'model' | 'article' | 'overview' | NodeTypeAsyncOperation,
> = {
  id: string;
  slug: string;
  title: string;
  type: T;
  meta: string;
  version?: string;
  deprecated?: boolean;
};

export type TableOfContentsNodeGroup = TableOfContentsNode<'http_service'> & TableOfContentsGroup;
