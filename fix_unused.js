const fs = require('fs');
let content = fs.readFileSync('src/pages/risiko.tsx', 'utf-8');
content = content.replace(/const initialData: RiskRecord\[\] = \[\];\n?/g, '');
content = content.replace(/\bCopy\b,?/g, ''); // be careful with this!
fs.writeFileSync('src/pages/risiko.tsx', content, 'utf-8');
