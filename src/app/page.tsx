import { Hero } from "@/components/sections/Hero";
import { RecentWork } from "@/components/sections/RecentWork";
import { Blogs } from "@/components/sections/Blogs";
import { MyLife } from "@/components/sections/MyLife";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <RecentWork />
      <MyLife />
      <Contact />
    </>
  );
}
