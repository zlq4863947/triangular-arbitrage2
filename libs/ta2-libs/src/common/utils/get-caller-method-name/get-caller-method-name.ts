export function getCallerMethodName(stack: string): string {
  const infoLines = stack.split('\n')[2].trim().replace('.<computed>', '').split('.');
  let mothedLine = infoLines[infoLines.length - 2];
  if (mothedLine === 'service') {
    mothedLine = infoLines[infoLines.length - 3];
  }

  return mothedLine.split(' ')[0];
}
