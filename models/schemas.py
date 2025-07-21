from pydantic import BaseModel, validator
from typing import List

class AnalyzeRequest(BaseModel):
    topic: str

class PaperResult(BaseModel):
    title: str
    link: str
    similarity: float

class AnalyzeResult(BaseModel):
    scores: List[float]
    results: List[PaperResult]

class AnalyzeResponse(BaseModel):
    average_similarity: float
    results: List[PaperResult]

class TopicResult(BaseModel):
    topic_id: str
    topic_en: str