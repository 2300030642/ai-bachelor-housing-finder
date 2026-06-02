from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import re

model = SentenceTransformer("all-MiniLM-L6-v2")

def semantic_search(query, houses):

    query_lower = query.lower()

    # Extract budget
    budget = None
    numbers = re.findall(r"\d+", query_lower)
    if numbers:
        budget = int(numbers[0])

    wants_wifi = "wifi" in query_lower
    wants_food = "food" in query_lower
    wants_ac = "ac" in query_lower

    filtered_houses = []

    for house in houses:

        if budget and house.price > budget:
            continue

        if wants_wifi and not house.wifi:
            continue

        if wants_food and not house.food:
            continue

        if wants_ac and not house.ac:
            continue

        filtered_houses.append(house)

    if not filtered_houses:
        return []

    house_texts = []

    for house in filtered_houses:

        text = f"""
        {house.title}
        {house.location}
        {house.description}
        """

        house_texts.append(text)

    query_embedding = model.encode([query])

    house_embeddings = model.encode(house_texts)

    similarities = cosine_similarity(
        query_embedding,
        house_embeddings
    )[0]

    results = []

    for house, score in zip(filtered_houses, similarities):

        results.append({
            "house": house,
            "score": float(score)
        })

    results.sort(
        key=lambda x: x["score"],
        reverse=True
    )

    return results