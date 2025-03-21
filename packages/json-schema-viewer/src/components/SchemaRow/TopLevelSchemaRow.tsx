import { isRegularNode, RegularNode } from '@stoplight/json-schema-tree';
import { Box, Flex, HStack, Icon } from '@stoplight/mosaic';
import { useUpdateAtom } from 'jotai/utils';
import * as React from 'react';

import { COMBINER_NAME_MAP } from '../../consts';
import { useIsOnScreen } from '../../hooks/useIsOnScreen';
import { calculateChildrenToShow, isComplexArray } from '../../tree';
import { showPathCrumbsAtom } from '../PathCrumbs/state';
import { Description, getInternalSchemaError } from '../shared';
import { ChildStack } from '../shared/ChildStack';
import { NativeMenuAdapter } from '../shared/NativeMenuAdapter';
import { SchemaRow, SchemaRowProps } from './SchemaRow';
import { useChoices } from './useChoices';

export const TopLevelSchemaRow = ({
  schemaNode,
  skipDescription,
}: Pick<SchemaRowProps, 'schemaNode'> & { skipDescription?: boolean }) => {
  const { selectedChoice, setSelectedChoice, choices } = useChoices(schemaNode);
  const childNodes = React.useMemo(() => calculateChildrenToShow(selectedChoice.type), [selectedChoice.type]);
  const nestingLevel = 0;

  const nodeId = schemaNode.fragment?.['x-stoplight']?.id;

  const internalSchemaError = getInternalSchemaError(schemaNode);

  // regular objects are flattened at the top level
  if (isRegularNode(schemaNode) && isPureObjectNode(schemaNode)) {
    return (
      <>
        <ScrollCheck />
        {!skipDescription ? <Description value={schemaNode.annotations.description} /> : null}
        <ChildStack
          schemaNode={schemaNode}
          childNodes={childNodes}
          currentNestingLevel={nestingLevel}
          parentNodeId={nodeId}
        />
        {internalSchemaError.hasError && (
          <Icon title={internalSchemaError.error} color="danger" icon={['fas', 'exclamation-triangle']} size="sm" />
        )}
      </>
    );
  }

  if (isRegularNode(schemaNode) && choices.length > 1) {
    const combiner = isRegularNode(schemaNode) && schemaNode.combiners?.length ? schemaNode.combiners[0] : null;
    return (
      <>
        <ScrollCheck />
        <Description value={schemaNode.annotations.description} />

        <HStack spacing={3} pb={4}>
          <NativeMenuAdapter
            title={selectedChoice.title}
            onChange={event => {
              const choice = choices[event.target.value];
              setSelectedChoice(choice);
              event.target.value = 'default';
            }}
            menuItems={choices.map((choice, index) => ({
              id: index,
              title: choice.title,
            }))}
          />

          {combiner !== null ? (
            <Flex alignItems="center" color="muted" fontSize="base">
              {`(${COMBINER_NAME_MAP[combiner]})`}
            </Flex>
          ) : null}
        </HStack>

        {childNodes.length > 0 ? (
          <ChildStack
            schemaNode={schemaNode}
            childNodes={childNodes}
            currentNestingLevel={nestingLevel}
            parentNodeId={nodeId}
          />
        ) : null}
      </>
    );
  }

  if (isComplexArray(schemaNode) && isPureObjectNode(schemaNode.children[0])) {
    return (
      <>
        <ScrollCheck />
        <Description value={schemaNode.annotations.description} />

        <Box fontFamily="mono" fontWeight="semibold" fontSize="base" pb={4}>
          array of:
        </Box>

        {childNodes.length > 0 ? (
          <ChildStack
            schemaNode={schemaNode}
            childNodes={childNodes}
            currentNestingLevel={nestingLevel}
            parentNodeId={nodeId}
          />
        ) : null}
      </>
    );
  }

  return (
    <>
      <ScrollCheck />
      <SchemaRow schemaNode={schemaNode} nestingLevel={nestingLevel} />
    </>
  );
};

function ScrollCheck() {
  const elementRef = React.useRef<HTMLDivElement>(null);

  const isOnScreen = useIsOnScreen(elementRef);
  const setShowPathCrumbs = useUpdateAtom(showPathCrumbsAtom);
  React.useEffect(() => {
    setShowPathCrumbs(!isOnScreen);
  }, [isOnScreen, setShowPathCrumbs]);

  return <div ref={elementRef} />;
}

function isPureObjectNode(schemaNode: RegularNode) {
  return schemaNode.primaryType === 'object' && schemaNode.types?.length === 1;
}
