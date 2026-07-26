function markerCount(source, marker) {
  return source.split(marker).length - 1;
}

export function replaceManagedBlock(source, name, content) {
  const start = `<!-- ${name}:start -->`;
  const end = `<!-- ${name}:end -->`;
  const startCount = markerCount(source, start);
  const endCount = markerCount(source, end);

  if (startCount !== 1 || endCount !== 1) {
    throw new Error(`Expected exactly one managed marker pair for ${name}; found ${startCount} start and ${endCount} end markers.`);
  }

  const startIndex = source.indexOf(start);
  const endIndex = source.indexOf(end, startIndex + start.length);
  if (endIndex < startIndex) {
    throw new Error(`Invalid managed marker order for ${name}.`);
  }

  const before = source.slice(0, startIndex + start.length);
  const after = source.slice(endIndex);
  return `${before}\n${content.trim()}\n${after}`;
}
