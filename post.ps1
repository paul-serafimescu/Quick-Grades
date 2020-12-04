$action = $args[0]
$Body = @{
    value = 97.2
    class = "Science"
    description = "even easier!"
    creatorName = "John Smith"
}
$json = $Body | ConvertTo-Json

$headers = @{
    "Content-Type" = "application/json"
    "Accept" = "application/json"
}

add-type @"
    using System.Net;
    using System.Security.Cryptography.X509Certificates;
    public class TrustAllCertsPolicy : ICertificatePolicy {
        public bool CheckValidationResult(
            ServicePoint srvPoint, X509Certificate certificate,
            WebRequest request, int certificateProblem) {
            return true;
        }
    }
"@
[System.Net.ServicePointManager]::CertificatePolicy = New-Object TrustAllCertsPolicy

write-host (Invoke-WebRequest https://localhost:5001/$action -Headers $headers -Body $json -Method 'POST' -UseBasicParsing).Content