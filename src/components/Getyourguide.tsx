import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

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
      <Card 
        key={id} 
        className="flex flex-col h-full overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
      >
        <div className="aspect-video overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
        <CardHeader>
          <CardTitle className="text-lg font-semibold line-clamp-2 h-14 text-[#302E2E]">
            {title}
          </CardTitle>
          <CardDescription className="line-clamp-3 text-sm text-gray-600 h-16">
            {description}
          </CardDescription>
        </CardHeader>
        <div className="flex-grow"></div>
        <CardFooter>
          <Button className="w-full bg-[#00b0b9] hover:bg-[#009aa3] text-white">
            View on GetYourGuide
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </a>
  );
};

const GetYourGuideTours = () => {
  const japanTours = [
    {
      id: '858944',
      title: 'Mount Fuji: Customizable Private Tour By Car With Pickup',
      imageUrl: 'https://cdn.getyourguide.com/image/format=auto,fit=crop,gravity=auto,quality=60,width=620,height=400,dpr=1/tour_img/21f992460145df176bc2b06292c52352c8c0797a43a64f5ebb74bcc5d36c9136.jpg',
      description: 'Experience the breathtaking beauty of Mount Fuji and the hot springs of Hakone on this private tour from Tokyo.',
      url: 'https://www.getyourguide.com/tokyo-l193/mount-fuji-customizable-private-tour-by-car-with-pickup-t550155/?preview=SQSJKVCNLDTPKADFCQRC2HW6C4JDM0TD'
    },
    {
      id: '830175',
      title: 'Tokyo: Mt. Fuji & Lake Kawaguchi Private Tour with Transfer',
      imageUrl: 'https://cdn.getyourguide.com/image/format=auto,fit=crop,gravity=auto,quality=60,width=300,height=400,dpr=1/tour_img/a1fe0ca08b46f116c41cf78695679256122398b307eb927222c8e0f659dfc89d.jpg',
      description: 'Explore Kyoto’s temples and the friendly deer of Nara in one unforgettable day trip from Osaka or Kyoto.',
      url: 'https://www.getyourguide.com/tokyo-l193/mount-fuji-lake-kawaguchi-private-tour-with-hotel-pickup-t858944/?preview=CR2M3ED3O2L4GU5JW2R7SB2EOKVZR9XC'
    },
    {
      id: '752981',
      title: 'Nikko Customize Private Tour By Car with Hotel Pickup',
      imageUrl: 'https://cdn.getyourguide.com/image/format=auto,fit=crop,gravity=auto,quality=60,width=620,height=400,dpr=1/tour_img/257eae91546795f05e9ea446d0f1eafa0a3eeaf3cb928f4189dbd7fd1ac8c682.jpg',
      description: 'Enjoy a personalized sightseeing experience in Tokyo with your own private guide and customizable itinerary.',
      url: 'https://www.getyourguide.com/nikko-l89510/nikko-customize-private-tour-by-car-with-hotel-pickup-t838926/?preview=BXEPREZBDSG7F41KBPPBXE95MPKYLLKY'
    },
    {
      id: '887654',
      title: 'Hakone And Mount Fuji Private Tour With Hotel Pick Up',
      imageUrl: 'https://cdn.getyourguide.com/image/format=auto,fit=crop,gravity=auto,quality=60,width=620,height=400,dpr=1/tour_img/e753bb02342599d435a77cbb952015b8016c7f2e29a157da5185f9a8d44840c3.jpg',
      description: 'Walk through the enchanting Arashiyama Bamboo Grove and visit Kyoto’s UNESCO-listed Tenryu-ji Temple.',
      url: 'https://www.getyourguide.com/fujiyoshida-l157144/hakone-and-mount-fuji-private-tour-with-hotel-pick-up-t823417/?preview=I9YJJTGDPYJ2JP1DOXMSSCX5MRDYSL1R'
    },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Japan Tours on GetYourGuide</h2>
        </div>

        <div className="flex justify-center mt-8 mb-4">
          <a href='https://www.getyourguide.com/-s347730' target="_blank" rel="noopener noreferrer">
            <img 
              src='https://gyg.me/kUtga42u' 
              width='160' 
              height='auto' 
              style={{ border: '1px solid #c6c8d0' }} 
              alt='GetYourGuide | KARVAAN TOURS'
            />
          </a>
        </div>

        {/* ✅ Cards — 4 per row on large screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
          {japanTours.map((tour) => (
            <TourCard key={tour.id} {...tour} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GetYourGuideTours;
