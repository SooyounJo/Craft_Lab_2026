import Head from "next/head";
import About from "@/components/About";
import Hero from "@/components/Hero";
import Join from "@/components/Join";
import Medium from "@/components/Medium";
import PageDots from "@/components/PageDots";
import Research from "@/components/Research";
import Work from "@/components/Work";
import useCraftLab from "@/hooks/useCraftLab";

export default function Home() {
  useCraftLab();

  return (
    <>
      <Head>
        <title>CRAFT Lab — Robot as Cultural Medium</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>
      <PageDots />
      <Hero />
      <About />
      <Research />
      <Medium />
      <Work />
      <Join />
      <div className="notice" role="status" hidden>
        이미지 에셋이 아직 없어요. 같은 폴더에서 <code>download-assets.sh</code>를 실행하면 Figma 이미지가{" "}
        <code>assets/</code>에 채워집니다.
      </div>
    </>
  );
}
