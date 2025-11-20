#!/bin/bash

echo "Testing hreflang implementation..."

# Test homepage
echo "\n=== Testing Homepage ==="
curl -s https://www.aiseoturbo.com/ | grep -o '<link[^>]hreflang[^>]>' | head -10

# Test French homepage
echo "\n=== Testing French Homepage ==="
curl -s https://www.aiseoturbo.com/fr | grep -o '<link[^>]hreflang[^>]>' | head -10

# Check for trailing slashes
echo "\n=== Checking for trailing slashes in hreflang ==="
curl -s https://www.aiseoturbo.com/ | grep 'hreflang' | grep -o 'href="[^"]*/"' && echo "⚠️ Found trailing slashes!" || echo "✅ No trailing slashes"

# Check HTML lang attribute
echo "\n=== Checking HTML lang attributes ==="
echo "English page:"
curl -s https://www.aiseoturbo.com/ | grep -o '<html[^>]lang="[^"]"'

echo "French page:"
curl -s https://www.aiseoturbo.com/fr | grep -o '<html[^>]lang="[^"]"'

echo "German page:"
curl -s https://www.aiseoturbo.com/de | grep -o '<html[^>]lang="[^"]"'