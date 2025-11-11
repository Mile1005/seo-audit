import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../../../auth';
import { enforceQuota, incrementUsage } from '../../../lib/server/quota';
import { getLocaleFromHeaders, translateError } from '@/lib/i18n-server';

export async function POST(request: NextRequest) {
  try {
    const locale = getLocaleFromHeaders(request.headers);
    const body = await request.json();
    const { message, conversationHistory } = body;

    const session = await auth();
    const userId = session?.user?.id;

    if (userId) {
      try {
        const user = await (await import('../../../lib/prisma')).prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
          console.warn('Skipping quota enforcement: user id not found in DB', userId);
        } else {
          const quota = await enforceQuota(userId, 'AUDIT');
          if (!quota.allowed) {
            return NextResponse.json({ success: false, error: quota.reason, upgrade: quota.upgrade }, { status: 402 });
          }
        }
      } catch (e) {
        console.warn('Quota/user existence check failed, allowing chat', e);
      }
    }

    // Validate required fields
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      const msg = await translateError('invalid_message', locale);
      return NextResponse.json({ success: false, error: msg }, { status: 400 });
    }

    // Generate AI response based on SEO context
    const aiResponse = await generateAIResponse(message.trim(), conversationHistory || []);

    // Increment usage if user is authenticated
    if (userId) {
      try {
        await incrementUsage(userId, 'AUDIT');
      } catch (e) {
        console.warn('Failed to increment usage', e);
      }
    }

    return NextResponse.json({
      success: true,
      response: aiResponse,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('AI Assistant error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function generateAIResponse(message: string, history: any[]): Promise<string> {
  const lowerMessage = message.toLowerCase();

  // SEO-specific responses based on keywords
  if (lowerMessage.includes('keyword research') || lowerMessage.includes('keywords')) {
    return `For effective keyword research, I recommend:

1. **Use Multiple Tools**: Combine data from Google Keyword Planner, Ahrefs, SEMrush, and Moz for comprehensive insights.

2. **Focus on Long-tail Keywords**: These often have lower competition and higher conversion rates. For example, instead of "SEO tools", target "best free SEO audit tools for small businesses".

3. **Analyze Search Intent**: Understand what users really want:
   - Informational: Blog posts, guides
   - Commercial: Product reviews, comparisons
   - Transactional: Buy now, sign up pages

4. **Check Competition Level**: Look for keywords with:
   - Search volume: 100-1000 monthly searches
   - Difficulty score: Below 30-40
   - CPC: $0.50-$5.00 (indicates commercial value)

5. **Track Seasonal Trends**: Use Google Trends to identify seasonal keywords that could give you a competitive advantage.

Would you like me to help you research specific keywords for your niche?`;
  }

  if (lowerMessage.includes('backlinks') || lowerMessage.includes('link building')) {
    return `Here's my comprehensive link building strategy:

**1. Content-Based Link Building:**
- Create pillar content (2000+ words) that solves real problems
- Develop comprehensive guides, case studies, and data-driven content
- Use content upgrades (checklists, templates, calculators)

**2. Technical SEO for Better Crawling:**
- Ensure your XML sitemap is updated and submitted
- Create an HTML sitemap for better user navigation
- Fix crawl errors and improve site speed

**3. Outreach Strategy:**
- Find relevant websites in your niche
- Personalize outreach emails with specific value propositions
- Offer guest posting opportunities with unique angles

**4. Local SEO Links:**
- Get listed in local directories and citations
- Partner with local businesses for cross-promotion
- Earn links through local sponsorships and events

**5. Monitoring & Analysis:**
- Use tools like Ahrefs or Moz to track new backlinks
- Monitor Domain Authority improvements
- Disavow spammy links that could harm your site

Remember: Quality over quantity. One high-authority link is worth more than dozens of low-quality ones.

What type of backlinks are you focusing on right now?`;
  }

  if (lowerMessage.includes('technical seo') || lowerMessage.includes('site speed') || lowerMessage.includes('core web vitals')) {
    return `Technical SEO is crucial for your website's performance. Here's what you should focus on:

**Core Web Vitals (Priority #1):**
- **Largest Contentful Paint (LCP)**: Keep under 2.5 seconds
- **First Input Delay (FID)**: Keep under 100 milliseconds  
- **Cumulative Layout Shift (CLS)**: Keep under 0.1

**Site Speed Optimization:**
- Compress images (use WebP format, lazy loading)
- Minify CSS, JavaScript, and HTML
- Enable browser caching and GZIP compression
- Use a Content Delivery Network (CDN)

**Mobile Optimization:**
- Implement responsive design
- Test mobile usability in Google Search Console
- Ensure touch-friendly navigation

**Crawlability & Indexability:**
- Create and submit XML sitemaps
- Use robots.txt correctly (don't block important pages)
- Fix broken internal/external links
- Implement proper URL structure

**Schema Markup:**
- Add structured data for rich snippets
- Use JSON-LD format for better implementation
- Test with Google's Rich Results Tool

**Security & HTTPS:**
- Ensure SSL certificate is properly configured
- Monitor for malware and security issues
- Regular security audits and updates

Would you like me to help you audit a specific technical SEO issue?`;
  }

  if (lowerMessage.includes('content') || lowerMessage.includes('blog') || lowerMessage.includes('writing')) {
    return `Content is king in SEO! Here's my content strategy framework:

**1. Content Planning:**
- **Keyword Research**: Find topics with search volume + low competition
- **Search Intent Analysis**: Match content to what users want
- **Content Calendar**: Plan 3-6 months in advance
- **Content Pillars**: Create cornerstone content that supports clusters

**2. Content Creation Best Practices:**
- **Length**: Comprehensive guides (2000+ words) for competitive keywords
- **Structure**: Use H1, H2, H3 tags with logical hierarchy
- **Readability**: Short paragraphs, bullet points, numbered lists
- **Multimedia**: Images, videos, infographics, charts

**3. SEO Optimization:**
- **Title Tag**: Under 60 characters, include primary keyword
- **Meta Description**: 150-160 characters with compelling CTA
- **URL Structure**: Clean, descriptive URLs with keywords
- **Internal Linking**: Link to related content on your site
- **Image Optimization**: Descriptive alt text, compressed files

**4. Content Promotion:**
- **Social Media**: Share on relevant platforms
- **Email Marketing**: Send to your subscriber list
- **Influencer Outreach**: Partner with industry experts
- **Forum Participation**: Answer questions on Reddit, Quora, etc.

**5. Content Types That Perform Well:**
- How-to guides and tutorials
- Listicles and ultimate guides
- Case studies and success stories
- Comparison articles
- Industry research and statistics

What type of content are you planning to create?`;
  }

  if (lowerMessage.includes('rankings') || lowerMessage.includes('serp') || lowerMessage.includes('position')) {
    return `Improving your search rankings requires a systematic approach. Here's my ranking improvement strategy:

**1. Foundation (Month 1-2):**
- Fix technical SEO issues (site speed, mobile-friendliness, HTTPS)
- Improve on-page SEO (title tags, meta descriptions, headers)
- Create high-quality, comprehensive content
- Build internal linking structure

**2. Content & Authority (Month 2-4):**
- Publish pillar content and content clusters
- Start link building campaign
- Guest posting on authoritative sites
- Earn mentions and brand coverage

**3. Optimization & Scaling (Month 3-6):**
- Optimize for featured snippets and rich results
- Improve user engagement metrics (dwell time, bounce rate)
- Expand keyword targeting
- Monitor and analyze performance

**4. Advanced Strategies (Month 6+):**
- Implement schema markup for rich snippets
- Optimize for voice search and AI assistants
- Build topical authority in your niche
- Leverage seasonal trends and newsjacking

**Key Metrics to Track:**
- Organic traffic growth
- Keyword ranking improvements
- Conversion rate from organic traffic
- Domain Authority and backlink profile
- Core Web Vitals performance

**Common Ranking Factors:**
- Content quality and relevance
- Backlink profile and domain authority
- Technical SEO performance
- User experience and engagement
- Mobile-friendliness and page speed

What keywords are you trying to rank for? I can help you analyze your current performance and create a targeted improvement plan.`;
  }

  // Default response for general SEO questions
  return `I'm your AI SEO Assistant, ready to help you improve your search engine optimization! I can assist with:

🔍 **Keyword Research**: Find profitable keywords with the right search volume and competition
🔗 **Link Building**: Strategies for earning high-quality backlinks
⚡ **Technical SEO**: Optimize site speed, mobile-friendliness, and Core Web Vitals
📝 **Content Strategy**: Create SEO-optimized content that ranks and converts
📊 **Ranking Improvement**: Systematic approach to climb search results
🎯 **Local SEO**: Dominate local search results in your area
📱 **Mobile SEO**: Ensure your site works perfectly on all devices

I also provide insights on:
- Competitor analysis
- SEO audits and fixes
- Algorithm updates and trends
- Tool recommendations
- ROI measurement

What specific SEO challenge are you facing today? Whether it's improving rankings, increasing traffic, or fixing technical issues, I'm here to help with actionable advice tailored to your situation.`;
}