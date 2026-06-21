from services.groq_service import ask_groq

response = ask_groq(
    "Say hello from RentShield AI."
)

print(response)