$ErrorActionPreference = "Stop"
$base = Split-Path -Parent $MyInvocation.MyCommand.Path
$raw = Join-Path $base "index_raw.html"
$out = Join-Path $base "index.html"

$html = Get-Content $raw -Raw -Encoding UTF8

# Remove tracking / consent scripts
$removePatterns = @(
  '(?s)<!--Didomi Cookies Consent Notice start.*?<!-- Didomi Cookies Consent Notice end for astonmartin.com -->',
  '(?s)<!-- Google Tag Manager -->.*?<!-- End Google Tag Manager -->',
  '(?s)<noscript><iframe src="//www\.googletagmanager\.com.*?</noscript>\s*',
  '(?s)<script>window\.dataLayer = window\.dataLayer \|\| \[\]; window\.dataLayer\.push\(\{.*?\}\);</script>',
  '(?s)<script type="didomi/javascript".*?</script>\s*',
  '(?s)<script id="bing-map-control".*?</script>\s*',
  '(?s)<script>\s*window\.addEventListener\(''message''.*?;\s*</script>\s*'
)
foreach ($pattern in $removePatterns) {
  $html = $html -replace $pattern, ''
}
$html = [regex]::Replace($html, '<script>[^<]*GTM-NRHBD4Q[^<]*</script>\s*', '')

# Fix broken HTML / scripts from source
$html = $html -replace '(?s)\s*<video class="video " playsinline\s*>\s*<source type="video/mp4"[^>]*/>\s*</video>\s*', ''
$html = $html -replace '(?s)<script>\s*\(\(\) => \{\s*const p = document\.querySelector\(''\.preloader-v4''\).*?</script>\s*', ''
$html = $html -replace '(?s)<script>\s*\(\(\) => \{\s*const cursor = document\.querySelector.*?TO ROTATE`;\s*\}\)\(\);\s*</script>\s*', ''
$html = $html -replace '(?s)<script>\s*\(\(\) => \{\s*const interval = setInterval.*?clearInterval\(interval\);\s*\}\s*, 100\);\s*\}\)\(\);\s*</script>\s*', ''

# Local asset paths
$html = $html -replace 'https://www\.astonmartin\.com/theme/10\.3\.49\.0\.1/assets/astonmartin/css/astonmartinv2\.css', 'assets/css/astonmartinv2.css'
$html = $html -replace 'https://www\.astonmartin\.com/theme/10\.3\.49\.0\.1/assets/astonmartin/css/font\.css', 'assets/css/font.css'
$html = $html -replace 'https://www\.astonmartin\.com/theme/10\.3\.49\.0\.1/assets/astonmartin/images/icons/favicon\.ico', 'assets/images/icons/favicon.ico'
$html = $html -replace 'https://www\.astonmartin\.com/theme/10\.3\.49\.0\.1/assets/astonmartin/images/icons/spinner\.png', 'assets/images/icons/spinner.png'
$html = $html -replace 'https://www\.astonmartin\.com/theme/10\.3\.49\.0\.1/assets/astonmartin/images/svg-sprite\.svg', 'assets/images/svg-sprite.svg'
$html = $html -replace 'data-svg-url="https://www\.astonmartin\.com/theme/10\.3\.49\.0\.1/assets/astonmartin/images/svg-sprite\.svg"', 'data-svg-url="assets/images/svg-sprite.svg"'

# Fix relative media URLs
$html = $html -replace '="/-/media/', '="https://www.astonmartin.com/-/media/'
$html = $html -replace "='/-/media/", "='https://www.astonmartin.com/-/media/"
$html = $html -replace '="/en-us', '="https://www.astonmartin.com/en-us'
$html = $html -replace "='/en-us", "='https://www.astonmartin.com/en-us"
$html = $html -replace ' href="/en-us', ' href="https://www.astonmartin.com/en-us'
$html = $html -replace ' href="/en-gb', ' href="https://www.astonmartin.com/en-gb'
$html = $html -replace ' href="/de"', ' href="https://www.astonmartin.com/de"'
$html = $html -replace ' href="/ja"', ' href="https://www.astonmartin.com/ja"'
$html = $html -replace ' href="/fr"', ' href="https://www.astonmartin.com/fr"'
$html = $html -replace ' href="/en-au"', ' href="https://www.astonmartin.com/en-au"'
$html = $html -replace ' href="/zh-cn"', ' href="https://www.astonmartin.com/zh-cn"'
$html = $html -replace ' href="/en"', ' href="https://www.astonmartin.com/en"'

# Remove external Aston Martin JS bundles (cause 404 API errors locally)
$html = $html -replace '(?s)\s*<script nomodule async defer type="text/javascript" src="https://www\.astonmartin\.com/theme/10\.3\.49\.0\.1/assets/astonmartin/js/app\.bundle\.js"></script>\s*', ''
$html = $html -replace '(?s)\s*<script async defer type="module" src="https://www\.astonmartin\.com/theme/10\.3\.49\.0\.1/assets/astonmartin/mjs/app\.bundle\.js"></script>\s*', ''
$html = $html -replace '(?s)\s*<script async defer type="module" src="assets/mjs/app\.bundle\.js"></script>\s*', ''
$html = $html -replace '(?s)\s*<script src="assets/js/clone-bootstrap\.js"></script>\s*', ''

$inject = @"

    <link rel="stylesheet" href="assets/css/clone-fix.css" media="all">
    <script>
      (function () {
        function setDocHeight() {
          document.documentElement.style.setProperty('--doc-height', window.innerHeight + 'px');
          document.documentElement.style.setProperty('--slide-delay', '8000ms');
        }
        setDocHeight();
        window.addEventListener('resize', setDocHeight);
      })();
    </script>
"@
$html = $html -replace '(</head>)', "$inject`n`$1"

$scripts = @"

    <script src="assets/js/clone-bootstrap.js"></script>
"@
$html = $html -replace '(</body>)', "$scripts`n`$1"

Set-Content -Path $out -Value $html -Encoding UTF8 -NoNewline
Write-Host "Built index.html ($((Get-Item $out).Length) bytes)"
