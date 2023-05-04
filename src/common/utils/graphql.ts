import { GraphQLError, GraphQLFormattedError } from 'graphql';

interface CustomGraphQLFormattedError extends GraphQLFormattedError {
  code?: unknown;
  errorLocation: string;
}

const getErrorCode = (
  errorExtendsions:
    | {
        [key: string]: unknown;
      }
    | undefined,
) => {
  return errorExtendsions
    ? {
        code: (errorExtendsions?.stacktrace ?? [])[0].includes('typia')
          ? 'TypeGuardError'
          : errorExtendsions?.code,
      }
    : {};
};

export const customFormatError = (
  formattedError: GraphQLFormattedError,
  error: GraphQLError,
): GraphQLFormattedError => {
  const ErrorPath = [...(formattedError?.path ?? [])];

  const graphQLFormattedError: CustomGraphQLFormattedError = {
    message: error.message,
    errorLocation: `${ErrorPath.join(',')}`,
    ...getErrorCode(formattedError?.extensions),
  };
  return graphQLFormattedError;
};
