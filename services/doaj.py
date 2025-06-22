import httpx
import urllib.parse

async def search_doaj(topic: str, max_results=20):
    try:
        query = urllib.parse.quote(topic)
        url = f"https://doaj.org/api/v2/search/articles/{query}"
        async with httpx.AsyncClient() as client:
            client.headers.update({"User-Agent": "Mozilla/5.0"})
            r = await client.get(url)
            r.raise_for_status()
            data = r.json()

        results = []
        for item in data.get("results", [])[:max_results]:
            bibjson = item.get("bibjson", {})
            title = bibjson.get("title", "No Title")
            links = bibjson.get("link", [])
            link = links[0]["url"] if links else "#"
            results.append({"title": title, "link": link})

        return results

    except (httpx.HTTPStatusError, httpx.RequestError) as e:
        # Handle request errors
        print(f"HTTP error occurred: {e}")
        return []
    except ValueError as e:
        # Handle JSON decoding errors
        print(f"JSON decoding failed: {e}")
        return []
    except Exception as e:
        # Catch any other exceptions
        print(f"An unexpected error occurred: {e}")
        return []
