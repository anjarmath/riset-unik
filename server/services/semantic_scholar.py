import httpx
import urllib.parse

from server.config import config

async def search_s2(topic: str, max_results=20):
    api_key = config.get_settings().s2_api_key
    try:
        query = urllib.parse.quote(topic)
        url = f"https://api.semanticscholar.org/graph/v1/paper/search?query={query}&limit={max_results}"
        async with httpx.AsyncClient() as client:
            client.headers.update({"User-Agent": "Mozilla/5.0", "x-api-key": api_key})
            r = await client.get(url)
            r.raise_for_status()
            data = r.json()

        results = []
        for item in data.get("data", [])[:max_results]:
            title = item.get("title", "No Title")
            paper_id = item.get("paperId", "#")
            link = f"https://www.semanticscholar.org/paper/{paper_id}"
            results.append({"title": title, "link": link})

        return results

    except (httpx.HTTPStatusError, httpx.RequestError) as e:
        print(f"HTTP error occurred: {e}")
        return []
    except ValueError as e:
        print(f"JSON decoding failed: {e}")
        return []
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
        return []
