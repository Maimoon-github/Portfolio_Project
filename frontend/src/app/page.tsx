import { Hero } from "@/components/sections/Hero";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { LatestBlog } from "@/components/sections/LatestBlog";
import { FeaturedTools } from "@/components/sections/FeaturedTools";
import { ContactCTA } from "@/components/sections/ContactCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <LatestBlog />
      <FeaturedTools />
      <ContactCTA />
    </>
  );
}
