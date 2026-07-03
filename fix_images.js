const fs = require('fs');

function replaceImages(filePath, imports) {
  let content = fs.readFileSync(filePath, 'utf-8');
  
  if (!content.includes('import Image from \'next/image\'')) {
    content = content.replace(/(import .*?\n)/, `$1import Image from 'next/image';\n`);
  }

  // Specific replacements for IKPDocument.tsx
  if (filePath.includes('IKPDocument.tsx')) {
    content = content.replace(
      /<img\s+src=\{formData\.ttdPembuatBase64\}\s+alt="Tangan Pembuat Laporan"\s+className="max-w-full max-h-full object-contain"\s+\/>/g,
      `<Image src={formData.ttdPembuatBase64} alt="Tangan Pembuat Laporan" fill className="object-contain" referrerPolicy="no-referrer" />`
    );
    content = content.replace(
      /<img\s+src=\{formData\.ttdPenerimaBase64\}\s+alt="Tangan Penerima Laporan"\s+className="max-w-full max-h-full object-contain"\s+\/>/g,
      `<Image src={formData.ttdPenerimaBase64} alt="Tangan Penerima Laporan" fill className="object-contain" referrerPolicy="no-referrer" />`
    );
  }

  // Specific replacements for IKPHistory.tsx
  if (filePath.includes('IKPHistory.tsx')) {
    content = content.replace(
      /<img src=\{viewData\.fullFormData\?\.pembuatSignature\} alt="Tanda Tangan Pembuat" className="h-24 mx-auto" style=\{\{ mixBlendMode: 'multiply' \}\} \/>/g,
      `<div className="relative h-24 w-full mx-auto"><Image src={viewData.fullFormData?.pembuatSignature} alt="Tanda Tangan Pembuat" fill className="object-contain" style={{ mixBlendMode: 'multiply' }} referrerPolicy="no-referrer" /></div>`
    );
    content = content.replace(
      /<img src=\{viewData\.fullFormData\?\.penerimaSignature\} alt="Tanda Tangan Penerima" className="h-24 mx-auto" style=\{\{ mixBlendMode: 'multiply' \}\} \/>/g,
      `<div className="relative h-24 w-full mx-auto"><Image src={viewData.fullFormData?.penerimaSignature} alt="Tanda Tangan Penerima" fill className="object-contain" style={{ mixBlendMode: 'multiply' }} referrerPolicy="no-referrer" /></div>`
    );
  }

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`Updated ${filePath}`);
}

replaceImages('src/components/ikp/IKPDocument.tsx');
replaceImages('src/components/ikp/IKPHistory.tsx');
