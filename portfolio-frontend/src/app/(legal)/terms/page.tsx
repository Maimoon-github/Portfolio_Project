// src/app/(legal)/terms/page.tsx
// [SSG] Terms of Service — rendered from markdown via next-mdx-remote
import { MDXRemote } from 'next-mdx-remote/rsc'
import fs from 'fs/promises'
import path from 'path'

export default async function TermsPage() {
  const mdxSource = await fs.readFile(
    path.join(process.cwd(), 'content/terms.mdx'),
    'utf8'
  )

  return (
    <article className="max-w-3xl mx-auto px-6 py-16 prose prose-invert">
      <MDXRemote source={mdxSource} />
    </article>
  )
}