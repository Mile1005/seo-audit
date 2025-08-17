# Accessibility Test Page

To test the Chrome extension overlay:

1. Open chrome-extension/test-pages/test-a11y.html in your browser:
   - You can use the file:// URL (drag and drop into Chrome, or use Ctrl+O > Open File...)
   - Or run a simple file server in this directory:
     - Python 3: python -m http.server 8080
     - Node.js: npx serve .
2. With the extension loaded, visit the test page and activate the overlay.
3. You should see badges and issues for: missing alt, multiple H1s, skipped heading, missing main, unlabeled inputs, low contrast, empty links, bad tabindex, etc.
