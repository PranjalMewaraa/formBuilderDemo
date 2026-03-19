import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';

function sanitizeFilePart(value) {
  return String(value).replace(/[^a-zA-Z0-9_-]/g, '-');
}

export async function generateSubmissionPdf({ formTitle, applicationNumber, data }) {
  const pdfDirectory = path.resolve('uploads', 'pdfs');
  fs.mkdirSync(pdfDirectory, { recursive: true });

  const fileName = `${sanitizeFilePart(applicationNumber)}.pdf`;
  const filePath = path.join(pdfDirectory, fileName);

  await new Promise((resolve, reject) => {
    const document = new PDFDocument({ margin: 48 });
    const stream = fs.createWriteStream(filePath);

    document.pipe(stream);

    document.fontSize(18).text(formTitle, { align: 'center' });
    document.moveDown(0.5);
    document.fontSize(12).text(`Application Number: ${applicationNumber}`);
    document.text(`Submitted On: ${new Date().toLocaleString('en-IN')}`);
    document.moveDown();

    Object.entries(data).forEach(([key, value]) => {
      const printableValue = Array.isArray(value)
        ? value.join(', ')
        : typeof value === 'object' && value !== null
          ? JSON.stringify(value)
          : String(value ?? '');

      document.font('Helvetica-Bold').text(key);
      document.font('Helvetica').text(printableValue || '-');
      document.moveDown(0.5);
    });

    document.end();

    stream.on('finish', resolve);
    stream.on('error', reject);
  });

  return filePath;
}
