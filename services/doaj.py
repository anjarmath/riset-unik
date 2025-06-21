import httpx
import urllib.parse

async def search_doaj(topic: str, max_results=20):
    query = urllib.parse.quote(topic)
    url = f"https://doaj.org/api/v2/search/articles/{query}"
    async with httpx.AsyncClient() as client:
        client.headers.update({"User-Agent": "Mozilla/5.0"})
        r = await client.get(url)
        data = r.json()

    results = []
    for item in data.get("results", [])[:max_results]:
        title = item.get("bibjson", {}).get("title", "No Title")
        links = item.get("bibjson", {}).get("link", [])
        link = links[0]["url"] if links else "#"
        results.append({"title": title, "link": link})

    return results
