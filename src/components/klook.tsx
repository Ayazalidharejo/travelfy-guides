import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import monky from "@/../public/monky.webp"

interface TourCardProps {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  url: string;
}

const TourCard: React.FC<TourCardProps> = ({ id, title, imageUrl, description, url }) => {
  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block h-full group"
    >
      <Card key={id} className="flex flex-col h-full overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="relative aspect-video overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute top-2 right-2 bg-white text-xs px-2 py-1 rounded shadow font-semibold">
            Approved by Klook
          </div>
        </div>
        <CardHeader>
          <CardTitle className="text-lg font-semibold line-clamp-2 h-14">{title}</CardTitle>
          <CardDescription className="line-clamp-3 text-sm text-gray-600 h-16">
            {description}
          </CardDescription>
        </CardHeader>
        <div className="flex-grow"></div>
        <CardFooter>
          <Button className="w-full bg-[#ff5722] hover:bg-[#e64a19] text-white font-medium rounded-md">
            Book Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </a>
  );
};

const KlookTours = () => {
  const tours = [
    {
      id: '1',
      title: 'Mount Fuji & Hakone Full-Day Private Tour',
      imageUrl: 'https://res.klook.com/image/upload/c_crop,h_1875,w_3000,x_0,y_1063,z_0.1/w_1265,h_785,c_fill,q_85/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/bnfywoi1tztoxedrc3hn.webp',
      description: 'Experience the breathtaking beauty of Mount Fuji and the hot springs of Hakone.',
      url: 'https://www.klook.com/en-US/activity/168992-lake-kawaguchi-mount-fuji-one-day-historical-unesco-site-tour/?spm=SearchResult.SearchStart_TopicListing_LIST&clickId=72f939c9d7'
    },
    {
      id: '2',
      title: 'Kyoto & Nara Day Tour',
      imageUrl: 'https://res.klook.com/image/upload/w_750,h_469,c_fill,q_85/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/tsykjwx3uy45wd9y4nag.webp',
      description: 'Explore Kyoto’s temples and the friendly deer of Nara in one unforgettable day trip.',
      url: 'https://www.klook.com/en-US/activity/178300-tokyo-city-full-day-private-customizable-tour/?lang=en_US'
    },
    {
      id: '3',
      title: 'Nikko One-day Customizable & Private Tour',
      imageUrl: 'https://res.klook.com/image/upload/w_750,h_469,c_fill,q_85/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/kamdjz3ga2dwb2jp6nha.webp',
      description: 'Enjoy a personalized sightseeing experience in Tokyo with a private guide.',
      url: 'https://www.klook.com/en-US/activity/170029-nikko-one-day-customizable-private-tour/?lang=en_US'
    },
    {
      id: '4',
      title: 'Nagano Snow Monkey Park Full-Day Private Guided Tour',
      imageUrl: monky,
      description: 'Walk through the enchanting Arashiyama Bamboo Grove and visit Tenryu-ji Temple.',
      url: 'https://www.klook.com/en-US/activity/178385-nagano-snow-monkey-park-full-day-private-guided-tour/?lang=en_US'
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Japan Tours on Klook</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {tours.map((tour) => (
            <TourCard key={tour.id} {...tour} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default KlookTours;
