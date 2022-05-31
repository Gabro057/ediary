import { DocumentNode, GraphQLSchema } from 'graphql';
import { ReferencedFieldsForType } from 'apollo-reporting-protobuf';
export declare type ReferencedFieldsByType = Record<string, ReferencedFieldsForType>;
export declare function calculateReferencedFieldsByType({ document, schema, resolvedOperationName, }: {
    document: DocumentNode;
    resolvedOperationName: string | null;
    schema: GraphQLSchema;
}): ReferencedFieldsByType;
//# sourceMappingURL=referencedFields.d.ts.map