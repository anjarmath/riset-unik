import json
from google import genai

from config import config
from models.schemas import TopicResult

client = genai.Client(api_key=config.get_settings().google_api_key)

def generate_topic(topic_desc: str):
    content = f"""
Berikut ini adalah sebuah deskripsi mengenai sebuah ide topik penelitian:
{topic_desc}

Berdasarkan deskripsi tersebut, susunlah sebuah topik penelitian yang padat berdasarkan kata kunci yang ada di deskripsi tersebut.
Topik yang kamu buat haruslah sedemikian sehingga bisa dipakai pakai search engine penelitian seperti google scholar, semantic scholar, dll sehingga bisa mencari referensi penelitian dari topik tersebut.

Kamu harus memberikan respon berupa topik penelitian yang tepat dan padat dan dalam dua bahasa yakni bahasa indonesia dan bahasa inggris.
"""
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=content,
        config={
            "response_mime_type": "application/json",
            "response_schema": TopicResult,
        },
    )

    # Validate if response is valid and fit the schema
    res = json.loads(response.text)
    
    if not res["topic_id"] or not res["topic_en"]:
        print(response.text)
        return None

    topic_result = TopicResult(topic_id=res["topic_id"], topic_en=res["topic_en"])
    return topic_result