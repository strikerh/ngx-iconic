const fs = require('fs');
const path = require('path');
const current_versions = require('./update/current_versions.json');

const rootDir = path.join(__dirname, '/svg');

const icons_arr = []; //flat array
const icons2 = {};
const icons3 = {};
const icons4 = {};

// Mapping for icon types
const typeMapping = {
  'materialicons': 'materialIcons',
  'materialiconsoutlined': 'materialIconsOutlined',
  'materialiconsround': 'materialIconsRound',
  'materialiconssharp': 'materialIconsSharp',
  'materialiconstwotone': 'materialIconsTwoTone'
};

// Function to process each file entry
function processFileEntry(fullPath, relativePath, parts) {

  const type = typeMapping[parts[3]] || parts[3];
  const iconName = parts[2];
  const fileName = parts[4];
  const category = parts[1];
  const folder = `${parts[3]}_${parts[2]}_${parts[1]}`;


  if (!icons2[iconName]) {
    icons2[iconName] = {};
    icons2[iconName][type] = {path: relativePath, category: category, type: type, file: [fileName], folder: folder};

  } else {
    if (fileName !== '24px.svg' || fileName !== '20x.svg') {
      console.log(fileName)
    }
    if (!icons2[iconName][type]   /*icons2[iconName].folder === folder*/) {
      // console.log('--', icons2[iconName][type].folder, folder);
      icons2[iconName][type] = {path: relativePath, category: category, type: type, file: [fileName], folder: folder};
    }

  }

  if (!icons3[type]) {
    icons3[type] = {};
  }
  if (!icons3[type][iconName]) {
    icons3[type][iconName] = {};
  }
  icons3[type][iconName] = relativePath;
}
function prepareIconsArray(fullPath, relativePath, parts) {
  const type = typeMapping[parts[3]] || parts[3];
  const iconName = parts[2];
  const fileName = parts[4];
  const category = parts[1];
  const folder = `${parts[3]}_${parts[2]}_${parts[1]}`;
  // Get version from current_versions.json using category and iconName
  const versionKey = `${category}::${iconName}`;
  const version = current_versions[versionKey] || 0; // Default to 0 if not found
                            // https://fonts.gstatic.com/s/i/materialicons/<icon-name>/v1/24px.svg
  const onlinePath = `https://fonts.gstatic.com/s/i/${type.toLowerCase()}/${iconName}/v${version}/${fileName}`;

  icons_arr.push({
    type,iconName, fileName, category, path: relativePath.replace('svg/',''), folder,  version, onlinePath
  })
}
let iconsByCategory =  ''
function prepareIconsObjs() {
  // Get unique categories
  const categories = [...new Set(icons_arr.map(icon => icon.category))].sort();

  // Build the type definition string
  iconsByCategory = categories.map(category => {
    // Get all icons for this category
    const categoryIcons = icons_arr
      .filter(icon => icon.category === category)
      // Remove duplicates based on iconName
      .filter((icon, index, self) =>
        index === self.findIndex(i => i.iconName === icon.iconName)
      )
      .sort((a, b) => a.iconName.localeCompare(b.iconName));

    // Create the type definition for this category
    const iconsList = categoryIcons
      .map(icon => `"${icon.iconName}": Icon`)
      .join(', ');

    return `"${category}": {${iconsList}}`;
  }).join(',\n  ');
}


// Function to walk through directories and process files
function walkDir(dir) {
  const entries = fs.readdirSync(dir, {withFileTypes: true});
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath);
    } else if (entry.isFile() && path.extname(entry.name) === '.svg') {
      const relativePath = path.relative(__dirname, fullPath).split(path.sep).join('/');
      const parts = relativePath.split('/');
      // processFileEntry(fullPath, relativePath, parts);
      prepareIconsArray(fullPath, relativePath, parts);

    }
  }
}

walkDir(rootDir);
prepareIconsObjs();

const iconsNames = `'${[...new Set(icons_arr.map(icon => icon.iconName))].sort().join("' | '")}'`;
const iconsCategory = `'${[...new Set(icons_arr.map(icon => icon.category))].sort().join("' | '")}'`;

console.log(icons_arr);
const tsContent = `

export type IconNames = ${iconsNames};
export type IconTypes = 'materialIcons' | 'materialIconsOutlined' | 'materialIconsRound' | 'materialIconsSharp' | 'materialIconsTwoTone'
export type CategoryTypes = ${iconsCategory};

export type Icon = {
 type: IconTypes,
 iconName: IconNames,
 fileName: string,
 category: CategoryTypes,
 path: string,
 folder: string,
 version: string,
 onlinePath: string
};

export type iconsByCategory = {
  ${iconsByCategory}
};
export const allIcons2: { [key in IconNames]: any } = ${JSON.stringify(icons2, null, 2)};
export const allIcons3: { [key in IconTypes]: any } = ${JSON.stringify(icons3, null, 2)};

export function getIconPath(name: IconTypes): string | undefined {
  return allIcons[name];
}
`;

fs.writeFileSync('icons.ts', tsContent);
