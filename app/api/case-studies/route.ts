import { NextRequest, NextResponse } from "next/server";

// Force dynamic rendering for this API route
export const dynamic = "force-dynamic";

// Sample case studies data
const caseStudies = [
  {
    id: "local-seo-success",
    title: "Local SEO Success Story",
    company: "Local Business Inc",
    results: {
      organicTrafficIncrease: 245,
      rankingImprovements: 180,
      conversionRate: 35,
    },
    timeframe: "6 months",
    summary:
      "How a local business increased organic traffic by 245% using our SEO audit recommendations.",
  },
  {
    id: "ecommerce-audit",
    title: "E-commerce SEO Transformation",
    company: "Online Retailer Co",
    results: {
      organicTrafficIncrease: 320,
      rankingImprovements: 250,
      conversionRate: 58,
    },
    timeframe: "4 months",
    summary: "E-commerce site achieves 320% traffic growth through technical SEO improvements.",
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    const caseStudy = caseStudies.find((cs) => cs.id === id);
    if (!caseStudy) {
      return NextResponse.json({ error: "Case study not found" }, { status: 404 });
    }
    return NextResponse.json(caseStudy);
  }

  return NextResponse.json(caseStudies);
}
