const fs = require('fs');
const path = require('path');

function walkDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walkDir(file));
    } else {
      if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walkDir('src');
let updatedCount = 0;
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  // Reemplazar ocurrencias de cadenas simples como '/images/...' a template strings
  let newContent = content.replace(/'\/images\//g, '`${process.env.NEXT_PUBLIC_BASE_PATH || \'\'}/images/');
  // Arreglar el final del string reemplazado (de '' a ``) 
  // Esto es un poco riesgoso con regex, pero la mayoría de las veces el string termina con '
  // Vamos a usar una regex que captura todo hasta el cierre del string
  newContent = newContent.replace(/`\$\{process\.env\.NEXT_PUBLIC_BASE_PATH \|\| ''\}\/images\/([^']*)'/g, '`${process.env.NEXT_PUBLIC_BASE_PATH || \'\'}/images/$1`');
  
  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    console.log(`Updated ${file}`);
    updatedCount++;
  }
});
console.log(`Total updated: ${updatedCount}`);
