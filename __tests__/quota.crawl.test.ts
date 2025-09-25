import { describe, it, expect } from 'vitest'
import { initCrawl, getCrawl, updateCrawl, completeCrawl, cancelCrawl } from '../lib/server/crawl-store'

describe('crawl-store basic', () => {
  it('initializes and updates progress', () => {
    const id = 'test-crawl'
    initCrawl(id, { rootUrl: 'https://example.com', maxPages: 10, maxDepth: 2 })
    let job = getCrawl(id)!
    expect(job.processed).toBe(0)
    updateCrawl(id, j => { j.processed = 5 })
    job = getCrawl(id)!
    expect(job.progress).toBe(50)
    completeCrawl(id)
    job = getCrawl(id)!
    expect(job.status).toBe('completed')
  })

  it('cancels crawl', () => {
    const id = 'cancel-crawl'
    initCrawl(id, { rootUrl: 'https://example.com', maxPages: 5, maxDepth: 1 })
    cancelCrawl(id)
    const job = getCrawl(id)!
    expect(job.cancelled).toBe(true)
  })
})
