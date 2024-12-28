import { useSearchPhrase } from '@stoplight/elements/containers/API';
import {
  ExportButtonProps,
  Logo,
  ParsedDocs,
  RoutingProps,
  SidebarLayout,
  TableOfContents,
} from '@stoplight/elements-core';
import { IServer } from '@stoplight/elements-core/utils/http-spec/IServer';
import { Flex, Heading } from '@stoplight/mosaic';
import { NodeType } from '@stoplight/types';
import { SchemaViewMode } from 'json-schema-viewer';
import * as React from 'react';
import { Link, Redirect, useLocation } from 'react-router-dom';

import { ServiceNode } from '../../utils/oas/types';
import { computeAPITree, findFirstNodeSlug, isInternal } from './utils';

type SidebarLayoutProps = {
  serviceNode: ServiceNode;
  logo?: string;
  hideTryIt?: boolean;
  hideSchemas?: boolean;
  hideInternal?: boolean;
  hideExport?: boolean;
  exportProps?: ExportButtonProps;
  tryItCredentialsPolicy?: 'omit' | 'include' | 'same-origin';
  tryItCorsProxy?: string;
  router?: RoutingProps['router'];
  schemaViewMode?: SchemaViewMode;
  proxyServer?: IServer;
};

export const APIWithSidebarLayout: React.FC<SidebarLayoutProps> = ({
  serviceNode,
  logo,
  hideTryIt,
  hideSchemas,
  hideInternal,
  hideExport,
  exportProps,
  tryItCredentialsPolicy,
  tryItCorsProxy,
  router,
  schemaViewMode,
  proxyServer,
}) => {
  const container = React.useRef<HTMLDivElement>(null);
  const searchPhrase = useSearchPhrase();
  const tree = React.useMemo(
    () => computeAPITree(serviceNode, { hideSchemas, hideInternal, searchPhrase }),
    [serviceNode, hideSchemas, hideInternal, searchPhrase],
  );
  const location = useLocation();
  const { pathname } = location;
  const isRootPath = !pathname || pathname === '/';
  let node = isRootPath ? serviceNode : serviceNode.children.find(child => child.uri === pathname);
  const isHashRouter = router === 'hash';

  const layoutOptions = React.useMemo(
    () => ({
      hideTryIt: hideTryIt,
      hideExport: hideExport || node?.type !== NodeType.HttpService,
      schemaViewMode: schemaViewMode,
    }),
    [hideTryIt, hideExport, node?.type, schemaViewMode],
  );

  if (!node) {
    // Redirect to the first child if node doesn't exist
    const firstSlug = findFirstNodeSlug(tree);

    if (isHashRouter) {
      node = serviceNode;
    } else if (firstSlug) {
      return <Redirect to={firstSlug} />;
    }
  }

  if (hideInternal && node && isInternal(node)) {
    return <Redirect to="/" />;
  }

  const handleTocClick = () => {
    if (container.current) {
      container.current.scrollIntoView();
    }
  };

  const sidebar = (
    <>
      <Flex ml={4} mb={5} alignItems="center">
        {logo ? (
          <Logo logo={{ url: logo, altText: 'logo' }} />
        ) : (
          serviceNode.data.logo && <Logo logo={serviceNode.data.logo} />
        )}
        <Heading size={4}>{serviceNode.name}</Heading>
      </Flex>
      <Flex flexGrow flexShrink overflowY="auto" direction="col">
        <TableOfContents tree={tree} activeId={pathname} Link={Link} onLinkClick={handleTocClick} />
      </Flex>
    </>
  );

  return (
    <SidebarLayout ref={container} sidebar={sidebar}>
      {node && (
        <ParsedDocs
          key={pathname}
          uri={pathname}
          node={node}
          nodeTitle={node.name}
          layoutOptions={layoutOptions}
          location={location}
          exportProps={exportProps}
          tryItCredentialsPolicy={tryItCredentialsPolicy}
          tryItCorsProxy={tryItCorsProxy}
          proxyServer={proxyServer}
        />
      )}
    </SidebarLayout>
  );
};