from fastapi import FastAPI, HTTPException
from models.schemas import AnalyzeResponse, AnalyzeRequest
from services.doaj import search_doaj
from services.semantic_scholar import search_s2
from services.similiarity import analyze_similarity
import re

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.post("/analyze", response_model=AnalyzeResponse)
async def analyze_topic(data: AnalyzeRequest):
    topic = data.topic
    is_valid, result = validate_topic(topic)
    if not is_valid:
        raise HTTPException(status_code=400, detail=result)


    doaj_results = await search_doaj(topic)
    s2_results = await search_s2(topic)

    # Flatten all paper title
    combined = doaj_results + s2_results
    titles = [{"title": item["title"], "link": item["link"]} for item in combined]

    result = analyze_similarity(data.topic, titles)
    return result



def validate_topic(topic: str):
    topic = topic.strip()

    # Minimal 5 kata
    if len(topic.split()) < 5:
        return False, "Topik harus terdiri dari minimal 5 kata."

    # Izinkan huruf, angka, dan simbol umum (&, ., , -)
    if not re.match(r'^[a-zA-Z0-9\s.,()\-&]+$', topic):
        return False, "Topik mengandung karakter tidak valid. Gunakan huruf, angka, dan tanda baca umum."

    return True, topic