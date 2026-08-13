import { IntroScreen } from '@/components/home/IntroScreen';
import { Hero } from '@/components/home/Hero';
import { CollectionBlocks } from '@/components/home/CollectionBlocks';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { EditorialSection } from '@/components/home/EditorialSection';
import { CinematicScroll } from '@/components/home/CinematicScroll';
import { StorySection } from '@/components/home/StorySection';
import { ManifestoSection } from '@/components/home/ManifestoSection';
import { DetailsSection } from '@/components/home/DetailsSection';
import { LookbookPreview } from '@/components/home/LookbookPreview';
import { InstagramGrid } from '@/components/home/InstagramGrid';
import { NewsletterSection } from '@/components/home/NewsletterSection';

export default function Home() {
  return (
    <>
      <IntroScreen />
      <Hero />
      <CollectionBlocks />
      <FeaturedProducts />
      <EditorialSection />
      <StorySection />
      <DetailsSection />
      <CinematicScroll />
      <ManifestoSection />
      <LookbookPreview />
      <InstagramGrid />
      <NewsletterSection />
    </>
  );
}
