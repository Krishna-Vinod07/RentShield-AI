# RentShield AI API Contract

Version: 1.0

---

# Base URL

Development

http://localhost:5000

Production

https://rentshield-api.onrender.com

---

# Common Response Format

Success

```json
{
  "success": true,
  "data": {}
}
```

Error

```json
{
  "success": false,
  "message": "Error message"
}
```

---

# 1. Agreement Analysis

POST /api/analyze

Analyze rental agreements and identify risks, fraud indicators, and unfair clauses.

## Request

```json
{
  "agreementText": "Rental agreement text here"
}
```

## Response

```json
{
  "riskScore": 82,

  "verdict": "HIGH RISK",

  "fraudProbability": 68,

  "summary": "Agreement contains multiple risky clauses.",

  "riskBreakdown": [
    {
      "label": "Baseline Risk",
      "points": 5
    },
    {
      "label": "Non-refundable Deposit",
      "points": 18
    },
    {
      "label": "Cash-only Payments",
      "points": 12
    }
  ],

  "agreementSummary": {
    "rent": "₹18000",
    "deposit": "₹100000",
    "duration": "11 months",
    "noticePeriod": "48 hours",
    "lockIn": "11 months",
    "maintenance": "Tenant",
    "startDate": "2026-06-01",
    "landlordName": "R Sharma",
    "propertyAddress": "Bangalore"
  },

  "clauses": [
    {
      "severity": "HIGH",
      "title": "Non-refundable Deposit",
      "original": "Deposit shall not be returned",
      "plain": "Tenant may lose the entire deposit",
      "recommendation": "Make deposit refundable"
    }
  ],

  "positives": [
    "Clearly specified rent amount"
  ],

  "fraudSignals": [
    "Cash-only payments"
  ],

  "nextActions": [
    "Ask for ownership documents",
    "Negotiate notice period",
    "Request refundable deposit"
  ],

  "overallAdvice": "Proceed with caution."
}
```

---

# 2. Clause Rewriter

POST /api/rewrite

Suggests tenant-friendly alternatives for risky clauses.

## Request

```json
{
  "clause": "Landlord may evict tenant with 48 hours notice"
}
```

## Response

```json
{
  "original": "Landlord may evict tenant with 48 hours notice",

  "suggested": "Either party may terminate the agreement with 30 days notice"
}
```

---

# 3. Ownership Verification

POST /api/verify-owner

Verify ownership documents such as Property Deed, EC, Khata etc.

## Request

```json
{
  "document": "base64file",
  "landlordName": "R Sharma"
}
```

## Response

```json
{
  "ownerName": "R Sharma",

  "propertyAddress": "Bangalore",

  "documentType": "Property Deed",

  "nameMatch": "MATCH",

  "nameMatchDetail": "Owner name matches agreement",

  "authenticityFlags": [],

  "authenticityScore": 94,

  "verdict": "VERIFIED",

  "summary": "Ownership verified successfully"
}
```

---

# 4. Utility Bill Verification

POST /api/verify-bill

Verify utility bills against agreement information.

## Request

```json
{
  "bill": "base64file",

  "landlordName": "R Sharma",

  "propertyAddress": "Bangalore"
}
```

## Response

```json
{
  "accountHolder": "R Sharma",

  "billAddress": "Bangalore",

  "utilityType": "Electricity",

  "provider": "KSEB",

  "nameMatch": "MATCH",

  "addressMatch": "MATCH",

  "confidence": 92,

  "suspiciousIndicators": []
}
```

---

# 5. Listing Authenticity Check

POST /api/verify-listing

Detect fake property listings and fraud indicators.

## Request

```json
{
  "listingText": "Apartment for rent..."
}
```

## Response

```json
{
  "rent": "₹18000",

  "location": "Bangalore",

  "contactInfo": "9876543210",

  "fraudSignals": [
    "Advance payment requested"
  ],

  "legitimacyIndicators": [
    "Verified owner"
  ],

  "rentVsMarket": "BELOW_MARKET",

  "urgencyTactics": true,

  "advanceFeeRisk": "HIGH",

  "authenticityScore": 62,

  "verdict": "SUSPICIOUS",

  "summary": "Listing contains multiple red flags"
}
```

---

# 6. Tenant Chat Assistant

POST /api/chat

AI legal assistant for tenant queries.

## Request

```json
{
  "message": "Can landlord keep my deposit?"
}
```

## Response

```json
{
  "answer": "Generally a landlord cannot unfairly withhold a deposit..."
}
```

---

# 7. Landlord Trust Score

POST /api/trust-score

Calculate trustworthiness of landlord.

## Response

```json
{
  "trustScore": 87,

  "ownershipScore": 35,

  "utilityScore": 25,

  "listingScore": 20,

  "fraudPenalty": -5,

  "verdict": "TRUSTED"
}
```

---

# 8. Final Rental Safety Score

POST /api/final-score

Generate final recommendation using all modules.

## Response

```json
{
  "riskScore": 82,

  "trustScore": 87,

  "listingScore": 62,

  "finalScore": 74,

  "recommendation": "PROCEED WITH CAUTION"
}
```

---

# 9. PDF Report Generation

POST /api/report

Generate downloadable rental analysis report.

## Request

```json
{
  "reportId": "report_001"
}
```

## Response

```json
{
  "status": "success",

  "reportUrl": "/reports/report_001.pdf"
}
```

---

# Scoring Logic

## Agreement Risk Score

Range: 0–100

Factors:

* High Risk Clause = +18
* Medium Risk Clause = +10
* Low Risk Clause = +5
* Fraud Signal = +12
* Base Risk = +5

---

## Landlord Trust Score

Range: 0–100

Factors:

* Ownership Verified = +40
* Utility Match = +25
* Listing Authenticity = +20
* No Fraud Signals = +15

---

## Final Rental Safety Score

Formula

```text
Final Score =
(Trust Score × 0.4)
+
(Listing Score × 0.2)
+
(100 - Risk Score) × 0.4
```

---

# AI Models

Groq Llama 3.3 70B Versatile

Used For:

* Agreement Analysis
* Clause Rewriting
* Listing Verification
* Chat Assistant

Rule-Based Logic Used For:

* Risk Score
* Trust Score
* Final Safety Score
* Recommendations

---

# Contract Rules

1. Do not change API names.
2. Do not change JSON key names.
3. Do not change response structure without team discussion.
4. Frontend must consume exactly these response formats.
5. Backend must return exactly these response formats.
