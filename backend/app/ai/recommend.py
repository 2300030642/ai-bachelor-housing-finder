# backend/app/ai/recommend.py

from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

def recommend_houses(user_preferences, houses):

    user_vector = np.array([
        user_preferences["price"],
        int(user_preferences["wifi"]),
        int(user_preferences["food"]),
        int(user_preferences["ac"])
    ]).reshape(1, -1)

    results = []

    for house in houses:

        house_vector = np.array([
            house.price,
            int(bool(house.wifi)),
            int(bool(house.food)),
            int(bool(house.ac))
        ]).reshape(1, -1)

        score = cosine_similarity(
            user_vector,
            house_vector
        )[0][0]

        results.append({
            "house": house,
            "score": float(score)
        })

    results.sort(
        key=lambda x: x["score"],
        reverse=True
    )

    return results[:5]