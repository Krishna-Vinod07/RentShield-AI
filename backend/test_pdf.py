import pdfplumber

with pdfplumber.open(r"C:\Users\anjub\Downloads\sample.pdf") as pdf:
    text = ""

    for page in pdf.pages:
        text += page.extract_text() or ""

print(text[:1000])