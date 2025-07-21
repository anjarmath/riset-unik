from fastapi import HTTPException
from sentence_transformers import SentenceTransformer
import numpy as np

from models.schemas import PaperResult

model = SentenceTransformer("paraphrase-MiniLM-L6-v2", device="cpu")

def analyze_similarity(user_topic, titles_with_links):
    if not titles_with_links:
        return []
    
    try:
        titles = [item["title"] for item in titles_with_links if "title" in item and "link" in item]

        if not titles:
            return []

        topic_embedding = model.encode(user_topic, convert_to_tensor=True)
        title_embeddings = model.encode(titles, convert_to_tensor=True)

        # Analyze similarity between input topic and all title results
        sims = model.similarity(topic_embedding, title_embeddings)
        scores = np.array(sims).squeeze().tolist()

        results = [
            PaperResult(title=item["title"], link=item["link"], similarity=float(sim))
            for item, sim in zip(titles_with_links, scores)
            if "title" in item and "link" in item
        ]

        # Sort results by similarity
        results.sort(key=lambda item: item.similarity, reverse=True)

        # return results and scores
        return results

    except Exception as e:
        print(f"An error occurred during similarity analysis: {e}")
        return HTTPException(status_code=500, detail="Terjadi kesalahan saat menghitung kemiripan.")
