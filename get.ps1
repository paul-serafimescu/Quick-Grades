$action = $args[0]
write-host (Invoke-WebRequest https://localhost:5001/$action -UseBasicParsing).Content