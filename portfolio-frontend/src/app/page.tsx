import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* Section 1: Hero */}
      <section className="relative min-h-[921px] flex items-center justify-center overflow-hidden px-8 pt-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(121,89,0,0.15)_0%,transparent_70%)] -z-10" />
        <div className="max-w-5xl text-center space-y-8">
          <div className="inline-block px-4 py-1 bg-white/5 backdrop-blur-md border border-[#a5c8ff]/10 rounded-full text-[#a5c8ff] text-xs font-['Space_Grotesk'] tracking-[0.2em] uppercase">
            Auspicious Engineering
          </div>
          <h1 className="text-5xl md:text-8xl font-['Space_Grotesk'] font-bold tracking-tighter leading-[0.9] text-white">
            Crafting Fortunate <span className="text-[#ffbf00]">Futures</span> in AI &amp; Code
          </h1>
          <p className="text-xl md:text-2xl text-[#d4c5ab] font-light max-w-2xl mx-auto leading-relaxed">
            Blessed by 146 | Protected by Grace | Building with Intention
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center pt-8">
            <button className="bg-gradient-to-r from-[#ffbf00] to-[#fbbc00] text-[#6d5000] px-10 py-4 rounded-full font-['Space_Grotesk'] font-bold text-lg shadow-[0_20px_40px_rgba(121,89,0,0.2)] hover:scale-105 transition-transform">
              Initiate Project
            </button>
            <button className="bg-white/5 backdrop-blur-md border border-[#a5c8ff]/10 text-[#a5c8ff] px-10 py-4 rounded-full font-['Space_Grotesk'] font-bold text-lg hover:bg-[#005faf]/10 transition-colors flex items-center justify-center gap-2">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
              View Defense
            </button>
          </div>
        </div>
      </section>

      {/* Section 2: Selected Works (Bento Grid) */}
      <section className="max-w-[1440px] mx-auto px-8 py-32">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-4xl font-['Space_Grotesk'] font-bold text-white tracking-tight">Selected Works</h2>
            <p className="text-[#d4c5ab] mt-2 font-['Inter']">Architecture meets aesthetic utility.</p>
          </div>
          <div className="hidden md:block h-px bg-[#d4c5ab]/20 flex-grow mx-12 mb-4"></div>
          <span className="text-[#005faf] font-['Space_Grotesk'] text-sm tracking-widest uppercase">Archive [2024]</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Large Featured Card */}
          <div className="md:col-span-8 group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-md border border-[#a5c8ff]/10 aspect-[16/9]">
            <Image
              alt="minimalist architectural rendering"
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhp9Ex1cwQ_Wl7GfyPhvo2P3dshzGRMv7DhPIqy2jZKULOdu1UQfuP6vy2286-LlYHOXoqgEZCRM3HeFuIYPQY9bPC0MPhzUyz8s1K7nalND450V3s88ywt-7XYjkFAJdhJiAr0oB4yWO041ah23xcSfLzSmUhZDCIp6CaVvNdEdVw3erjcFB17y1TUXMBUigzCtGnx5VM5JJnSW39T2VLM48XN11mplFW0JgKvIQ2VTROvVdIOHaOyGd7xewmoSiDJ9JuJRR9sCs"
              fill
              sizes="(max-width: 768px) 100vw, 66vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 w-full z-10">
              <div className="flex gap-2 mb-4">
                <span className="px-3 py-1 bg-[#795900]/20 text-[#fbbc00] text-[10px] rounded-full font-['Space_Grotesk'] uppercase tracking-widest border border-[#795900]/30">Next.js</span>
                <span className="px-3 py-1 bg-[#005faf]/20 text-[#a5c8ff] text-[10px] rounded-full font-['Space_Grotesk'] uppercase tracking-widest border border-[#005faf]/30">AI Systems</span>
              </div>
              <h3 className="text-3xl font-['Space_Grotesk'] font-bold text-white">Elysian Core Engine</h3>
              <p className="text-stone-300 mt-2 max-w-md">Orchestrating multi-agent systems with deterministic outcome patterns.</p>
            </div>
          </div>
          {/* Tall Card */}
          <div className="md:col-span-4 group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-md border border-[#a5c8ff]/10 min-h-[300px]">
            <Image
              alt="close-up of clean code"
              className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA58Hrh5o2PXfMcQvuYwwMewQuwNDmn0K9W_NQXvhPexKewLgpsbp1i8UmBjuq2JVHXDoj5RIe6HgBUwv1zbZw7lUOnHiegr_VddIocz5bWgrpEARSn1Jw2tjsB1Xa3jTkq6izXfHA4ZRyaGfhHy5fD8JRPRwCAs8EcpBlVdBgbD7Mj7WFUx0y0_TL_w3kQMMNEZxLOO5imsuOFMpz1FeLFZsVkoxGCyqHOyPkn0zPsM2ytj7eUpR6wUeKFARUl3_s7H9j6Jn0SzhE"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 z-10">
              <h3 className="text-xl font-['Space_Grotesk'] font-bold text-white">Curator SDK</h3>
              <p className="text-stone-300 mt-2 text-sm">Minimalist patterns for senior architects building the next generation of web.</p>
            </div>
          </div>
          {/* Grid Item 3 */}
          <div className="md:col-span-4 group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-md border border-[#a5c8ff]/10 aspect-square">
            <Image
              alt="abstract digital waves"
              className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAvwVJaokrcDN5Lvz_E6ZqSV_IAAGB5nlixeC5haBnpHleo0Cy4CV2PVAhcWP8r5pWHANAGIbRkYoXto2Ka5cPgWfnYPdFmr1FAad65TbWk9skS3vcDvF5_2G9WjYmgKVjiDoZAPbyDx5YUtJYNcatvtffGT_5YrSOrZUCkJnSVraWdgaW_TCKJf2HohfP1r4mjv_s7xOtN7cQLISoAn3LyOP8zPN2ZQOclLADZje6igDajQIjwh9umyXuFbdaf2VSkvkGMCybjF1k"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 z-10">
              <h3 className="text-xl font-['Space_Grotesk'] font-bold text-white">Auspicious UI</h3>
            </div>
          </div>
          {/* Grid Item 4 */}
          <div className="md:col-span-8 group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-md border border-[#a5c8ff]/10">
            <div className="p-8 h-full flex flex-col justify-end min-h-[250px]">
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="text-2xl font-['Space_Grotesk'] font-bold text-white">The Sentinel Protocol</h3>
                  <p className="text-stone-300 mt-2">Privacy-first identity layer for decentralised curation.</p>
                </div>
                <button className="material-symbols-outlined text-[#ffbf00] text-4xl">arrow_outward</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Recent Reflections */}
      <section className="bg-white/5 py-32">
        <div className="max-w-[1440px] mx-auto px-8">
          <h2 className="text-4xl font-['Space_Grotesk'] font-bold text-white mb-16 tracking-tight text-center">Recent Reflections</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <article className="p-8 bg-white/5 backdrop-blur-md border border-[#a5c8ff]/10 rounded-xl group hover:border-[#795900]/40 transition-colors">
              <div className="w-12 h-1 bg-[#005faf] mb-6 group-hover:w-24 transition-all duration-500"></div>
              <time className="text-[#a5c8ff] text-xs font-['Space_Grotesk'] uppercase tracking-[0.2em]">March 12, 2024</time>
              <h3 className="text-2xl font-['Space_Grotesk'] font-bold mt-4 mb-4 text-white group-hover:text-[#ffbf00] transition-colors">The Intentional Asymmetry of Modern Layouts</h3>
              <p className="text-[#d4c5ab] text-sm leading-relaxed">Exploring why perfect grids feel industrial and how breaking them creates an architectural aura.</p>
            </article>
            <article className="p-8 bg-white/5 backdrop-blur-md border border-[#a5c8ff]/10 rounded-xl group hover:border-[#795900]/40 transition-colors">
              <div className="w-12 h-1 bg-[#005faf] mb-6 group-hover:w-24 transition-all duration-500"></div>
              <time className="text-[#a5c8ff] text-xs font-['Space_Grotesk'] uppercase tracking-[0.2em]">Feb 28, 2024</time>
              <h3 className="text-2xl font-['Space_Grotesk'] font-bold mt-4 mb-4 text-white group-hover:text-[#ffbf00] transition-colors">AI as the Apprentice Architect</h3>
              <p className="text-[#d4c5ab] text-sm leading-relaxed">Shifting from 'prompt engineering' to 'contextual curation' in large scale software projects.</p>
            </article>
            <article className="p-8 bg-white/5 backdrop-blur-md border border-[#a5c8ff]/10 rounded-xl group hover:border-[#795900]/40 transition-colors">
              <div className="w-12 h-1 bg-[#005faf] mb-6 group-hover:w-24 transition-all duration-500"></div>
              <time className="text-[#a5c8ff] text-xs font-['Space_Grotesk'] uppercase tracking-[0.2em]">Jan 15, 2024</time>
              <h3 className="text-2xl font-['Space_Grotesk'] font-bold mt-4 mb-4 text-white group-hover:text-[#ffbf00] transition-colors">The Protective Blue Foundation</h3>
              <p className="text-[#d4c5ab] text-sm leading-relaxed">Using color theory to create digital spaces that feel safe, technical, and premium simultaneously.</p>
            </article>
          </div>
        </div>
      </section>

      {/* Section 4: Tools of the Trade */}
      <section className="max-w-[1440px] mx-auto px-8 py-32">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-['Space_Grotesk'] font-bold text-white tracking-tight">Tools of the Trade</h2>
          <div className="w-24 h-1 bg-[#ffbf00] mx-auto mt-4"></div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {[
            { icon: "deployed_code", name: "React" },
            { icon: "token", name: "Next.js" },
            { icon: "code_blocks", name: "TypeScript" },
            { icon: "brush", name: "Tailwind" },
            { icon: "database", name: "Django" },
            { icon: "terminal", name: "Python" }
          ].map((tool) => (
            <div key={tool.name} className="flex flex-col items-center gap-4 group">
              <div className="w-16 h-16 bg-white/5 backdrop-blur-md border border-[#a5c8ff]/10 rounded-xl flex items-center justify-center group-hover:bg-[#005faf]/20 transition-all">
                <span className="material-symbols-outlined text-[#a5c8ff] text-3xl">{tool.icon}</span>
              </div>
              <span className="font-['Space_Grotesk'] text-xs tracking-widest uppercase text-[#d4c5ab]">{tool.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: Final CTA */}
      <section className="max-w-[1440px] mx-auto px-8 pb-32">
        <div className="bg-white text-stone-950 p-12 md:p-24 rounded-3xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#ffbf00]/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-['Space_Grotesk'] font-bold tracking-tighter leading-none mb-6">Let's Build Something Auspicious Together</h2>
            <p className="text-stone-600 text-lg">Harnessing the technical precision of a senior architect with the radiant vision of a curator.</p>
          </div>
          <div className="relative z-10 flex flex-col items-center gap-4">
            <button className="bg-[#795900] text-white px-12 py-5 rounded-full font-['Space_Grotesk'] font-bold text-xl hover:scale-105 transition-transform shadow-xl flex items-center gap-3">
              Start Exploration
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>shield</span>
            </button>
            <p className="text-stone-400 font-['Space_Grotesk'] text-xs uppercase tracking-[0.3em]">Protected by Digital Grace</p>
          </div>
        </div>
      </section>
    </>
  );
}