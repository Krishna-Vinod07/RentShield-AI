from services.pdf_report import generate_report

sample_data = {
    "riskScore": 82,
    "trustScore": 87,
    "verdict": "HIGH RISK"
}

generate_report(sample_data)

print("PDF Generated")