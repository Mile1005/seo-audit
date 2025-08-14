import {
  pipeline,
  AutoTokenizer,
  AutoModelForSequenceClassification,
  AutoModelForSeq2SeqLM,
} from "@xenova/transformers";

// Model loading states
let summarizer: any = null;
let intentClassifier: any = null;
let modelsLoaded = false;
let modelsLoading = false;

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
 * Initialize AI models (lazy loading)
 */
async function initializeModels() {
  if (modelsLoaded || modelsLoading) return;

  modelsLoading = true;

  try {
    console.log("Loading AI models...");

    // Load summarization model
    summarizer = await pipeline("summarization", "Xenova/distilbart-cnn-12-6");

    // Load intent classification model (using a general text classification model)
    intentClassifier = await pipeline(
      "text-classification",
      "Xenova/distilbert-base-uncased-finetuned-sst-2-english"
    );

    modelsLoaded = true;
    console.log("AI models loaded successfully");
  } catch (error) {
    console.error("Failed to load AI models:", error);
    modelsLoaded = false;
  } finally {
    modelsLoading = false;
  }
}

/**
 * Summarize text content
 */
export async function summarize(text: string, maxLength: number = 150): Promise<string> {
  try {
    await initializeModels();

    if (!summarizer || !modelsLoaded) {
      throw new Error("Summarization model not available");
    }

    // Clean and prepare text
    const cleanText = text.replace(/\s+/g, " ").trim();
    if (cleanText.length < 50) {
      return cleanText; // Return original if too short
    }

    // Truncate if too long (models have input limits)
    const truncatedText =
      cleanText.length > 1000 ? cleanText.substring(0, 1000) + "..." : cleanText;

    const result = await summarizer(truncatedText, {
      max_length: maxLength,
      min_length: 30,
      do_sample: false,
    });

    return result[0]?.summary_text || "Unable to generate summary";
  } catch (error) {
    console.error("Summarization error:", error);
    // Fallback: return first few sentences
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
    const summary = sentences.slice(0, 2).join(". ").trim();
    return summary || "Summary not available";
  }
}

/**
 * Classify content intent
 */
export async function classifyIntent(
  text: string
): Promise<{ intent: string; confidence: number }> {
  try {
    await initializeModels();

    if (!intentClassifier || !modelsLoaded) {
      throw new Error("Intent classification model not available");
    }

    // Clean and prepare text
    const cleanText = text.replace(/\s+/g, " ").trim();
    if (cleanText.length < 10) {
      return { intent: "informational", confidence: 0.5 };
    }

    // Truncate if too long
    const truncatedText = cleanText.length > 500 ? cleanText.substring(0, 500) : cleanText;

    const result = await intentClassifier(truncatedText);

    // Map model output to our intent categories
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
  return modelsLoaded;
}

/**
 * Get AI loading status
 */
export function getAILoadingStatus(): { loading: boolean; loaded: boolean } {
  return {
    loading: modelsLoading,
    loaded: modelsLoaded,
  };
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
