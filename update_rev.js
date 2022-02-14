var fs = require('fs');

(async () => {
  try {
    const data = await fs.promises.readFile('package.json');
    let metadata = JSON.parse(data);
    console.log(`old version: ${metadata.version}`);
    let versions = metadata.version.split('.');
    metadata.version = `${versions[0]}.${versions[1]}.${String(
      Number(versions[2]) + 1
    )}`;
    await Promise.all([
      fs.promises.writeFile('package.json', JSON.stringify(metadata, null, 2)),
      fs.promises.writeFile(
        'src/version.json',
        JSON.stringify({ version: metadata.version })
      ),
    ]);
    console.log(`new version: ${metadata.version}`);
  } catch (err) {
    console.error(err);
  }
})();
