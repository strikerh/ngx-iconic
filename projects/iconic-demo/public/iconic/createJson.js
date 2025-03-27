const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '/svg');

function processDirectory(dir) {
  const result = {};

  const categories = fs.readdirSync(dir);
  categories.forEach(category => {
    const categoryPath = path.join(dir, category);
    if (fs.statSync(categoryPath).isDirectory()) {
      result[category] = {};

      const icons = fs.readdirSync(categoryPath);
      icons.forEach(icon => {
        const iconPath = path.join(categoryPath, icon);
        if (fs.statSync(iconPath).isDirectory()) {
          result[category][icon] = {};

          const styles = fs.readdirSync(iconPath);
          styles.forEach(style => {
            const stylePath = path.join(iconPath, style);
            if (fs.statSync(stylePath).isDirectory()) {
              if (!result[category][icon][style]) {
                result[category][icon][style] = [];
              }

              const files = fs.readdirSync(stylePath);
              files.forEach(file => {
                const filePath = path.join(stylePath, file);
                if (fs.statSync(filePath).isFile()) {
                  result[category][icon][style].push({
                    fileName: file,
                    name: icon,
                    path: path.join('src', category, icon, style, file),
                    category: category,
                    type: style
                  });
                }
              });
            }
          });
        }
      });
    }
  });

  return result;
}

const output = processDirectory(rootDir);
fs.writeFileSync('directory_structure.json', JSON.stringify(output, null, 2));
