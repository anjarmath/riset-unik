export interface PaperResult {
  title: string
  link: string
  similarity: number
}

export interface AnalyzeResponse {
  average_similarity: number
  results: PaperResult[]
}