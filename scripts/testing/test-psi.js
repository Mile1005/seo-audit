// Quick test of PSI integration
import { fetchPageSpeed } from "./lib/psi.js";

async function testPSI() {
  console.log("Testing PSI integration...");

  try {
    const result = await fetchPageSpeed(
      "https://example.com",
      "YOUR_PSI_API_KEY",
      "mobile"
    );

    console.log("PSI Result:", JSON.stringify(result, null, 2));
  } catch (error) {
    console.error("PSI Error:", error);
  }
}

testPSI();
