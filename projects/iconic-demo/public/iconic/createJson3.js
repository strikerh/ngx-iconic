const fs = require('fs');
const path = require('path');
const allIcons = require('./all_icons.json');

const rootDir = path.join(__dirname, '/svg');
const icons_obj = {};
const typeMapping = {
   'materialIcons': 'f',
   'materialIconsOutlined': 'o',
   'materialIconsRound': 'r',
   'materialIconsSharp': 's',
   'materialIconsTwoTone': 't'
};
const categoryMapping = {}
function main() {
  allIcons.forEach(icon => {
    categoryMapping[icon.category] = 1;
  })
  const categoryArr = Object.keys(categoryMapping);
  allIcons.forEach(icon => {
    icons_obj[icon.iconName] = `${typeMapping[icon.type]}|${categoryArr.findIndex((i)=>i === icon.category)}|${icon.version}|${icon.fileName.split('px.')[0]}`;
  })


  const obj=  {
    "typeMapping": {
      "f": "materialIcons",
      "o": "materialIconsOutlined",
      "r": "materialIconsRound",
      "s": "materialIconsSharp",
      "t": "materialIconsTwoTone"
    },
    categories: categoryArr,
    dictionary: ['type','category', 'version', 'fileName+px.svg' ],
    icons: icons_obj
  }

  fs.writeFileSync('all_icons_short.json', JSON.stringify(obj, null, 2));
}


main()



