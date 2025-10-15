import { Link } from 'react-router-dom';
import { Plane, MapPin, Compass, Globe, Heart, Star, Sparkles, Award } from 'lucide-react';

// ============================================
// VERSION 1: Card with Shadow
// ============================================
export function IntroVersion1() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-xl p-10 md:p-12">
          <div className="text-center mb-6">
            <Plane className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              About Karvaan Tours
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed text-center">
            Welcome to Karvaan Tours, your trusted travel partner for exploring the world's most beautiful destinations. 
            We specialize in creating unforgettable travel experiences that combine adventure, culture, and comfort. 
            Our expert team carefully designs each tour to ensure you discover the authentic essence of every location. 
            With years of experience in the travel industry, we pride ourselves on providing personalized service and attention to detail. 
            From breathtaking landscapes to cultural immersion, we handle every aspect of your journey. 
            At Karvaan Tours, we believe travel is not just about destinations, but about creating memories that last a lifetime.
          </p>
        </div>
      </div>
    </section>
  );
}

// ============================================
// VERSION 2: Gradient Border Card
// ============================================
export function IntroVersion2() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-1">
          <div className="bg-white rounded-2xl p-10 md:p-12">
            <div className="text-center mb-6">
              <Globe className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                About Karvaan Tours
              </h2>
            </div>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed text-center">
              Welcome to Karvaan Tours, your trusted travel partner for exploring the world's most beautiful destinations. 
              We specialize in creating unforgettable travel experiences that combine adventure, culture, and comfort. 
              Our expert team carefully designs each tour to ensure you discover the authentic essence of every location. 
              With years of experience in the travel industry, we pride ourselves on providing personalized service and attention to detail. 
              From breathtaking landscapes to cultural immersion, we handle every aspect of your journey. 
              At Karvaan Tours, we believe travel is not just about destinations, but about creating memories that last a lifetime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// VERSION 3: Left Border Accent
// ============================================
export function IntroVersion3() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="border-l-8 border-red-600 bg-white rounded-r-2xl shadow-lg p-10 md:p-12 hover:shadow-2xl transition-shadow duration-300">
          <div className="mb-6">
            <MapPin className="w-12 h-12 text-red-600 mb-4" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              About Karvaan Tours
            </h2>
            <p className="text-red-600 font-semibold text-lg">Your Journey, Our Passion</p>
          </div>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Welcome to Karvaan Tours, your trusted travel partner for exploring the world's most beautiful destinations. 
            We specialize in creating unforgettable travel experiences that combine adventure, culture, and comfort. 
            Our expert team carefully designs each tour to ensure you discover the authentic essence of every location. 
            With years of experience in the travel industry, we pride ourselves on providing personalized service and attention to detail. 
            From breathtaking landscapes to cultural immersion, we handle every aspect of your journey. 
            At Karvaan Tours, we believe travel is not just about destinations, but about creating memories that last a lifetime.
          </p>
        </div>
      </div>
    </section>
  );
}

// ============================================
// VERSION 4: Two-Tone Background
// ============================================
export function IntroVersion4() {
  return (
    <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)' }}>
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-10 md:p-12">
          <div className="text-center mb-6">
            <Compass className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              About Karvaan Tours
            </h2>
            <div className="flex items-center justify-center gap-2 mt-4">
              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
            </div>
          </div>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed text-center">
            Welcome to Karvaan Tours, your trusted travel partner for exploring the world's most beautiful destinations. 
            We specialize in creating unforgettable travel experiences that combine adventure, culture, and comfort. 
            Our expert team carefully designs each tour to ensure you discover the authentic essence of every location. 
            With years of experience in the travel industry, we pride ourselves on providing personalized service and attention to detail. 
            From breathtaking landscapes to cultural immersion, we handle every aspect of your journey. 
            At Karvaan Tours, we believe travel is not just about destinations, but about creating memories that last a lifetime.
          </p>
        </div>
      </div>
    </section>
  );
}

// ============================================
// VERSION 5: Icon Grid Header
// ============================================
export function IntroVersion5() {
  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
            <Heart className="w-10 h-10 text-red-600 fill-red-600" />
            <Star className="w-8 h-8 text-yellow-500 fill-yellow-500" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About Karvaan Tours
          </h2>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-600 to-red-600 mx-auto rounded-full"></div>
        </div>
        <div className="bg-white rounded-2xl shadow-lg p-10 md:p-12 hover:shadow-xl transition-shadow duration-300">
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed text-center">
            Welcome to Karvaan Tours, your trusted travel partner for exploring the world's most beautiful destinations. 
            We specialize in creating unforgettable travel experiences that combine adventure, culture, and comfort. 
            Our expert team carefully designs each tour to ensure you discover the authentic essence of every location. 
            With years of experience in the travel industry, we pride ourselves on providing personalized service and attention to detail. 
            From breathtaking landscapes to cultural immersion, we handle every aspect of your journey. 
            At Karvaan Tours, we believe travel is not just about destinations, but about creating memories that last a lifetime.
          </p>
        </div>
      </div>
    </section>
  );
}

// ============================================
// VERSION 6: Dual Card Layout
// ============================================
export function IntroVersion6() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-6 items-center">
          <div className="md:col-span-1 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
            <Award className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Trusted</h3>
            <p className="text-sm">By Thousands</p>
          </div>
          <div className="md:col-span-2 bg-white rounded-2xl shadow-xl p-10">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About Karvaan Tours
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Welcome to Karvaan Tours, your trusted travel partner for exploring the world's most beautiful destinations. 
              We specialize in creating unforgettable travel experiences that combine adventure, culture, and comfort. 
              Our expert team carefully designs each tour to ensure you discover the authentic essence of every location. 
              With years of experience in the travel industry, we pride ourselves on providing personalized service and attention to detail. 
              From breathtaking landscapes to cultural immersion, we handle every aspect of your journey.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// VERSION 7: Quote Style
// ============================================
export function IntroVersion7() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="relative">
          <div className="absolute -top-6 -left-4 text-9xl text-blue-200 font-serif">"</div>
          <div className="relative bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl shadow-lg p-10 md:p-12 border-l-4 border-blue-600">
            <div className="mb-6">
              <Sparkles className="w-10 h-10 text-blue-600 mb-4" />
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                About Karvaan Tours
              </h2>
            </div>
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed italic">
              Welcome to Karvaan Tours, your trusted travel partner for exploring the world's most beautiful destinations. 
              We specialize in creating unforgettable travel experiences that combine adventure, culture, and comfort. 
              Our expert team carefully designs each tour to ensure you discover the authentic essence of every location. 
              With years of experience in the travel industry, we pride ourselves on providing personalized service and attention to detail. 
              From breathtaking landscapes to cultural immersion, we handle every aspect of your journey. 
              At Karvaan Tours, we believe travel is not just about destinations, but about creating memories that last a lifetime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// VERSION 8: Split Background
// ============================================
export function IntroVersion8() {
  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 60%, 0 100%)' }}></div>
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl p-10 md:p-12 mt-12">
          <div className="text-center mb-6">
            <div className="inline-block bg-[#5C7AC0]  hover:bg-[#284078] rounded-full p-4 mb-4">
              <Globe className="w-12 h-12 text-blue-600" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              About Karvaan Tours
            </h2>
          </div>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed text-center">
            Welcome to Karvaan Tours, your trusted travel partner for exploring the world's most beautiful destinations. 
            We specialize in creating unforgettable travel experiences that combine adventure, culture, and comfort. 
            Our expert team carefully designs each tour to ensure you discover the authentic essence of every location. 
            With years of experience in the travel industry, we pride ourselves on providing personalized service and attention to detail. 
            From breathtaking landscapes to cultural immersion, we handle every aspect of your journey. 
            At Karvaan Tours, we believe travel is not just about destinations, but about creating memories that last a lifetime.
          </p>
        </div>
      </div>
    </section>
  );
}

// ============================================
// VERSION 9: Badge Style
// ============================================
export function IntroVersion9() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-8">
          <span className="inline-block bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider mb-6">
            Premium Travel Experience
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About Karvaan Tours
          </h2>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-10 md:p-12 border-t-4 border-red-600">
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0">
              <Compass className="w-12 h-12 text-red-600" />
            </div>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Welcome to Karvaan Tours, your trusted travel partner for exploring the world's most beautiful destinations. 
              We specialize in creating unforgettable travel experiences that combine adventure, culture, and comfort. 
              Our expert team carefully designs each tour to ensure you discover the authentic essence of every location. 
              With years of experience in the travel industry, we pride ourselves on providing personalized service and attention to detail. 
              From breathtaking landscapes to cultural immersion, we handle every aspect of your journey. 
              At Karvaan Tours, we believe travel is not just about destinations, but about creating memories that last a lifetime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// VERSION 10: Overlapping Cards
// ============================================
export function IntroVersion10() {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-100 to-blue-100">
      <div className="max-w-4xl mx-auto px-6">
        <div className="relative">
          <div className="absolute -top-4 -left-4 w-full h-full bg-gradient-to-br from-purple-400 to-blue-400 rounded-2xl opacity-20"></div>
          <div className="relative bg-white rounded-2xl shadow-2xl p-10 md:p-12">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-full p-3">
                <Plane className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                  About Karvaan Tours
                </h2>
              </div>
            </div>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Welcome to Karvaan Tours, your trusted travel partner for exploring the world's most beautiful destinations. 
              We specialize in creating unforgettable travel experiences that combine adventure, culture, and comfort. 
              Our expert team carefully designs each tour to ensure you discover the authentic essence of every location. 
              With years of experience in the travel industry, we pride ourselves on providing personalized service and attention to detail. 
              From breathtaking landscapes to cultural immersion, we handle every aspect of your journey. 
              At Karvaan Tours, we believe travel is not just about destinations, but about creating memories that last a lifetime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// VERSION 11: Minimal with Accent Line
// ============================================
export function IntroVersion11() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="border-b-4 border-gradient-to-r from-blue-600 to-purple-600 pb-6 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              About Karvaan Tours
            </h2>
          </div>
        </div>
        <div className="bg-gray-50 rounded-xl p-10 md:p-12">
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Welcome to Karvaan Tours, your trusted travel partner for exploring the world's most beautiful destinations. 
            We specialize in creating unforgettable travel experiences that combine adventure, culture, and comfort. 
            Our expert team carefully designs each tour to ensure you discover the authentic essence of every location. 
            With years of experience in the travel industry, we pride ourselves on providing personalized service and attention to detail. 
            From breathtaking landscapes to cultural immersion, we handle every aspect of your journey. 
            At Karvaan Tours, we believe travel is not just about destinations, but about creating memories that last a lifetime.
          </p>
        </div>
      </div>
    </section>
  );
}

// ============================================
// VERSION 12: Corner Accent
// ============================================
export function IntroVersion12() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="relative bg-white rounded-2xl shadow-xl p-10 md:p-12">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-600 to-orange-600 rounded-bl-full opacity-10"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-tr-full opacity-10"></div>
          <div className="relative z-10">
            <div className="text-center mb-6">
              <Heart className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                About Karvaan Tours
              </h2>
              <div className="flex items-center justify-center gap-2">
                <div className="h-1 w-16 bg-red-600 rounded"></div>
                <div className="h-1 w-4 bg-blue-600 rounded"></div>
                <div className="h-1 w-16 bg-red-600 rounded"></div>
              </div>
            </div>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed text-center">
              Welcome to Karvaan Tours, your trusted travel partner for exploring the world's most beautiful destinations. 
              We specialize in creating unforgettable travel experiences that combine adventure, culture, and comfort. 
              Our expert team carefully designs each tour to ensure you discover the authentic essence of every location. 
              With years of experience in the travel industry, we pride ourselves on providing personalized service and attention to detail. 
              From breathtaking landscapes to cultural immersion, we handle every aspect of your journey. 
              At Karvaan Tours, we believe travel is not just about destinations, but about creating memories that last a lifetime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// VERSION 13: Floating Card
// ============================================
export function IntroVersion13() {
  return (
    <section className="py-20 bg-gradient-to-b from-blue-600 to-purple-600">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-2xl p-10 md:p-12 transform hover:-translate-y-2 transition-transform duration-300">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl p-3">
                <Globe className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                About Karvaan Tours
              </h2>
            </div>
          </div>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Welcome to Karvaan Tours, your trusted travel partner for exploring the world's most beautiful destinations. 
            We specialize in creating unforgettable travel experiences that combine adventure, culture, and comfort. 
            Our expert team carefully designs each tour to ensure you discover the authentic essence of every location. 
            With years of experience in the travel industry, we pride ourselves on providing personalized service and attention to detail. 
            From breathtaking landscapes to cultural immersion, we handle every aspect of your journey. 
            At Karvaan Tours, we believe travel is not just about destinations, but about creating memories that last a lifetime.
          </p>
        </div>
      </div>
    </section>
  );
}

// ============================================
// VERSION 14: Icon Badge Grid
// ============================================
export function IntroVersion14() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-[#5C7AC0]  hover:bg-[#284078] rounded-full flex items-center justify-center">
              <Star className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              About Karvaan Tours
            </h2>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl shadow-lg p-10 md:p-12 border border-gray-200">
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed text-center">
            Welcome to Karvaan Tours, your trusted travel partner for exploring the world's most beautiful destinations. 
            We specialize in creating unforgettable travel experiences that combine adventure, culture, and comfort. 
            Our expert team carefully designs each tour to ensure you discover the authentic essence of every location. 
            With years of experience in the travel industry, we pride ourselves on providing personalized service and attention to detail. 
            From breathtaking landscapes to cultural immersion, we handle every aspect of your journey. 
            At Karvaan Tours, we believe travel is not just about destinations, but about creating memories that last a lifetime.
          </p>
        </div>
      </div>
    </section>
  );
}

// ============================================
// VERSION 15: Gradient Text Header
// ============================================
export function IntroVersion15() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-xl p-10 md:p-12">
          <div className="text-center mb-8">
            <Compass className="w-14 h-14 text-red-600 mx-auto mb-4" />
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              About Karvaan Tours
            </h2>
            <p className="text-xl text-gray-500 font-medium">Creating Memories Worldwide</p>
          </div>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed text-center">
            Welcome to Karvaan Tours, your trusted travel partner for exploring the world's most beautiful destinations. 
            We specialize in creating unforgettable travel experiences that combine adventure, culture, and comfort. 
            Our expert team carefully designs each tour to ensure you discover the authentic essence of every location. 
            With years of experience in the travel industry, we pride ourselves on providing personalized service and attention to detail. 
            From breathtaking landscapes to cultural immersion, we handle every aspect of your journey. 
            At Karvaan Tours, we believe travel is not just about destinations, but about creating memories that last a lifetime.
          </p>
        </div>
      </div>
    </section>
  );
}

// ============================================
// VERSION 16: Double Border
// ============================================
export function IntroVersion16() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="border-4 border-blue-200 rounded-2xl p-2">
          <div className="border-4 border-red-200 rounded-xl bg-gradient-to-br from-gray-50 to-white p-10 md:p-12">
            <div className="flex items-center gap-4 mb-6">
              <Award className="w-12 h-12 text-blue-600" />
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                  About Karvaan Tours
                </h2>
                <p className="text-red-600 font-semibold">Your Trusted Travel Partner</p>
              </div>
            </div>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Welcome to Karvaan Tours, your trusted travel partner for exploring the world's most beautiful destinations. 
              We specialize in creating unforgettable travel experiences that combine adventure, culture, and comfort. 
              Our expert team carefully designs each tour to ensure you discover the authentic essence of every location. 
              With years of experience in the travel industry, we pride ourselves on providing personalized service and attention to detail. 
              From breathtaking landscapes to cultural immersion, we handle every aspect of your journey. 
              At Karvaan Tours, we believe travel is not just about destinations, but about creating memories that last a lifetime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// VERSION 17: Side Icon
// ============================================
export function IntroVersion17() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-5xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/4 bg-gradient-to-br from-blue-600 to-purple-600 p-8 flex items-center justify-center">
              <Plane className="w-24 h-24 text-white" />
            </div>
            <div className="md:w-3/4 p-10 md:p-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                About Karvaan Tours
              </h2>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                Welcome to Karvaan Tours, your trusted travel partner for exploring the world's most beautiful destinations. 
                We specialize in creating unforgettable travel experiences that combine adventure, culture, and comfort. 
                Our expert team carefully designs each tour to ensure you discover the authentic essence of every location. 
                With years of experience in the travel industry, we pride ourselves on providing personalized service and attention to detail. 
                From breathtaking landscapes to cultural immersion, we handle every aspect of your journey.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// VERSION 18: Ribbon Style
// ============================================
export function IntroVersion18() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="relative bg-white rounded-2xl shadow-xl p-10 md:p-12">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-3 rounded-full shadow-lg">
              <span className="font-bold text-sm uppercase tracking-wider">Premium Service</span>
            </div>
          </div>
          <div className="mt-8 text-center mb-6">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              About Karvaan Tours
            </h2>
            <Sparkles className="w-10 h-10 text-orange-600 mx-auto" />
          </div>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed text-center">
            Welcome to Karvaan Tours, your trusted travel partner for exploring the world's most beautiful destinations. 
            We specialize in creating unforgettable travel experiences that combine adventure, culture, and comfort. 
            Our expert team carefully designs each tour to ensure you discover the authentic essence of every location. 
            With years of experience in the travel industry, we pride ourselves on providing personalized service and attention to detail. 
            From breathtaking landscapes to cultural immersion, we handle every aspect of your journey. 
            At Karvaan Tours, we believe travel is not just about destinations, but about creating memories that last a lifetime.
          </p>
        </div>
      </div>
    </section>
  );
}

// ============================================
// VERSION 19: Diagonal Split
// ============================================
export function IntroVersion19() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 0 100%)' }}></div>
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="bg-white rounded-2xl shadow-2xl p-10 md:p-12 mt-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center transform rotate-6">
              <Globe className="w-10 h-10 text-white transform -rotate-6" />
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
                About Karvaan Tours
              </h2>
            </div>
          </div>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Welcome to Karvaan Tours, your trusted travel partner for exploring the world's most beautiful destinations. 
            We specialize in creating unforgettable travel experiences that combine adventure, culture, and comfort. 
            Our expert team carefully designs each tour to ensure you discover the authentic essence of every location. 
            With years of experience in the travel industry, we pride ourselves on providing personalized service and attention to detail. 
            From breathtaking landscapes to cultural immersion, we handle every aspect of your journey. 
            At Karvaan Tours, we believe travel is not just about destinations, but about creating memories that last a lifetime.
          </p>
        </div>
      </div>
    </section>
  );
}

// ============================================
// VERSION 20: Modern Minimal
// ============================================
export function IntroVersion20() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="space-y-8">
          <div className="flex items-center gap-6">
            <div className="flex-shrink-0 w-1 h-24 bg-gradient-to-b from-blue-600 to-red-600 rounded-full"></div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                About Karvaan Tours
              </h2>
              <p className="text-xl text-blue-600 font-semibold">Excellence in Travel</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-10 md:p-12 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-start gap-4">
              <MapPin className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                Welcome to Karvaan Tours, your trusted travel partner for exploring the world's most beautiful destinations. 
                We specialize in creating unforgettable travel experiences that combine adventure, culture, and comfort. 
                Our expert team carefully designs each tour to ensure you discover the authentic essence of every location. 
                With years of experience in the travel industry, we pride ourselves on providing personalized service and attention to detail. 
                From breathtaking landscapes to cultural immersion, we handle every aspect of your journey. 
                At Karvaan Tours, we believe travel is not just about destinations, but about creating memories that last a lifetime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// VERSION 21: Boxed Header
// ============================================
export function IntroVersion21() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-red-600 to-orange-600 p-8 text-center">
            <Heart className="w-12 h-12 text-white mx-auto mb-3" />
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              About Karvaan Tours
            </h2>
          </div>
          <div className="p-10 md:p-12">
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed text-center">
              Welcome to Karvaan Tours, your trusted travel partner for exploring the world's most beautiful destinations. 
              We specialize in creating unforgettable travel experiences that combine adventure, culture, and comfort. 
              Our expert team carefully designs each tour to ensure you discover the authentic essence of every location. 
              With years of experience in the travel industry, we pride ourselves on providing personalized service and attention to detail. 
              From breathtaking landscapes to cultural immersion, we handle every aspect of your journey. 
              At Karvaan Tours, we believe travel is not just about destinations, but about creating memories that last a lifetime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// VERSION 22: Stacked Cards
// ============================================
export function IntroVersion22() {
  return (
    <section className="py-20 bg-gradient-to-b from-blue-100 to-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="relative">
          <div className="absolute top-4 left-4 right-4 h-full bg-blue-200 rounded-2xl"></div>
          <div className="absolute top-2 left-2 right-2 h-full bg-blue-300 rounded-2xl"></div>
          <div className="relative bg-white rounded-2xl shadow-2xl p-10 md:p-12">
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full mb-6">
                <Star className="w-5 h-5" />
                <span className="font-bold">Trusted Worldwide</span>
                <Star className="w-5 h-5" />
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                About Karvaan Tours
              </h2>
            </div>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed text-center">
              Welcome to Karvaan Tours, your trusted travel partner for exploring the world's most beautiful destinations. 
              We specialize in creating unforgettable travel experiences that combine adventure, culture, and comfort. 
              Our expert team carefully designs each tour to ensure you discover the authentic essence of every location. 
              With years of experience in the travel industry, we pride ourselves on providing personalized service and attention to detail. 
              From breathtaking landscapes to cultural immersion, we handle every aspect of your journey. 
              At Karvaan Tours, we believe travel is not just about destinations, but about creating memories that last a lifetime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// VERSION 23: Icon Corner Badge
// ============================================
export function IntroVersion23() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="relative bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl shadow-xl p-10 md:p-12 border-2 border-blue-200">
          <div className="absolute -top-6 -right-6 w-20 h-20 bg-gradient-to-br from-red-600 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
            <Award className="w-10 h-10 text-white" />
          </div>
          <div className="mb-6">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
              About Karvaan Tours
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-orange-600 rounded-full"></div>
          </div>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
            Welcome to Karvaan Tours, your trusted travel partner for exploring the world's most beautiful destinations. 
            We specialize in creating unforgettable travel experiences that combine adventure, culture, and comfort. 
            Our expert team carefully designs each tour to ensure you discover the authentic essence of every location. 
            With years of experience in the travel industry, we pride ourselves on providing personalized service and attention to detail. 
            From breathtaking landscapes to cultural immersion, we handle every aspect of your journey. 
            At Karvaan Tours, we believe travel is not just about destinations, but about creating memories that last a lifetime.
          </p>
        </div>
      </div>
    </section>
  );
}

// ============================================
// VERSION 24: Timeline Style
// ============================================
export function IntroVersion24() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex gap-6">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <div className="w-1 flex-1 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full mt-4"></div>
          </div>
          <div className="flex-1 bg-white rounded-2xl shadow-xl p-10 md:p-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About Karvaan Tours
            </h2>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Welcome to Karvaan Tours, your trusted travel partner for exploring the world's most beautiful destinations. 
              We specialize in creating unforgettable travel experiences that combine adventure, culture, and comfort. 
              Our expert team carefully designs each tour to ensure you discover the authentic essence of every location. 
              With years of experience in the travel industry, we pride ourselves on providing personalized service and attention to detail. 
              From breathtaking landscapes to cultural immersion, we handle every aspect of your journey. 
              At Karvaan Tours, we believe travel is not just about destinations, but about creating memories that last a lifetime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// VERSION 25: Centered Icon Hero
// ============================================
export function IntroVersion25() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-10 md:p-12">
          <div className="text-center">
            <div className="inline-block relative mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-xl opacity-50"></div>
              <div className="relative w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <Compass className="w-12 h-12 text-white" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              About Karvaan Tours
            </h2>
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="h-1 w-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded"></div>
              <Sparkles className="w-5 h-5 text-purple-600" />
              <div className="h-1 w-12 bg-gradient-to-l from-blue-600 to-purple-600 rounded"></div>
            </div>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Welcome to Karvaan Tours, your trusted travel partner for exploring the world's most beautiful destinations. 
              We specialize in creating unforgettable travel experiences that combine adventure, culture, and comfort. 
              Our expert team carefully designs each tour to ensure you discover the authentic essence of every location. 
              With years of experience in the travel industry, we pride ourselves on providing personalized service and attention to detail. 
              From breathtaking landscapes to cultural immersion, we handle every aspect of your journey. 
              At Karvaan Tours, we believe travel is not just about destinations, but about creating memories that last a lifetime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// DEFAULT EXPORT
// ============================================
export default IntroVersion1;