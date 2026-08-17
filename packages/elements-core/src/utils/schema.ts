import { stringifyCyclicJso } from '@netcracker/qubership-apihub-api-unifier';
import { getOriginalObject } from '@netcracker/qubership-apihub-apispec-view-elements-core';
import { hashCode } from '@netcracker/qubership-apihub-apispec-view-elements-core/utils/string';
import { JSONSchema7 } from 'json-schema';

export function schemaHashCode(schema: JSONSchema7): number {
  return hashCode(stringifyCyclicJso(getOriginalObject(schema)));
}
