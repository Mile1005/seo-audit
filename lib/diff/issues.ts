import crypto from 'crypto'
import { Issue } from '../types/audit'

function issueKey(i: Issue) {
  return crypto.createHash('sha1').update(`${i.title}|${i.category||''}|${i.severity||''}|${i.selector||''}`).digest('hex')
}

export interface IssuesDiffResult {
  newIssues: Issue[]
  resolvedIssues: Issue[]
  unchanged: Issue[]
}

export function diffIssues(current: Issue[] = [], previous: Issue[] = []): IssuesDiffResult {
  const prevMap = new Map<string, Issue>()
  previous.forEach(p => prevMap.set(issueKey(p), p))
  const currMap = new Map<string, Issue>()
  current.forEach(c => currMap.set(issueKey(c), c))

  const newIssues: Issue[] = []
  const unchanged: Issue[] = []
  current.forEach(c => {
    const k = issueKey(c)
    if (prevMap.has(k)) {
      unchanged.push(c)
    } else {
      newIssues.push(c)
    }
  })

  const resolvedIssues: Issue[] = []
  previous.forEach(p => {
    const k = issueKey(p)
    if (!currMap.has(k)) resolvedIssues.push(p)
  })

  return { newIssues, resolvedIssues, unchanged }
}
