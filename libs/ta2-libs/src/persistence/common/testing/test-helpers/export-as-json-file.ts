import { writeFile } from 'fs';
import { promisify } from 'util';

const writeFileAsync = promisify(writeFile);

export async function exportAsJsonFile(path: string, data: any): Promise<void> {
  const contents = JSON.stringify(data, null, 2);

  await writeFileAsync(path, contents);
}
