const teamDoServerURL = "http://localhost:3000/"; // TODO use env instead of hardcoding when deploying

// Handles the actual connection to the backend API used for making requests
async function fetchData(url: string) {
  const response = await fetch(teamDoServerURL + url);
  if (!response.ok) throw new Error("Network response was not ok");
  return await response.json();
}

async function postData(url: string, data: any) {
  const response = await fetch(teamDoServerURL + url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Network response was not ok");
  return await response.json();
}

export { fetchData, postData };
