const API_URL =
  process.env
    .NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000";

export async function createBeacon(
  question: string,
  author: string,
  category: string
) {
  const response = await fetch(
    `${API_URL}/beacons/`,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        question,
        author,
        category,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to create beacon"
    );
  }

  return response.json();
}

export async function getBeacons() {
  const response = await fetch(
    `${API_URL}/beacons/`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to load beacons"
    );
  }

  return response.json();
}

export async function createAnswer(
  beacon_id: number,
  text: string,
  author: string
) {
  const response = await fetch(
    `${API_URL}/answers/`,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "application/json",
      },

      body: JSON.stringify({
        beacon_id,
        text,
        author,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Failed to create answer"
    );
  }

  return response.json();
}

export async function getAnswers(
  beacon_id: number
) {
  const response = await fetch(
    `${API_URL}/answers/${beacon_id}`
  );

  if (!response.ok) {
    throw new Error(
      "Failed to load answers"
    );
  }

  return response.json();
}