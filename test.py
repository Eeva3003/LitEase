import requests

url = "https://dictionary-by-api-ninjas.p.rapidapi.com/v1/dictionary"

querystring = {"word":"bright"}

headers = {
	"X-RapidAPI-Key": "9355d3fe39mshb2925105f16f430p1b9ee5jsnb63c22b99b18",
	"X-RapidAPI-Host": "dictionary-by-api-ninjas.p.rapidapi.com"
}

response = requests.get(url, headers=headers, params=querystring)

print(response.json())