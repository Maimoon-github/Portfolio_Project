// src/components/layout/Footer.tsx
export function Footer() {
  return (
    <footer className="section bg-surface-container-low border-t border-[rgba(84,68,52,0.15)]">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-2xl bg-gradient-to-br from-primary to-primary-container flex items-center justify-center">
                <span className="text-on-primary-fixed font-bold text-xl">AR</span>
              </div>
              <span className="text-xl font-semibold text-on-surface">Alex Reeves</span>
            </div>
            <p className="text-on-surface-variant text-sm max-w-xs">
              Sovereign Architect of production-grade intelligence systems.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <div className="label-md mb-4 text-secondary">Navigation</div>
            <div className="flex flex-col gap-3 text-sm">
              <a href="/portfolio" className="text-on-surface-variant hover:text-primary transition-colors">Portfolio</a>
              <a href="/blog" className="text-on-surface-variant hover:text-primary transition-colors">Blog</a>
              <a href="/tools" className="text-on-surface-variant hover:text-primary transition-colors">Tools</a>
              <a href="/about" className="text-on-surface-variant hover:text-primary transition-colors">About</a>
            </div>
          </div>

          {/* Legal */}
          <div>
            <div className="label-md mb-4 text-secondary">Legal</div>
            <div className="flex flex-col gap-3 text-sm">
              <a href="/privacy" className="text-on-surface-variant hover:text-primary transition-colors">Privacy</a>
              <a href="/terms" className="text-on-surface-variant hover:text-primary transition-colors">Terms</a>
            </div>
          </div>

          {/* Connect */}
          <div>
            <div className="label-md mb-4 text-secondary">Connect</div>
            <div className="flex gap-6 text-on-surface-variant">
              <a href="https://github.com" target="_blank" className="hover:text-primary transition-colors">GitHub</a>
              <a href="https://linkedin.com" target="_blank" className="hover:text-primary transition-colors">LinkedIn</a>
              <a href="https://x.com" target="_blank" className="hover:text-primary transition-colors">𝕏</a>
            </div>
            <p className="mt-12 text-xs text-on-surface-variant/60">
              © {new Date().getFullYear()} Alex Reeves. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}