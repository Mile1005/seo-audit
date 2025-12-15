import React from "react";
import { prisma } from "../../../lib/prisma";
import { Metadata } from "next";

interface SharePageProps {
  params: { token: string };
}

export const dynamic = "force-dynamic";

async function getData(token: string) {
  if ((prisma as any).publicShare === undefined) return null;
  const share = await (prisma as any).publicShare.findUnique({
    where: { token },
    select: {
      token: true,
      expiresAt: true,
      auditRun: {
        select: {
          id: true,
          url: true,
          status: true,
          score: true,
          result: true,
          createdAt: true,
          completedAt: true,
        },
      },
    },
  });
  if (!share) return null;
  if (share.expiresAt && new Date(share.expiresAt) < new Date()) return null;
  return share;
}

export async function generateMetadata({ params }: SharePageProps): Promise<Metadata> {
  const data = await getData(params.token);
  if (!data) {
    return {
      title: "SEO Audit Report - Link Invalid | AI SEO Turbo",
      description: "This shared SEO audit link is invalid or has expired.",
      robots: "noindex, nofollow",
    };
  }

  const run = data.auditRun;
  const url = run.url;
  const score = run.score || "N/A";

  return {
    title: `SEO Audit Report for ${url} - Score: ${score} | AI SEO Turbo`,
    description: `Comprehensive SEO audit results for ${url} with performance, accessibility, and best practices analysis. Generated on ${new Date(run.createdAt).toLocaleDateString()}.`,
    keywords: "SEO audit, website analysis, performance score, accessibility check, SEO report",
    robots: "noindex, nofollow",
    openGraph: {
      title: `SEO Audit Report - ${url}`,
      description: `SEO audit results with score ${score} for ${url}`,
      type: "website",
    },
  };
}

export default async function SharePage({ params }: SharePageProps) {
  const data = await getData(params.token);
  if (!data)
    return (
      <div className="p-10 max-w-2xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Link Invalid or Expired</h1>
        <p className="text-muted-foreground">Request a new share link from the dashboard.</p>
      </div>
    );
  const run = data.auditRun;
  const scores = run.result?.comprehensiveResults?.scores || run.result?.scores || {};
  const issues = run.result?.comprehensiveResults?.issues || [];
  const quick = run.result?.comprehensiveResults?.quick_wins || [];

  return (
    <div className="min-h-screen bg-background">
      {/* Comprehensive SEO Report Introduction */}
      <section className="bg-slate-900/50 border-b border-slate-800 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg prose-invert mx-auto">
            <h1>Shared SEO Audit Report</h1>
            <p>
              This comprehensive SEO audit report has been shared with you by an AI SEO Turbo user.
              The report provides detailed insights into the website's search engine optimization
              performance, identifying both opportunities for improvement and critical issues that
              may be impacting search rankings.
            </p>

            <h2>Understanding SEO Audit Reports</h2>
            <p>
              SEO audits analyze websites across multiple dimensions to determine how well they
              perform in search engine results. Our AI-powered analysis goes beyond basic
              checklists, providing actionable insights backed by machine learning and industry
              expertise.
            </p>

            <h3>What This Report Includes:</h3>
            <ul>
              <li>
                <strong>Performance Scores:</strong> Overall SEO health across five key categories
              </li>
              <li>
                <strong>Quick Wins:</strong> High-impact improvements that can be implemented
                immediately
              </li>
              <li>
                <strong>Detailed Issues:</strong> Comprehensive list of problems with severity
                levels and solutions
              </li>
              <li>
                <strong>Technical Analysis:</strong> Crawlability, indexation, and technical SEO
                factors
              </li>
              <li>
                <strong>Content Optimization:</strong> Recommendations for improving content quality
                and relevance
              </li>
            </ul>

            <h3>How to Interpret the Scores:</h3>
            <p>
              Scores range from 0-100, with higher scores indicating better SEO performance. Each
              category represents a different aspect of search engine optimization:
            </p>

            <h4>Score Categories:</h4>
            <ul>
              <li>
                <strong>Overall:</strong> Combined performance across all SEO factors
              </li>
              <li>
                <strong>Performance:</strong> Page speed, Core Web Vitals, and technical performance
              </li>
              <li>
                <strong>Accessibility:</strong> Website usability and accessibility compliance
              </li>
              <li>
                <strong>SEO:</strong> On-page optimization, meta tags, and search engine signals
              </li>
              <li>
                <strong>Best Practices:</strong> Modern web standards and SEO best practices
              </li>
            </ul>

            <h3>Issue Severity Levels:</h3>
            <p>Issues are categorized by severity to help prioritize fixes:</p>
            <ul>
              <li>
                <strong>Critical:</strong> Major issues that significantly impact search rankings
              </li>
              <li>
                <strong>High:</strong> Important problems that should be addressed promptly
              </li>
              <li>
                <strong>Medium:</strong> Moderate issues that improve SEO when fixed
              </li>
              <li>
                <strong>Low:</strong> Minor optimizations that provide incremental benefits
              </li>
            </ul>

            <h2>About AI SEO Turbo</h2>
            <p>
              AI SEO Turbo is an advanced SEO analysis platform that combines artificial
              intelligence with deep industry expertise. Our platform helps SEO professionals,
              agencies, and website owners optimize their online presence and improve search engine
              rankings.
            </p>

            <p>
              This shared report was generated using our comprehensive audit tools, which analyze
              websites using the same methodology that powers our full platform. While this is a
              read-only view, you can sign up for a free account to run your own audits and access
              additional features.
            </p>
          </div>
        </div>
      </section>

      <div className="p-8 max-w-4xl mx-auto space-y-6">
        <header>
          <h1 className="text-3xl font-bold">SEO Audit (Shared)</h1>
          <p className="text-sm text-muted-foreground">
            Read-only view. Generated {new Date(run.createdAt).toLocaleString()} for {run.url}
          </p>
        </header>
        <section className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {["overall", "performance", "accessibility", "seo", "best_practices"].map((key) => (
            <div key={key} className="p-4 border rounded text-center">
              <div className="text-xs uppercase tracking-wide text-muted-foreground">
                {key.replace("_", " ")}
              </div>
              <div className="text-xl font-semibold">
                {scores?.[key as keyof typeof scores] ?? "—"}
              </div>
            </div>
          ))}
        </section>
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Quick Wins ({quick.length})</h2>
          <ul className="space-y-2 text-sm">
            {quick.map((q: any, i: number) => (
              <li key={i} className="p-3 border rounded">
                <span className="font-medium">{q.title}</span> – {q.description}
              </li>
            ))}
            {!quick.length && <li className="text-muted-foreground">None</li>}
          </ul>
        </section>
        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Issues ({issues.length})</h2>
          <ul className="space-y-2 text-sm">
            {issues.slice(0, 50).map((iss: any, i: number) => (
              <li key={i} className="p-3 border rounded">
                <span className="font-medium">
                  [{iss.severity}] {iss.title}
                </span>
                <br />
                {iss.description}
              </li>
            ))}
            {issues.length > 50 && (
              <li className="text-xs text-muted-foreground">Truncated to first 50 issues.</li>
            )}
          </ul>
        </section>
      </div>
    </div>
  );
}
