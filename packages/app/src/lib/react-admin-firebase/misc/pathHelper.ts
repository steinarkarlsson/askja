function join(...args: string[]) {
  return args
    .map((part, i) => {
      if (i === 0) {
        return part.trim().replace(/\/*$/g, '');
      } else {
        return part.trim().replace(/(^\/*|\/*$)/g, '');
      }
    })
    .filter((x) => x.length)
    .join('/');
}
export function getAbsolutePath(
  rootRef: undefined | string | (() => string),
  relativePath: string | null
): string {
  if (!rootRef) {
    return relativePath + '';
  }
  if (!relativePath) {
    throw new Error(
      'Resource name must be a string of length greater than 0 characters'
    );
  }
  const rootRefValue = typeof rootRef === 'string' ? rootRef : rootRef();
  const withSlashes = join('/', rootRefValue, '/', relativePath, '/');
  const slashCount = withSlashes.split('/').length - 1;
  if (slashCount % 2) {
    throw new Error(`The rootRef path must point to a "document"
    not a "collection"e.g. /collection/document/ or
    /collection/document/collection/document/`);
  }
  return withSlashes.slice(1, -1);
}

export function joinPaths(...args: string[]) {
  return join(...args);
}
