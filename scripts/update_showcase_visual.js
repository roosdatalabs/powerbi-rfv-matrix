const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const tempDir = path.join(__dirname, '../temp_extract');
const pbivizPath = path.join(__dirname, '../dist/roosRfvMatrixC82A8D124C704536BA3D66733D198070.1.0.0.0.pbiviz');
const tempZipPath = path.join(__dirname, '../dist/temp_package.zip');
const dest = path.join(__dirname, '../showcase/Matriz RFV - Showcase Roos Data Labs.Report/CustomVisuals/roosRfvMatrixC82A8D124C704536BA3D66733D198070/resources/roosRfvMatrixC82A8D124C704536BA3D66733D198070.pbiviz.json');

if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
}
if (fs.existsSync(tempZipPath)) {
    fs.unlinkSync(tempZipPath);
}

// Copia .pbiviz para .zip para o Expand-Archive aceitar
fs.copyFileSync(pbivizPath, tempZipPath);

// Expande arquivo zip
execSync(`powershell -Command "Expand-Archive -Path '${tempZipPath}' -DestinationPath '${tempDir}' -Force"`);

const srcJson = path.join(tempDir, 'roosRfvMatrixC82A8D124C704536BA3D66733D198070.pbiviz.json');

if (fs.existsSync(srcJson)) {
    fs.copyFileSync(srcJson, dest);
    console.log('Sucesso! Arquivo pbiviz.json atualizado no Showcase. Novo tamanho:', fs.statSync(dest).size);
} else {
    console.error('Arquivo nao encontrado dentro do pacote pbiviz:', srcJson);
}

if (fs.existsSync(tempDir)) fs.rmSync(tempDir, { recursive: true, force: true });
if (fs.existsSync(tempZipPath)) fs.unlinkSync(tempZipPath);
