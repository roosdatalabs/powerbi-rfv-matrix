Add-Type -AssemblyName System.IO.Compression.FileSystem
$pbivizPath = "e:\DEV\dashboards-powerbi\custom-visuals\tecdisaRfvMatrix\dist\roosRfvMatrixC82A8D124C704536BA3D66733D198070.1.0.0.0.pbiviz"
$destPath = "e:\DEV\dashboards-powerbi\custom-visuals\tecdisaRfvMatrix\showcase\Matriz RFV - Showcase Roos Data Labs.Report\CustomVisuals\roosRfvMatrixC82A8D124C704536BA3D66733D198070\resources\roosRfvMatrixC82A8D124C704536BA3D66733D198070.pbiviz.json"

$zip = [System.IO.Compression.ZipFile]::OpenRead($pbivizPath)
foreach ($entry in $zip.Entries) {
    Write-Host "Found entry: $($entry.FullName)"
    if ($entry.Name.EndsWith(".pbiviz.json")) {
        $stream = $entry.Open()
        $destFile = [System.IO.File]::Create($destPath)
        $stream.CopyTo($destFile)
        $destFile.Close()
        $stream.Close()
        Write-Host "Extraido com sucesso para $destPath. Tamanho: $((Get-Item $destPath).Length)"
    }
}
$zip.Dispose()
