"""
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
    return {"schedule": schedule, **payment_data}
