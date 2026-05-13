#!/bin/bash
# -----------------------------------------------------------------------------
# scaffold-nextjs-project.sh
# -----------------------------------------------------------------------------
# Description:
#   Creates the complete directory and file hierarchy for a Next.js 15 portfolio
#   project as defined in the specification. All directories and placeholder
#   files are generated under a target root (defaults to current directory).
#
# Usage:
#   ./scaffold-nextjs-project.sh [target_root]
#
# Example:
#   ./scaffold-nextjs-project.sh ~/my-portfolio
# -----------------------------------------------------------------------------

set -e  # Exit immediately if any command fails

# ------------------------------
# 1. Determine target directory
# ------------------------------
TARGET_DIR="${1:-.}"
mkdir -p "$TARGET_DIR"
cd "$TARGET_DIR"

echo "📁 Creating project structure in: $(pwd)"

# --------------------------------------
# 2. Create all directories (mkdir -p)
# --------------------------------------
# Directories listed exactly as they appear in the specification.
# Note: Directories with [slug] are literal directory names, not variables.

directories=(
    "src"
    "src/app"
    "src/app/about"
    "src/app/expertise"
    "src/app/projects"
    "src/app/projects/[slug]"
    "src/app/journey"
    "src/app/contact"
    "src/app/blog"
    "src/app/blog/[slug]"

    "src/components"
    "src/components/3d"
    "src/components/animations"
    "src/components/layout"
    "src/components/sections"
    "src/components/sections/home"
    "src/components/sections/about"
    "src/components/sections/expertise"
    "src/components/sections/projects"
    "src/components/sections/journey"
    "src/components/sections/contact"
    "src/components/sections/blog"
    "src/components/ui"
    "src/components/providers"

    "src/content"
    "src/content/blog"
    "src/content/projects"

    "src/data"

    "src/hooks"

    "src/lib"

    "src/styles"

    "src/types"

    "public"
    "public/images"
    "public/images/projects"
    "public/icons"
    "public/fonts"
)

for dir in "${directories[@]}"; do
    mkdir -p "$dir"
done

echo "✅ Directories created."

# --------------------------------------
# 3. Create placeholder files (touch)
# --------------------------------------
# All leaf files listed in the specification.
# For files inside [slug] directories, the path is literal.

files=(
    # App router core files
    "src/app/layout.tsx"
    "src/app/page.tsx"
    "src/app/not-found.tsx"
    "src/app/error.tsx"
    "src/app/loading.tsx"

    # App pages
    "src/app/about/page.tsx"
    "src/app/expertise/page.tsx"
    "src/app/projects/page.tsx"
    "src/app/projects/[slug]/page.tsx"
    "src/app/projects/[slug]/loading.tsx"
    "src/app/journey/page.tsx"
    "src/app/contact/page.tsx"
    "src/app/blog/page.tsx"
    "src/app/blog/[slug]/page.tsx"
    "src/app/blog/[slug]/loading.tsx"

    # 3D components
    "src/components/3d/HeroScene.tsx"
    "src/components/3d/NeuralNetworkScene.tsx"
    "src/components/3d/GlobeScene.tsx"
    "src/components/3d/ProjectCardScene.tsx"
    "src/components/3d/ParticleField.tsx"
    "src/components/3d/FloatingOrb.tsx"
    "src/components/3d/SceneCanvas.tsx"

    # Animation wrappers
    "src/components/animations/FadeUp.tsx"
    "src/components/animations/FadeIn.tsx"
    "src/components/animations/SlideIn.tsx"
    "src/components/animations/StaggerChildren.tsx"
    "src/components/animations/ScaleOnHover.tsx"
    "src/components/animations/MagneticButton.tsx"
    "src/components/animations/TextReveal.tsx"
    "src/components/animations/CountUp.tsx"
    "src/components/animations/PageTransition.tsx"
    "src/components/animations/variants.ts"

    # Layout components
    "src/components/layout/Header.tsx"
    "src/components/layout/Footer.tsx"
    "src/components/layout/NavLinks.tsx"
    "src/components/layout/MobileNav.tsx"
    "src/components/layout/NavLink.tsx"
    "src/components/layout/ScrollProgress.tsx"

    # Section components - home
    "src/components/sections/home/HeroSection.tsx"
    "src/components/sections/home/FeaturedProjects.tsx"
    "src/components/sections/home/SkillsSnapshot.tsx"
    "src/components/sections/home/CtaBanner.tsx"

    # Section components - about
    "src/components/sections/about/BioSection.tsx"
    "src/components/sections/about/ValuesSection.tsx"
    "src/components/sections/about/AvatarCard.tsx"

    # Section components - expertise
    "src/components/sections/expertise/SkillsGrid.tsx"
    "src/components/sections/expertise/TechStackSection.tsx"
    "src/components/sections/expertise/ServicesSection.tsx"
    "src/components/sections/expertise/StatsRow.tsx"

    # Section components - projects
    "src/components/sections/projects/ProjectsGrid.tsx"
    "src/components/sections/projects/ProjectFilters.tsx"
    "src/components/sections/projects/ProjectCard.tsx"
    "src/components/sections/projects/ProjectDetail.tsx"

    # Section components - journey
    "src/components/sections/journey/TimelineSection.tsx"
    "src/components/sections/journey/TimelineEntry.tsx"
    "src/components/sections/journey/EducationSection.tsx"

    # Section components - contact
    "src/components/sections/contact/ContactForm.tsx"
    "src/components/sections/contact/ContactInfo.tsx"
    "src/components/sections/contact/SocialLinks.tsx"

    # Section components - blog
    "src/components/sections/blog/PostGrid.tsx"
    "src/components/sections/blog/PostCard.tsx"
    "src/components/sections/blog/PostHeader.tsx"
    "src/components/sections/blog/PostBody.tsx"
    "src/components/sections/blog/PostToc.tsx"
    "src/components/sections/blog/CategoryFilter.tsx"

    # UI primitives
    "src/components/ui/Button.tsx"
    "src/components/ui/Badge.tsx"
    "src/components/ui/Card.tsx"
    "src/components/ui/GlassCard.tsx"
    "src/components/ui/Divider.tsx"
    "src/components/ui/SectionHeader.tsx"
    "src/components/ui/Tag.tsx"
    "src/components/ui/Avatar.tsx"
    "src/components/ui/Tooltip.tsx"
    "src/components/ui/Modal.tsx"
    "src/components/ui/Drawer.tsx"
    "src/components/ui/ProgressBar.tsx"
    "src/components/ui/Skeleton.tsx"
    "src/components/ui/Logo.tsx"
    "src/components/ui/ThemeToggle.tsx"
    "src/components/ui/ScrollToTop.tsx"
    "src/components/ui/ExternalLink.tsx"
    "src/components/ui/CodeBlock.tsx"

    # Providers
    "src/components/providers/ThemeProvider.tsx"
    "src/components/providers/SmoothScrollProvider.tsx"
    "src/components/providers/ToastProvider.tsx"

    # Content (example MDX files – you can replace with actual content later)
    "src/content/blog/getting-started-with-mlops.mdx"
    "src/content/blog/building-ai-agents-2025.mdx"
    "src/content/projects/ai-agent-orchestrator.mdx"
    "src/content/projects/mlops-pipeline.mdx"

    # Data files
    "src/data/projects.ts"
    "src/data/skills.ts"
    "src/data/journey.ts"
    "src/data/services.ts"
    "src/data/navigation.ts"
    "src/data/socials.ts"

    # Custom hooks
    "src/hooks/useScrollProgress.ts"
    "src/hooks/useActiveSection.ts"
    "src/hooks/useMediaQuery.ts"
    "src/hooks/useMousePosition.ts"
    "src/hooks/useReducedMotion.ts"
    "src/hooks/useInView.ts"
    "src/hooks/useTheme.ts"
    "src/hooks/useContactForm.ts"
    "src/hooks/useMDXContent.ts"

    # Utility libs
    "src/lib/mdx.ts"
    "src/lib/metadata.ts"
    "src/lib/formatDate.ts"
    "src/lib/readingTime.ts"
    "src/lib/slugify.ts"
    "src/lib/cn.ts"
    "src/lib/constants.ts"
    "src/lib/analytics.ts"

    # Stylesheets
    "src/styles/globals.css"
    "src/styles/fonts.css"
    "src/styles/tailwind.css"
    "src/styles/theme.css"
    "src/styles/mdx.css"

    # TypeScript type definitions
    "src/types/index.ts"
    "src/types/project.ts"
    "src/types/blog.ts"
    "src/types/skill.ts"
    "src/types/journey.ts"
    "src/types/navigation.ts"
    "src/types/mdx.ts"

    # Public assets (placeholders)
    "public/images/avatar.webp"
    "public/images/og-image.png"
    "public/icons/favicon.ico"
    "public/icons/icon-192.png"
    "public/icons/icon-512.png"
    "public/fonts/SpaceGrotesk-Variable.woff2"
    "public/fonts/JetBrainsMono-Variable.woff2"
)

for file in "${files[@]}"; do
    # Only create if it doesn't exist; if it exists, touch updates timestamp but leaves content.
    if [ ! -f "$file" ]; then
        touch "$file"
    else
        # Optionally, you can skip or touch. Here we touch to update timestamp.
        touch "$file"
    fi
done

echo "✅ Placeholder files created."

# --------------------------------------
# 4. Optional: create a .gitkeep in empty directories
#    (but most directories now have files, so skip)
# --------------------------------------

echo "🎉 Project scaffold complete at: $(pwd)"
echo "📝 Next steps:"
echo "   cd $(pwd)"
echo "   npm install  # or yarn / pnpm"
echo "   npm run dev"