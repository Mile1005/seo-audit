// Simple test script to verify GSC configuration
import { isGscConfigured, getGscAuthUrl } from "../lib/gsc";

console.log("🔍 Testing GSC Configuration...\n");

// Check if GSC is configured
console.log("GSC Configuration Status:");
console.log("- Client ID:", process.env.GSC_CLIENT_ID ? "✅ Set" : "❌ Missing");
console.log("- Client Secret:", process.env.GSC_CLIENT_SECRET ? "✅ Set" : "❌ Missing");
console.log("- Redirect URI:", process.env.GSC_REDIRECT_URI || "❌ Missing");
console.log("- Is Configured:", isGscConfigured() ? "✅ Yes" : "❌ No");

if (isGscConfigured()) {
  console.log("\n🎉 GSC is properly configured!");
  console.log("You can now use GSC features in your SEO audit tool.");
} else {
  console.log("\n⚠️  GSC is not properly configured.");
  console.log("Please run the setup-gsc.bat script to configure GSC.");
}

console.log("\n📋 Environment Variables Summary:");
console.log("GSC_CLIENT_ID:", process.env.GSC_CLIENT_ID || "Not set");
console.log("GSC_CLIENT_SECRET:", process.env.GSC_CLIENT_SECRET ? "Set (hidden)" : "Not set");
console.log("GSC_REDIRECT_URI:", process.env.GSC_REDIRECT_URI || "Not set");
console.log("PSI_API_KEY:", process.env.PSI_API_KEY ? "Set" : "Not set");
