// src/app/(legal)/terms/page.tsx  [SSG]
import { compileMDX } from "next-mdx-remote/rsc"
import fs from "fs"
import path from "path"

export default async function TermsPage() {
  const filePath = path.join(process.cwd(), "content", "terms.mdx")
  const source = fs.readFileSync(filePath, "utf8")
  const { content } = await compileMDX({ source })

  return (
    <div className="prose dark:prose-invert mx-auto max-w-2xl py-12">
      {content}
    </div>
  )
}