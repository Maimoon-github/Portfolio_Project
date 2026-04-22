#!/bin/bash
# setup-frontend-structure.sh
# Run this script from the root of your Next.js project (where src/ exists)

set -e  # exit on error

# Define base directory (src/components)
BASE="src/components"

echo "Creating directory structure under $BASE ..."

# 1. UI components (shadcn/ui primitives)
mkdir -p "$BASE/ui"
touch "$BASE/ui"/{badge,button,card,dialog,dropdown-menu,input,label,progress,select,separator,skeleton,slider,tabs,textarea,toast,tooltip}.tsx

# 2. Layout components
mkdir -p "$BASE/layout"
touch "$BASE/layout"/{Header,Footer,MobileMenu,ThemeToggle,Providers,JsonLd}.tsx

# 3. Blog components
mkdir -p "$BASE/blog"
touch "$BASE/blog"/{PostCard,PostHeader,RichTextRenderer,TableOfContents,CategoryFilter,SearchBar,PrevNextPost,CommentSection}.tsx

# 4. Portfolio components
mkdir -p "$BASE/portfolio"
touch "$BASE/portfolio"/{ProjectCard,ProjectHero,SkillBadge,SkillSection,ExperienceTimeline,TestimonialCard}.tsx

# 5. Calculators components
mkdir -p "$BASE/calculators/tools"
touch "$BASE/calculators"/{CalculatorShell,InputField,ResultDisplay,CalculatorCard}.tsx
touch "$BASE/calculators/tools"/{MortgageCalculator,CompoundInterestCalculator,BMICalculator,ReadingTimeCalculator,ContrastCheckerCalculator}.tsx

# 6. SEO components
mkdir -p "$BASE/seo"
touch "$BASE/seo"/{PersonSchema,BreadcrumbSchema}.tsx

echo "✅ All directories and placeholder files created successfully."
echo "   (Empty .tsx files added – fill them with your component code.)"