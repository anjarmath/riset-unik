import httpx
import urllib.parse

async def search_s2(topic: str, max_results=20):
    query = urllib.parse.quote(topic)
    url = f"https://api.semanticscholar.org/graph/v1/paper/search?query={query}&limit={max_results}"
    async with httpx.AsyncClient() as client:
        client.headers.update({"User-Agent": "Mozilla/5.0"})
        r = await client.get(url)
        data = r.json()

    results = []
    for item in data.get("data", [])[:max_results]:
        title = item.get("title", "No Title")
        paper_id = item.get("paperId", "#")
        link = f"https://www.semanticscholar.org/paper/{paper_id}"
        results.append({"title": title, "link": link})

    return results