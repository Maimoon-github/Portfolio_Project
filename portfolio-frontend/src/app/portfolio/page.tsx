import Image from "next/image";
import Link from "next/link";

export default async function PortfolioPage() {
  return (
    <div className="pt-24 min-h-screen">
      <section className="max-w-[1440px] mx-auto px-8 py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <div className="inline-block px-4 py-1 mb-6 bg-white/5 backdrop-blur-md border border-[#a5c8ff]/10 rounded-full text-[#a5c8ff] text-xs font-['Space_Grotesk'] tracking-[0.2em] uppercase">
              Selected Works
            </div>
            <h1 className="text-5xl md:text-7xl font-['Space_Grotesk'] font-bold text-white tracking-tight">Portfolio</h1>
            <p className="text-[#d4c5ab] mt-6 font-['Inter'] text-xl max-w-2xl leading-relaxed">
              Architecture meets aesthetic utility. A collection of production-grade intelligence systems and full-stack curation.
            </p>
          </div>
          <div className="hidden md:block h-px bg-[#d4c5ab]/20 flex-grow mx-12 mb-4"></div>
          <span className="text-[#005faf] font-['Space_Grotesk'] text-sm tracking-widest uppercase shrink-0">Archive [2024]</span>
        </div>

        {/* Filter Tabs Skeleton (Design only) */}
        <div className="flex flex-wrap gap-4 mb-12">
          {['All', 'AI Systems', 'Full Stack', 'Architecture'].map((tab, i) => (
            <button key={tab} className={`px-6 py-2 rounded-full font-['Space_Grotesk'] text-sm font-medium tracking-wide transition-all ${i === 0 ? 'bg-[#ffbf00] text-[#6d5000] border border-[#ffbf00]' : 'bg-white/5 text-[#d4c5ab] border border-[#a5c8ff]/10 hover:bg-white/10 hover:text-white'}`}>
              {tab}
            </button>
          ))}
        </div>

        {/* Masonry/Grid of Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <Link href="/portfolio/elysian" className="group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-md border border-[#a5c8ff]/10 aspect-square flex flex-col">
            <div className="relative flex-grow overflow-hidden">
               <Image
                alt="project thumbnail"
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhp9Ex1cwQ_Wl7GfyPhvo2P3dshzGRMv7DhPIqy2jZKULOdu1UQfuP6vy2286-LlYHOXoqgEZCRM3HeFuIYPQY9bPC0MPhzUyz8s1K7nalND450V3s88ywt-7XYjkFAJdhJiAr0oB4yWO041ah23xcSfLzSmUhZDCIp6CaVvNdEdVw3erjcFB17y1TUXMBUigzCtGnx5VM5JJnSW39T2VLM48XN11mplFW0JgKvIQ2VTROvVdIOHaOyGd7xewmoSiDJ9JuJRR9sCs"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent"></div>
            </div>
            <div className="absolute bottom-0 left-0 p-8 w-full z-10">
              <div className="flex gap-2 mb-4">
                <span className="px-3 py-1 bg-[#795900]/20 text-[#fbbc00] text-[10px] rounded-full font-['Space_Grotesk'] uppercase tracking-widest border border-[#795900]/30">Next.js</span>
              </div>
              <h3 className="text-2xl font-['Space_Grotesk'] font-bold text-white group-hover:text-[#ffbf00] transition-colors">Elysian Core Engine</h3>
              <p className="text-[#d4c5ab] mt-2 text-sm line-clamp-2">Orchestrating multi-agent systems with deterministic outcome patterns.</p>
            </div>
          </Link>

          {/* Card 2 */}
          <Link href="/portfolio/curator" className="group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-md border border-[#a5c8ff]/10 aspect-square flex flex-col">
            <div className="relative flex-grow overflow-hidden">
               <Image
                alt="project thumbnail"
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA58Hrh5o2PXfMcQvuYwwMewQuwNDmn0K9W_NQXvhPexKewLgpsbp1i8UmBjuq2JVHXDoj5RIe6HgBUwv1zbZw7lUOnHiegr_VddIocz5bWgrpEARSn1Jw2tjsB1Xa3jTkq6izXfHA4ZRyaGfhHy5fD8JRPRwCAs8EcpBlVdBgbD7Mj7WFUx0y0_TL_w3kQMMNEZxLOO5imsuOFMpz1FeLFZsVkoxGCyqHOyPkn0zPsM2ytj7eUpR6wUeKFARUl3_s7H9j6Jn0SzhE"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent"></div>
            </div>
            <div className="absolute bottom-0 left-0 p-8 w-full z-10">
              <div className="flex gap-2 mb-4">
                <span className="px-3 py-1 bg-[#005faf]/20 text-[#a5c8ff] text-[10px] rounded-full font-['Space_Grotesk'] uppercase tracking-widest border border-[#005faf]/30">Architecture</span>
              </div>
              <h3 className="text-2xl font-['Space_Grotesk'] font-bold text-white group-hover:text-[#ffbf00] transition-colors">Curator SDK</h3>
              <p className="text-[#d4c5ab] mt-2 text-sm line-clamp-2">Minimalist patterns for senior architects building the next generation of web.</p>
            </div>
          </Link>
          
          {/* Card 3 */}
          <Link href="/portfolio/auspicious-ui" className="group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-md border border-[#a5c8ff]/10 aspect-square flex flex-col">
            <div className="relative flex-grow overflow-hidden">
               <Image
                alt="project thumbnail"
                className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvwVJaokrcDN5Lvz_E6ZqSV_IAAGB5nlixeC5haBnpHleo0Cy4CV2PVAhcWP8r5pWHANAGIbRkYoXto2Ka5cPgWfnYPdFmr1FAad65TbWk9skS3vcDvF5_2G9WjYmgKVjiDoZAPbyDx5YUtJYNcatvtffGT_5YrSOrZUCkJnSVraWdgaW_TCKJf2HohfP1r4mjv_s7xOtN7cQLISoAn3LyOP8zPN2ZQOclLADZje6igDajQIjwh9umyXuFbdaf2VSkvkGMCybjF1k"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent"></div>
            </div>
            <div className="absolute bottom-0 left-0 p-8 w-full z-10">
              <div className="flex gap-2 mb-4">
                <span className="px-3 py-1 bg-[#795900]/20 text-[#fbbc00] text-[10px] rounded-full font-['Space_Grotesk'] uppercase tracking-widest border border-[#795900]/30">UI/UX</span>
              </div>
              <h3 className="text-2xl font-['Space_Grotesk'] font-bold text-white group-hover:text-[#ffbf00] transition-colors">Auspicious UI</h3>
              <p className="text-[#d4c5ab] mt-2 text-sm line-clamp-2">A design system blessed by the Ramal 146 energy.</p>
            </div>
          </Link>
        </div>
      </section>
    </div>
  )
}