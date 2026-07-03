const fs = require('fs');

let content = fs.readFileSync('src/pages/risiko.tsx', 'utf-8');

// 1. Fix the setRecords bug in fetchRecords
const findSync = `await supabase.from('manajemen_risiko').insert(payload);
            }
          }`;

const replaceSync = `await supabase.from('manajemen_risiko').insert(payload);
            }
            setRecords(localSaved);
          }`;
content = content.replace(findSync, replaceSync);

// 2. Remove sqlToCopy
const sqlToCopyRegex = /const sqlToCopy = \`CREATE TABLE IF NOT EXISTS[\s\S]*?WITH CHECK \(true\);\`;/;
content = content.replace(sqlToCopyRegex, '');

// 3. Remove handleCopySQL
const handleCopyRegex = /const handleCopySQL = \(\) => {[\s\S]*?};\s*/;
content = content.replace(handleCopyRegex, '');

// 4. Update the supabaseError UI to just show the error message
const errorUIRegex = /\{supabaseError && \([\s\S]*?<\/motion\.div>\s*\)\}/;
const newErrorUI = `{supabaseError && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 bg-red-50 border border-red-200 text-red-900 rounded-xl p-4 shadow-sm"
          >
            <h3 className="font-bold text-base flex items-center gap-2"><Database size={18} /> Database Error</h3>
            <p className="text-sm mt-1">{supabaseError}</p>
          </motion.div>
        )}`;
content = content.replace(errorUIRegex, newErrorUI);

// 5. Remove 'copied' and 'setCopied' state
content = content.replace(/const \[copied, setCopied\] = useState\(false\);\n?\s*/g, '');

fs.writeFileSync('src/pages/risiko.tsx', content, 'utf-8');
console.log("risiko.tsx fixed!");
