export interface RankTrackingProvider {
  getRankSnapshot(domain: string, keyword: string): Promise<{ position: number }>
}

export class SerpApiProvider implements RankTrackingProvider {
  async getRankSnapshot(domain: string, keyword: string): Promise<{ position: number }> {
    // TODO: Implement SERP API call
    throw new Error('Not implemented')
  }
}
