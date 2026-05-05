const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:3000/proposition', { waitUntil: 'networkidle' });
  
  const pdfPath = path.join(process.env.HOME, 'Desktop', 'Palm-dOr-Dakhla-Devis-PD-2026-01.pdf');
  
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
    printBackground: true
  });
  
  console.log(`✅ PDF généré: ${pdfPath}`);
  await browser.close();
})().catch(err => {
  console.error('Erreur:', err);
  process.exit(1);
});
