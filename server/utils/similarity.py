import numpy as np
from models.schemas import PaperResult


def get_avg_similarity_score(titles: list[PaperResult]):
    return np.mean([item.similarity for item in titles]) if titles else 0.0