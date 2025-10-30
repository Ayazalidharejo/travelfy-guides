import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
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
    <Card key={id} className="flex flex-col h-full overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="aspect-video overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-lg font-semibold line-clamp-2 h-14">{title}</CardTitle>
        <CardDescription className="line-clamp-3 text-sm text-gray-600 h-16">
          {description}
        </CardDescription>
      </CardHeader>
      <div className="flex-grow"></div>
      <CardFooter>
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full"
        >
          <Button className="w-full bg-[#00b0b9] hover:bg-[#009aa3] text-white">
            Book Now on GetYourGuide
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </a>
      </CardFooter>
    </Card>
  );
};

const GetYourGuideTours = () => {
  // Tour data for the featured Japan tours
  const japanTours = [
    {
      id: '858944',
      title: 'Mount Fuji & Hakone Private Tour from Tokyo',
      imageUrl: 'https://cdn.getyourguide.com/image/format=auto,fit=crop,gravity=auto,quality=60,width=620,height=400,dpr=1/tour_img/21f992460145df176bc2b06292c52352c8c0797a43a64f5ebb74bcc5d36c9136.jpg',
      description: 'Experience the breathtaking beauty of Mount Fuji and the hot springs of Hakone on this private tour from Tokyo.',
      url: 'https://www.getyourguide.com/tokyo-l193/mount-fuji-hakone-private-tour-from-tokyo-t858944/?partner_id=KARVAAN&utm_medium=online_publisher&placement=content-middle&cmp=karvaan-tours'
    },
    // Add more tours as needed
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Japan Tours</h2>
          
        </div>

        

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {japanTours.map((tour) => (
            <TourCard key={tour.id} {...tour} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default GetYourGuideTours;