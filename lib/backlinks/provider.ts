export interface BacklinkProvider {
  getBacklinkSnapshot(domain: string): Promise<{ totalBacklinks: number, referringDomains: number }>
}

export class OpenLinkProfilerProvider implements BacklinkProvider {
  async getBacklinkSnapshot(domain: string): Promise<{ totalBacklinks: number, referringDomains: number }> {
    // TODO: Implement OpenLinkProfiler API call
    throw new Error('Not implemented')
  }
}
