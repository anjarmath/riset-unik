from pydantic import BaseModel, validator
from typing import List

class AnalyzeRequest(BaseModel):
    topic: str

class PaperResult(BaseModel):
    title: str
    link: str
    similarity: float

class AnalyzeResponse(BaseModel):
    average_similarity: float
    results: List[PaperResult]