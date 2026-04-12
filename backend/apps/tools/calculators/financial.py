# @@CONTENT_PLACEHOLDER@@
@@"""
Pure Python financial calculator functions.
All inputs/outputs are plain Python types — no Django, no DRF.
Fully testable in isolation.
"""
from dataclasses import dataclass
from typing import TypedDict


def compound_interest(
    principal: float,
    annual_rate: float,
    years: int,
    compounds_per_year: int = 12,
) -> dict:
    """A = P(1 + r/n)^(nt)"""
    if principal <= 0:
        raise ValueError("Principal must be positive.")
    if annual_rate < 0:
        raise ValueError("Rate cannot be negative.")
    r = annual_rate / 100
    n = compounds_per_year
    t = years
    amount = principal * (1 + r / n) ** (n * t)
    interest = amount - principal
    return {
        "final_amount": round(amount, 2),
        "interest_earned": round(interest, 2),
        "effective_annual_rate": round((1 + r / n) ** n - 1, 6),
    }


def mortgage_monthly_payment(
    loan_amount: float,
    annual_rate: float,
    loan_term_years: int,
) -> dict:
    """M = P[r(1+r)^n]/[(1+r)^n-1]"""
    if annual_rate == 0:
        monthly = loan_amount / (loan_term_years * 12)
        return {"monthly_payment": round(monthly, 2), "total_paid": round(monthly * loan_term_years * 12, 2)}
    r = (annual_rate / 100) / 12
    n = loan_term_years * 12
    monthly = loan_amount * (r * (1 + r) ** n) / ((1 + r) ** n - 1)
    total = monthly * n
    return {
        "monthly_payment": round(monthly, 2),
        "total_paid": round(total, 2),
        "total_interest": round(total - loan_amount, 2),
    }


def return_on_investment(
    initial_investment: float,
    final_value: float,
) -> dict:
    if initial_investment <= 0:
        raise ValueError("Initial investment must be positive.")
    roi = ((final_value - initial_investment) / initial_investment) * 100
    return {
        "roi_percent": round(roi, 2),
        "net_profit": round(final_value - initial_investment, 2),
    }


def loan_amortization(
    loan_amount: float,
    annual_rate: float,
    loan_term_years: int,
) -> dict:
    """Returns full amortization schedule."""
    payment_data = mortgage_monthly_payment(loan_amount, annual_rate, loan_term_years)
    monthly = payment_data["monthly_payment"]
    r = (annual_rate / 100) / 12
    balance = loan_amount
    schedule = []
    for month in range(1, loan_term_years * 12 + 1):
        interest = round(balance * r, 2)
        principal_paid = round(monthly - interest, 2)
        balance = round(balance - principal_paid, 2)
        schedule.append({
            "month": month,
            "payment": monthly,
            "principal": principal_paid,
            "interest": interest,
            "balance": max(balance, 0),
        })
    return {"schedule": schedule, **payment_data}@@

write_file "backend/apps/tools/models.py" <<'@@CONTENT_PLACEHOLDER@@'
# @@CONTENT_PLACEHOLDER@@
@@from django.db import models
from wagtail.models import Page
from wagtail.fields import StreamField, RichTextField
from wagtail.admin.panels import FieldPanel, MultiFieldPanel
from wagtail.api import APIField
from wagtail.images.api.fields import ImageRenditionField
from wagtail import blocks as wagtail_blocks
from wagtail.images.blocks import ImageChooserBlock


class ToolCategory(models.TextChoices):
    FINANCIAL = "financial", "Financial"
    HEALTH = "health", "Health & Fitness"
    SCIENTIFIC = "scientific", "Scientific"
    PRODUCTIVITY = "productivity", "Productivity"
    OTHER = "other", "Other"


class ToolIndexPage(Page):
    """
    The /tools/ directory page.
    Children: ToolDetailPage.
    """
    intro = RichTextField(blank=True)

    content_panels = Page.content_panels + [FieldPanel("intro")]

    api_fields = [APIField("intro")]
    subpage_types = ["tools.ToolDetailPage"]

    class Meta:
        verbose_name = "Tools directory"


class ToolDetailPage(Page):
    """
    One page per calculator. Contains:
    - Wagtail-managed content (description, formula guide, use cases)
    - calculator_slug → maps to a React component on the frontend
    - category → for navigation/filtering
    """
    # ─── Tool identity ─────────────────────────────────────────────
    category = models.CharField(
        max_length=30,
        choices=ToolCategory.choices,
        default=ToolCategory.OTHER,
        db_index=True,
    )
    calculator_slug = models.SlugField(
        unique=True,
        help_text="Identifies the React calculator component (e.g. compound-interest)",
    )
    icon = models.CharField(max_length=50, blank=True, help_text="Lucide icon name")
    hero_image = models.ForeignKey(
        "wagtailimages.Image",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="+",
    )
    is_featured = models.BooleanField(default=False, db_index=True)

    # ─── Rich content (Wagtail StreamField) ────────────────────────
    body = StreamField(
        [
            ("intro", wagtail_blocks.RichTextBlock(label="Introduction")),
            ("formula_block", wagtail_blocks.StructBlock([
                ("title", wagtail_blocks.CharBlock()),
                ("formula", wagtail_blocks.TextBlock(help_text="LaTeX or plain text")),
                ("explanation", wagtail_blocks.RichTextBlock()),
            ], label="Formula explanation")),
            ("use_cases", wagtail_blocks.ListBlock(
                wagtail_blocks.StructBlock([
                    ("title", wagtail_blocks.CharBlock()),
                    ("description", wagtail_blocks.TextBlock()),
                ]),
                label="Use cases",
            )),
            ("faq", wagtail_blocks.ListBlock(
                wagtail_blocks.StructBlock([
                    ("question", wagtail_blocks.CharBlock()),
                    ("answer", wagtail_blocks.RichTextBlock()),
                ]),
                label="FAQ",
            )),
            ("image", ImageChooserBlock()),
            ("paragraph", wagtail_blocks.RichTextBlock()),
        ],
        use_json_field=True,
        blank=True,
    )

    content_panels = Page.content_panels + [
        MultiFieldPanel([
            FieldPanel("category"),
            FieldPanel("calculator_slug"),
            FieldPanel("icon"),
            FieldPanel("is_featured"),
        ], heading="Tool settings"),
        FieldPanel("hero_image"),
        FieldPanel("body"),
    ]

    api_fields = [
        APIField("category"),
        APIField("calculator_slug"),
        APIField("icon"),
        APIField("is_featured"),
        APIField("body"),
        APIField("hero_image_thumbnail", serializer=ImageRenditionField("fill-800x400")),
    ]

    parent_page_types = ["tools.ToolIndexPage"]
    subpage_types = []

    class Meta:
        verbose_name = "Calculator tool"
        ordering = ["title"]@@

write_file "backend/apps/tools/calculators/health.py" <<'@@CONTENT_PLACEHOLDER@@'
# @@CONTENT_PLACEHOLDER@@
