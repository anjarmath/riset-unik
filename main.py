from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware

from models.schemas import AnalyzeResponse, AnalyzeRequest
from services.doaj import search_doaj
from services.semantic_scholar import search_s2
from services.similiarity import analyze_similarity
import re
from slowapi import Limiter
from slowapi.util import get_remote_address


limiter = Limiter(key_func=get_remote_address)
app = FastAPI()
app.state.limiter = limiter

app = FastAPI()

# 🛡️ Konfigurasi CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://accgaya.algieba-id.com"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
@limiter.limit("2/minute")
async def root(request: Request):
    return {"message": "Hello World"}

@app.post("/analyze", response_model=AnalyzeResponse)
@limiter.limit("2/minute")
async def analyze_topic(data: AnalyzeRequest, request: Request):
    topic = data.topic
    is_valid, result = validate_topic(topic)
    if not is_valid:
        raise HTTPException(status_code=400, detail=result)

    if not topic:
        raise HTTPException(status_code=400, detail="Topik tidak boleh kosong.")

    doaj_results = await search_doaj(topic)
    s2_results = await search_s2(topic, 40)

    if doaj_results is None or s2_results is None:
        raise HTTPException(status_code=500, detail="Terjadi kesalahan pada server.")

    # Flatten all paper title
    combined = doaj_results + s2_results

    titles = [{"title": item["title"], "link": item["link"]} for item in combined if item]

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