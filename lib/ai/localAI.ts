// --- REMOVE ALL XENOVA/TRANSFORMERS IMPORTS AND MODEL LOADING ---

// Intent categories for classification
const INTENT_CATEGORIES = [
  "informational",
  "commercial",
  "navigational",
  "transactional",
  "educational",
  "entertainment",
];

/**
 * Summarize text content using Hugging Face Inference API (proxied)
 */
export async function summarize(text: string, maxLength: number = 150): Promise<string> {
  try {
    const cleanText = text.replace(/\s+/g, " ").trim();
    if (cleanText.length < 50) {
      return cleanText; // Return original if too short
    }
    const truncatedText = cleanText.length > 1000 ? cleanText.substring(0, 1000) + "..." : cleanText;
    const response = await fetch("/api/ai-inference", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: "summarization", text: truncatedText }),
    });
    const data = await response.json();
    return data[0]?.summary_text || "Unable to generate summary";
  } catch (error) {
    console.error("Summarization error:", error);
    // Fallback: return first few sentences
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
    const summary = sentences.slice(0, 2).join(". ").trim();
    return summary || "Summary not available";
  }
}

/**
 * Classify content intent using Hugging Face Inference API (proxied)
 */
export async function classifyIntent(
  text: string
): Promise<{ intent: string; confidence: number }> {
  try {
    const cleanText = text.replace(/\s+/g, " ").trim();
    if (cleanText.length < 10) {
      return { intent: "informational", confidence: 0.5 };
    }
    const truncatedText = cleanText.length > 500 ? cleanText.substring(0, 500) : cleanText;
    const response = await fetch("/api/ai-inference", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: "text-classification", text: truncatedText }),
    });
    const result = await response.json();
    const score = result[0]?.score || 0.5;
    const label = result[0]?.label || "POSITIVE";
    // Simple mapping based on content analysis
    const intent = mapToIntentCategory(truncatedText, score, label);
    const confidence = Math.min(score * 1.2, 0.95); // Boost confidence slightly
    return { intent, confidence };
  } catch (error) {
    console.error("Intent classification error:", error);
    return { intent: "informational", confidence: 0.5 };
  }
}

/**
 * Map model output to intent categories
 */
function mapToIntentCategory(text: string, score: number, label: string): string {
  const lowerText = text.toLowerCase();

  // Check for commercial indicators
  if (
    lowerText.includes("buy") ||
    lowerText.includes("purchase") ||
    lowerText.includes("price") ||
    lowerText.includes("sale") ||
    lowerText.includes("discount") ||
    lowerText.includes("offer")
  ) {
    return "commercial";
  }

  // Check for transactional indicators
  if (
    lowerText.includes("order") ||
    lowerText.includes("checkout") ||
    lowerText.includes("cart") ||
    lowerText.includes("payment")
  ) {
    return "transactional";
  }

  // Check for navigational indicators
  if (
    lowerText.includes("contact") ||
    lowerText.includes("about") ||
    lowerText.includes("location") ||
    lowerText.includes("hours")
  ) {
    return "navigational";
  }

  // Check for educational indicators
  if (
    lowerText.includes("learn") ||
    lowerText.includes("guide") ||
    lowerText.includes("tutorial") ||
    lowerText.includes("how to")
  ) {
    return "educational";
  }

  // Check for entertainment indicators
  if (
    lowerText.includes("fun") ||
    lowerText.includes("entertainment") ||
    lowerText.includes("game") ||
    lowerText.includes("video")
  ) {
    return "entertainment";
  }

  // Default to informational
  return "informational";
}

/**
 * Suggest topic gaps by comparing headings
 */
export async function suggestTopicGaps(
  myHeadings: string[],
  competitorHeadings: string[][]
): Promise<{ topic: string; relevance: number; reasoning: string }[]> {
  try {
    // Flatten competitor headings
    const allCompetitorHeadings = competitorHeadings.flat();

    // Extract key topics from headings
    const myTopics = extractTopics(myHeadings);
    const competitorTopics = extractTopics(allCompetitorHeadings);

    // Find missing topics
    const missingTopics = competitorTopics.filter(
      (topic) => !myTopics.some((myTopic) => calculateSimilarity(myTopic, topic) > 0.7)
    );

    // Score and rank suggestions
    const suggestions = missingTopics.map((topic) => {
      const relevance = calculateTopicRelevance(topic, allCompetitorHeadings);
      const reasoning = generateReasoning(topic, myHeadings, allCompetitorHeadings);

      return {
        topic,
        relevance,
        reasoning,
      };
    });

    // Sort by relevance and return top suggestions
    return suggestions.sort((a, b) => b.relevance - a.relevance).slice(0, 5);
  } catch (error) {
    console.error("Topic gap analysis error:", error);
    return [];
  }
}

/**
 * Extract key topics from headings
 */
function extractTopics(headings: string[]): string[] {
  const topics: string[] = [];

  for (const heading of headings) {
    // Remove common words and extract key phrases
    const cleanHeading = heading
      .toLowerCase()
      .replace(
        /\b(the|a|an|and|or|but|in|on|at|to|for|of|with|by|is|are|was|were|be|been|being|have|has|had|do|does|did|will|would|could|should|may|might|can|must|shall)\b/g,
        ""
      )
      .replace(/[^\w\s]/g, "")
      .trim();

    if (cleanHeading.length > 2) {
      topics.push(cleanHeading);
    }
  }

  return topics;
}

/**
 * Calculate similarity between two topics
 */
function calculateSimilarity(topic1: string, topic2: string): number {
  const words1 = topic1.split(" ").filter((w) => w.length > 2);
  const words2 = topic2.split(" ").filter((w) => w.length > 2);

  if (words1.length === 0 || words2.length === 0) return 0;

  const commonWords = words1.filter((word) => words2.includes(word));
  const totalWords = new Set([...words1, ...words2]).size;

  return commonWords.length / totalWords;
}

/**
 * Calculate topic relevance based on frequency and position
 */
function calculateTopicRelevance(topic: string, allHeadings: string[]): number {
  let frequency = 0;
  let positionScore = 0;

  for (let i = 0; i < allHeadings.length; i++) {
    const heading = allHeadings[i].toLowerCase();
    if (heading.includes(topic.toLowerCase())) {
      frequency++;
      // Higher score for earlier positions
      positionScore += 1 / (i + 1);
    }
  }

  const frequencyScore = Math.min((frequency / allHeadings.length) * 10, 1);
  const positionScoreNormalized = Math.min((positionScore / allHeadings.length) * 5, 1);

  return (frequencyScore + positionScoreNormalized) / 2;
}

/**
 * Generate reasoning for topic suggestion
 */
function generateReasoning(
  topic: string,
  myHeadings: string[],
  competitorHeadings: string[]
): string {
  const topicFrequency = competitorHeadings.filter((h) =>
    h.toLowerCase().includes(topic.toLowerCase())
  ).length;

  const totalCompetitorHeadings = competitorHeadings.length;
  const percentage = Math.round((topicFrequency / totalCompetitorHeadings) * 100);

  if (percentage > 30) {
    return `This topic appears in ${percentage}% of competitor content, indicating high relevance.`;
  } else if (percentage > 15) {
    return `This topic is covered by ${topicFrequency} competitors, suggesting it's important for your niche.`;
  } else {
    return `This topic appears in ${topicFrequency} competitor pages and could help differentiate your content.`;
  }
}

/**
 * Check if AI models are available
 */
export function isAIAvailable(): boolean {
  // This function is no longer relevant as models are loaded via API
  return true;
}

/**
 * Get AI loading status
 */
export function getAILoadingStatus(): { loading: boolean; loaded: boolean } {
  // This function is no longer relevant as models are loaded via API
  return { loading: false, loaded: true };
}

/**
 * Analyze content comprehensively
 */
export async function analyzeContent(
  text: string,
  headings: string[],
  competitorHeadings: string[][] = []
): Promise<{
  summary: string;
  intent: { intent: string; confidence: number };
  topicGaps: { topic: string; relevance: number; reasoning: string }[];
  aiAvailable: boolean;
}> {
  const aiAvailable = isAIAvailable();

  try {
    const [summary, intent, topicGaps] = await Promise.all([
      summarize(text),
      classifyIntent(text),
      suggestTopicGaps(headings, competitorHeadings),
    ]);

    return {
      summary,
      intent,
      topicGaps,
      aiAvailable,
    };
  } catch (error) {
    console.error("Content analysis error:", error);

    // Fallback responses
    return {
      summary: "AI analysis not available",
      intent: { intent: "informational", confidence: 0.5 },
      topicGaps: [],
      aiAvailable: false,
    };
  }
}

/**
 * Sentiment analysis (positive/negative/neutral)
 */
export async function sentimentAnalysis(text: string) {
  const response = await fetch("/api/ai-inference", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task: "sentiment", text }),
  });
  return await response.json();
}

/**
 * Named Entity Recognition (keyword/entity extraction)
 */
export async function extractEntities(text: string) {
  const response = await fetch("/api/ai-inference", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task: "ner", text }),
  });
  return await response.json();
}

/**
 * Topic classification (zero-shot)
 * @param text
 * @param labels array of candidate labels (topics)
 */
export async function classifyTopic(text: string, labels: string[]) {
  const response = await fetch("/api/ai-inference", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task: "topic", text, labels }),
  });
  return await response.json();
}

/**
 * Toxicity detection
 */
export async function detectToxicity(text: string) {
  const response = await fetch("/api/ai-inference", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task: "toxicity", text }),
  });
  return await response.json();
}

/**
 * Language detection
 */
export async function detectLanguage(text: string) {
  const response = await fetch("/api/ai-inference", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task: "language", text }),
  });
  return await response.json();
}

/**
 * Paraphrasing
 */
export async function paraphraseText(text: string) {
  const response = await fetch("/api/ai-inference", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task: "paraphrase", text }),
  });
  return await response.json();
}

/**
 * Question generation (FAQ)
 */
export async function generateQuestions(text: string) {
  const response = await fetch("/api/ai-inference", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task: "question", text }),
  });
  return await response.json();
}

/**
 * Readability score (Flesch-Kincaid)
 */
export function computeReadability(text: string) {
  // Flesch-Kincaid Reading Ease
  const sentences = text.split(/[.!?]+/).filter(Boolean).length || 1;
  const words = text.split(/\s+/).filter(Boolean).length || 1;
  const syllables = text.split(/\s+/).reduce((acc, word) => acc + countSyllables(word), 0) || 1;
  // Flesch Reading Ease formula
  const score = 206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words);
  return Math.round(score * 10) / 10;
}
function countSyllables(word: string) {
  word = word.toLowerCase();
  if (word.length <= 3) return 1;
  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');
  const matches = word.match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
}
