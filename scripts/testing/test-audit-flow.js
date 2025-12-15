// Simple test to debug the audit API flow
console.log("Testing audit API flow...");

async function testAuditFlow() {
  try {
    console.log("1. Starting audit...");
    const startResponse = await fetch("http://localhost:3001/api/seo-audit/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: "https://example.com" }),
    });

    console.log("2. Start response status:", startResponse.status);
    const startData = await startResponse.json();
    console.log("3. Start response data:", startData);

    if (startData.auditId) {
      // Poll for results
      let attempts = 0;
      while (attempts < 10) {
        await new Promise((resolve) => setTimeout(resolve, 2000));

        const statusResponse = await fetch(
          `http://localhost:3001/api/seo-audit/status?auditId=${startData.auditId}`
        );
        console.log(`4.${attempts + 1} Status response:`, statusResponse.status);
        const statusData = await statusResponse.json();
        console.log(`5.${attempts + 1} Status data:`, statusData);

        if (statusData.status === "completed" || statusData.status === "failed") {
          break;
        }
        attempts++;
      }
    }
  } catch (error) {
    console.error("Test failed:", error);
  }
}

// Run the test
testAuditFlow();
