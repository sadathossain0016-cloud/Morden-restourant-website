# Simple, fast, robust static file web server in PowerShell
param (
    [int]$Port = 8080,
    [string]$Root = (Get-Location).Path
)

$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".htm"  = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".gif"  = "image/gif"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
    ".webp" = "image/webp"
    ".woff" = "font/woff"
    ".woff2"= "font/woff2"
    ".ttf"  = "font/ttf"
    ".otf"  = "font/otf"
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Prefixes.Add("http://127.0.0.1:$Port/")

try {
    $listener.Start()
    Write-Host "====================================================" -ForegroundColor Cyan
    Write-Host " L'Étoile Bistro - Local Development Server Running" -ForegroundColor Green
    Write-Host " URL: http://localhost:$Port" -ForegroundColor Yellow
    Write-Host " Root: $Root" -ForegroundColor Gray
    Write-Host " Press Ctrl+C in this terminal to stop the server." -ForegroundColor Gray
    Write-Host "====================================================" -ForegroundColor Cyan

    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        $rawUrl = $request.RawUrl.Split('?')[0]
        $decodedUrl = [System.Uri]::UnescapeDataString($rawUrl)
        
        if ($decodedUrl -eq "/" -or $decodedUrl -eq "") {
            $decodedUrl = "/index.html"
        }

        # Normalize relative path and prevent directory traversal
        $relative = $decodedUrl.TrimStart('/').Replace('/', [System.IO.Path]::DirectorySeparatorChar)
        $filePath = [System.IO.Path]::GetFullPath([System.IO.Path]::Combine($Root, $relative))

        # Security check: must be inside Root
        if (-not $filePath.StartsWith($Root, [System.StringComparison]::OrdinalIgnoreCase)) {
            $response.StatusCode = 403
            $bytes = [System.Text.Encoding]::UTF8.GetBytes("403 Forbidden")
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
            $response.Close()
            continue
        }

        if (Test-Path $filePath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
            $mime = if ($mimeTypes.ContainsKey($ext)) { $mimeTypes[$ext] } else { "application/octet-stream" }

            $response.ContentType = $mime
            $response.AddHeader("Access-Control-Allow-Origin", "*")
            $response.AddHeader("Cache-Control", "no-cache, no-store, must-revalidate")

            try {
                $fileBytes = [System.IO.File]::ReadAllBytes($filePath)
                $response.ContentLength64 = $fileBytes.Length
                $response.OutputStream.Write($fileBytes, 0, $fileBytes.Length)
                $response.StatusCode = 200
                Write-Host "200 $rawUrl ($($fileBytes.Length) bytes)" -ForegroundColor Green
            } catch {
                $response.StatusCode = 500
                $bytes = [System.Text.Encoding]::UTF8.GetBytes("500 Internal Server Error")
                $response.OutputStream.Write($bytes, 0, $bytes.Length)
                Write-Host "500 $rawUrl" -ForegroundColor Red
            }
        } else {
            $response.StatusCode = 404
            $bytes = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $decodedUrl")
            $response.ContentType = "text/plain; charset=utf-8"
            $response.OutputStream.Write($bytes, 0, $bytes.Length)
            Write-Host "404 $rawUrl" -ForegroundColor Yellow
        }

        $response.Close()
    }
} catch {
    Write-Host "Server error: $_" -ForegroundColor Red
} finally {
    if ($listener.IsListening) {
        $listener.Stop()
    }
    $listener.Close()
    Write-Host "Server stopped." -ForegroundColor Gray
}

