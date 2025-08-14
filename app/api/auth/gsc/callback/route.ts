import { NextRequest, NextResponse } from "next/server";
import { handleGscCallback } from "../../../../../lib/gsc";

export async function GET(req: NextRequest) {
  try {
    console.log("GSC Callback: Starting callback processing");
    const { searchParams } = new URL(req.url);
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const error = searchParams.get("error");

    console.log("GSC Callback: Received params:", { 
      hasCode: !!code, 
      hasState: !!state, 
      error: error,
      state: state 
    });

    if (error) {
      console.error("GSC Callback: OAuth error from Google:", error);
      return new NextResponse(`
        <!DOCTYPE html>
        <html>
        <head><title>GSC Auth Error</title></head>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage({ type: 'GSC_AUTH_ERROR', error: '${error}' }, '*');
            }
            window.close();
          </script>
          <p>Authentication failed: ${error}</p>
        </body>
        </html>
      `, { headers: { 'Content-Type': 'text/html' } });
    }

    if (!code || !state) {
      console.error("GSC Callback: Missing code or state:", { code: !!code, state: !!state });
      return new NextResponse(`
        <!DOCTYPE html>
        <html>
        <head><title>GSC Auth Error</title></head>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage({ type: 'GSC_AUTH_ERROR', error: 'missing_code_or_state' }, '*');
            }
            window.close();
          </script>
          <p>Authentication failed: Missing required parameters</p>
        </body>
        </html>
      `, { headers: { 'Content-Type': 'text/html' } });
    }

    console.log("GSC Callback: Calling handleGscCallback with state:", state);
    const success = await handleGscCallback(code, state);

    if (success) {
      console.log("GSC Callback: Success! Closing popup and notifying parent");
      const responseHtml = `
        <!DOCTYPE html>
        <html>
        <head><title>GSC Auth Success</title></head>
        <body>
          <script>
            console.log('GSC Callback popup: Starting success flow');
            
            function notifyParent() {
              console.log('GSC Callback popup: Attempting to notify parent');
              
              // Method 1: PostMessage
              if (window.opener && !window.opener.closed) {
                console.log('GSC Callback popup: Sending postMessage to parent');
                try {
                  window.opener.postMessage({ 
                    type: 'GSC_AUTH_SUCCESS', 
                    state: '${state}',
                    timestamp: Date.now()
                  }, '*');
                  console.log('GSC Callback popup: PostMessage sent successfully');
                } catch (e) {
                  console.error('GSC Callback popup: Error sending postMessage:', e);
                }
              } else {
                console.log('GSC Callback popup: No opener or opener is closed');
              }
              
              // Method 2: LocalStorage (backup)
              try {
                localStorage.setItem('gsc_auth_completed', Date.now().toString());
                console.log('GSC Callback popup: Set localStorage signal');
              } catch (e) {
                console.error('GSC Callback popup: Error setting localStorage:', e);
              }
            }
            
            // Try immediately
            notifyParent();
            
            // Try again after a short delay in case of timing issues
            setTimeout(notifyParent, 100);
            
            // Close window after notification attempts
            setTimeout(() => {
              console.log('GSC Callback popup: Closing window');
              window.close();
            }, 500);
          </script>
          <p>Authentication successful! This window will close automatically.</p>
        </body>
        </html>`;
      const res = new NextResponse(responseHtml, { headers: { 'Content-Type': 'text/html' } });
      // Set identifying cookie for this state, expires in 30 days
      res.headers.append('Set-Cookie', `gsc_state=${state}; Path=/; Max-Age=${30*24*60*60}; SameSite=Lax; Secure`);
      return res;
    } else {
      console.error("GSC Callback: handleGscCallback returned false");
      return new NextResponse(`
        <!DOCTYPE html>
        <html>
        <head><title>GSC Auth Error</title></head>
        <body>
          <script>
            if (window.opener) {
              window.opener.postMessage({ type: 'GSC_AUTH_ERROR', error: 'auth_failed' }, '*');
            }
            window.close();
          </script>
          <p>Authentication failed. Please try again.</p>
        </body>
        </html>
      `, { headers: { 'Content-Type': 'text/html' } });
    }
  } catch (error) {
    console.error("GSC Callback: Unexpected error:", error);
    return new NextResponse(`
      <!DOCTYPE html>
      <html>
      <head><title>GSC Auth Error</title></head>
      <body>
        <script>
          if (window.opener) {
            window.opener.postMessage({ type: 'GSC_AUTH_ERROR', error: 'callback_error' }, '*');
          }
          window.close();
        </script>
        <p>Authentication failed due to an unexpected error.</p>
      </body>
      </html>
    `, { headers: { 'Content-Type': 'text/html' } });
  }
}
