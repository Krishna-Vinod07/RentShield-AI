from reportlab.platypus import (
    SimpleDocTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
    PageBreak
)

from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet
from datetime import datetime


def generate_report(
    data,
    filename="report.pdf"
):

    pdf = SimpleDocTemplate(filename)

    styles = getSampleStyleSheet()

    content = []

    # =====================================================
    # TITLE
    # =====================================================

    content.append(
        Paragraph(
            "🛡 RentShield AI Rental Fraud Analysis Report",
            styles["Title"]
        )
    )

    content.append(
        Paragraph(
            datetime.now().strftime(
                "Generated on %d %B %Y, %I:%M %p"
            ),
            styles["Normal"]
        )
    )

    content.append(
        Spacer(1, 20)
    )

    # =====================================================
    # EXECUTIVE SUMMARY
    # =====================================================

    content.append(
        Paragraph(
            "Executive Summary",
            styles["Heading1"]
        )
    )

    overview_table = Table(
        [
            ["Metric", "Score"],
            ["Risk Score", f"{data.get('riskScore',0)}/100"],
            ["Fraud Probability", f"{data.get('fraudProbability',0)}%"],
            ["Trust Score", f"{data.get('trustScore',0)}/100"],
            ["Final Safety Score", f"{data.get('finalScore',0)}/100"]
        ],
        colWidths=[220, 140]
    )

    overview_table.setStyle(
        TableStyle([
            ("BACKGROUND",(0,0),(-1,0),colors.darkgreen),
            ("TEXTCOLOR",(0,0),(-1,0),colors.white),
            ("GRID",(0,0),(-1,-1),1,colors.black),
            ("FONTNAME",(0,0),(-1,0),"Helvetica-Bold")
        ])
    )

    content.append(
        overview_table
    )

    content.append(
        Spacer(1,20)
    )

    # =====================================================
    # FINAL VERDICT
    # =====================================================

    content.append(
        Paragraph(
            "Final Assessment",
            styles["Heading1"]
        )
    )

    verdict_table = Table(
        [
            ["Verdict", data.get("verdict","-")],
            ["Recommendation", data.get("recommendation","-")]
        ],
        colWidths=[150,300]
    )

    verdict_table.setStyle(
        TableStyle([
            ("BACKGROUND",(0,0),(0,-1),colors.lightgrey),
            ("GRID",(0,0),(-1,-1),1,colors.black),
            ("FONTNAME",(0,0),(0,-1),"Helvetica-Bold")
        ])
    )

    content.append(verdict_table)

    content.append(
        Spacer(1,20)
    )

    # =====================================================
    # AGREEMENT SUMMARY
    # =====================================================

    content.append(
        Paragraph(
            "Agreement Summary",
            styles["Heading1"]
        )
    )

    summary = data.get(
        "agreementSummary",
        {}
    )

    agreement_table = Table(
        [
            ["Field", "Value"],
            ["Rent", str(summary.get("rent","-"))],
            ["Deposit", str(summary.get("deposit","-"))],
            ["Duration", str(summary.get("duration","-"))],
            ["Notice Period", str(summary.get("noticePeriod","-"))],
            ["Lock-In Period", str(summary.get("lockIn","-"))],
            ["Maintenance", str(summary.get("maintenance","-"))]
        ],
        colWidths=[160,300]
    )

    agreement_table.setStyle(
        TableStyle([
            ("BACKGROUND",(0,0),(-1,0),colors.lightgrey),
            ("GRID",(0,0),(-1,-1),1,colors.black)
        ])
    )

    content.append(
        agreement_table
    )

    content.append(
        Spacer(1,20)
    )

    # =====================================================
    # FLAGGED CLAUSES
    # =====================================================

    content.append(
        Paragraph(
            "Flagged Clauses",
            styles["Heading1"]
        )
    )

    clauses = data.get(
        "clauses",
        []
    )

    if clauses:

        for clause in clauses:

            content.append(
                Paragraph(
                    f"<b>{clause.get('title','Clause')}</b>",
                    styles["Heading3"]
                )
            )

            content.append(
                Paragraph(
                    clause.get(
                        "plain",
                        "-"
                    ),
                    styles["Normal"]
                )
            )

            content.append(
                Paragraph(
                    f"Severity: {clause.get('severity','-')}",
                    styles["Normal"]
                )
            )

            content.append(
                Paragraph(
                    f"Recommendation: {clause.get('recommendation','-')}",
                    styles["Normal"]
                )
            )

            content.append(
                Spacer(1,10)
            )

    else:

        content.append(
            Paragraph(
                "No major clauses flagged.",
                styles["Normal"]
            )
        )

    content.append(
        Spacer(1,20)
    )

    # =====================================================
    # POSITIVE SIGNALS
    # =====================================================

    content.append(
        Paragraph(
            "Positive Signals",
            styles["Heading1"]
        )
    )

    positives = data.get(
        "positives",
        []
    )

    if positives:

        for item in positives:

            content.append(
                Paragraph(
                    f"✓ {item}",
                    styles["Normal"]
                )
            )

    else:

        content.append(
            Paragraph(
                "No positive signals detected.",
                styles["Normal"]
            )
        )

    content.append(
        Spacer(1,20)
    )

    # =====================================================
    # FRAUD INDICATORS
    # =====================================================

    content.append(
        Paragraph(
            "Fraud Indicators",
            styles["Heading1"]
        )
    )

    fraud_signals = data.get(
        "fraudSignals",
        []
    )

    if fraud_signals:

        for item in fraud_signals:

            content.append(
                Paragraph(
                    f"⚠ {item}",
                    styles["Normal"]
                )
            )

    else:

        content.append(
            Paragraph(
                "No fraud indicators detected.",
                styles["Normal"]
            )
        )

    content.append(
        Spacer(1,20)
    )

    # =====================================================
    # RECOMMENDED ACTIONS
    # =====================================================

    content.append(
        Paragraph(
            "Recommended Actions",
            styles["Heading1"]
        )
    )

    actions = data.get(
        "nextActions",
        []
    )

    if actions:

        for action in actions:

            content.append(
                Paragraph(
                    f"• {action}",
                    styles["Normal"]
                )
            )

    else:

        content.append(
            Paragraph(
                "No additional actions recommended.",
                styles["Normal"]
            )
        )

    content.append(
        Spacer(1,20)
    )

    # =====================================================
    # VERIFICATION RESULTS
    # =====================================================

    content.append(
        Paragraph(
            "Landlord Verification Results",
            styles["Heading1"]
        )
    )

    verification_table = Table(
        [
            ["Verification", "Score"],
            ["Ownership Verification", str(data.get("ownershipScore","-"))],
            ["Utility Bill Match", str(data.get("utilityScore","-"))],
            ["Listing Authenticity", str(data.get("listingScore","-"))],
            ["Trust Score", str(data.get("trustScore","-"))],
            ["Final Rental Score", str(data.get("finalScore","-"))]
        ],
        colWidths=[250,150]
    )

    verification_table.setStyle(
        TableStyle([
            ("BACKGROUND",(0,0),(-1,0),colors.darkgreen),
            ("TEXTCOLOR",(0,0),(-1,0),colors.white),
            ("GRID",(0,0),(-1,-1),1,colors.black),
            ("FONTNAME",(0,0),(-1,0),"Helvetica-Bold")
        ])
    )

    content.append(
        verification_table
    )

    content.append(
        Spacer(1,20)
    )

    # =====================================================
    # AI RECOMMENDATION
    # =====================================================

    content.append(
        Paragraph(
            "AI Recommendation",
            styles["Heading1"]
        )
    )

    content.append(
        Paragraph(
            data.get(
                "overallAdvice",
                "No recommendation available."
            ),
            styles["Normal"]
        )
    )

    pdf.build(content)

    return filename