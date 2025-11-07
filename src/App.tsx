import { useState, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Play, Pause, Menu, X, Sun, Moon, Music2, Calendar, Mail, Instagram, Facebook, Twitter } from 'lucide-react';
import { useRef } from 'react';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) {
      return saved === 'true';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    console.log('Dark mode changed:', darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', String(darkMode));
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'music', 'journey', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="bg-white dark:bg-[#111111] text-[#111111] dark:text-white transition-colors duration-300">
        <Navigation
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          activeSection={activeSection}
          scrollToSection={scrollToSection}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
        <HeroSection scrollToSection={scrollToSection} />
        <MusicSection />
        <JourneySection />
        <ContactSection />
        <Footer darkMode={darkMode} setDarkMode={setDarkMode} />
      </div>
    </div>
  );
}

function Navigation({ darkMode, setDarkMode, activeSection, scrollToSection, mobileMenuOpen, setMobileMenuOpen }: any) {
  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'music', label: 'Music' },
    { id: 'journey', label: 'Journey' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-[#111111]/90 backdrop-blur-md border-b border-gray-200 dark:border-[#1E1E1E]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl font-bold"
          >
            <span className="text-[#D4AF37]">Chigozie</span> Ikpo
          </motion.div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`transition-colors ${
                  activeSection === link.id
                    ? 'text-[#D4AF37]'
                    : 'hover:text-[#D4AF37]'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#1E1E1E] transition-colors"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#1E1E1E] transition-colors"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white dark:bg-[#111111] border-t border-gray-200 dark:border-[#1E1E1E]"
        >
          <div className="px-4 py-4 space-y-4">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`block w-full text-left py-2 transition-colors ${
                  activeSection === link.id
                    ? 'text-[#D4AF37]'
                    : 'hover:text-[#D4AF37]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}

function HeroImageStack() {
  const images = ['/DSC_0998s.jpg', '/DSC_1050s.jpg', '/DSC_1056s.jpg', '/2U5A8849s.jpg'];
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
      className="flex justify-center md:justify-end"
    >
      <div className="relative w-full max-w-sm">
        {images.map((img, index) => (
          <motion.div
            key={img}
            initial={false}
            animate={{
              scale: index === currentImage ? 1 : 0.95,
              opacity: index === currentImage ? 1 : 0.3,
              rotate: index === currentImage ? 0 : (index - currentImage) * 3,
              zIndex: index === currentImage ? 10 : images.length - Math.abs(index - currentImage),
            }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
            style={{
              transformOrigin: 'center center',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37] to-[#8B7A2F] rounded-2xl opacity-20" />
            <img
              src={img}
              alt="Chigozie Ikpo"
              className="relative w-full h-auto rounded-2xl shadow-2xl object-cover"
            />
          </motion.div>
        ))}
        <div className="relative" style={{ paddingBottom: '133%' }} />
        
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentImage ? 'bg-[#D4AF37] w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function HeroSection({ scrollToSection }: any) {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16 px-4">
      <div className="max-w-6xl mx-auto w-full">
        {/* Title - shows on mobile only */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-5xl font-bold mb-8 text-center md:hidden"
        >
          Triumphant Gaze
        </motion.h1>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex flex-col justify-center text-center md:text-left order-2 md:order-1"
          >
            {/* Title - shows on desktop only */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="hidden md:block text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
            >
              Triumphant Gaze
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
              className="text-xl md:text-2xl text-[#D4AF37] mb-12"
            >
              A worship journey from brokenness to victory
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              <a
                href="https://push.fm/fl/chigozie-ikpo-triumphant-gaze"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-[#D4AF37] text-[#111111] font-semibold rounded-lg hover:bg-[#C19B2E] transition-colors text-center"
              >
                Stream Music
              </a>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 border-2 border-[#D4AF37] text-[#D4AF37] font-semibold rounded-lg hover:bg-[#D4AF37] hover:text-[#111111] transition-colors"
              >
                Book Ministration
              </button>
            </motion.div>
          </motion.div>

          <div className="order-1 md:order-2">
            <HeroImageStack />
          </div>
        </div>
      </div>
    </section>
  );
}

function MusicSection() {
  const songs = [
    {
      title: 'El Roi',
      testimony: 'In my darkest hour, when I felt unseen and abandoned, God revealed Himself as El Roi—the God who sees. This song emerged from that divine encounter, reminding us that we are never hidden from His loving gaze.',
      audio: '/audio/el-roi.m4a',
    },
    {
      title: 'You Are Worthy',
      testimony: 'Written during a season of overwhelming gratitude, this anthem declares the worthiness of our King. Every breath, every moment is an opportunity to proclaim His majesty and bow before His throne.',
      audio: '/audio/you-are-worthy.m4a',
    },
    {
      title: 'Turned My Life Around',
      testimony: 'From brokenness to breakthrough, this is my testimony in song. God took the shattered pieces of my life and created a masterpiece. This song is for everyone who needs a reminder that it\'s never too late for transformation.',
      audio: '/audio/turned-my-life-around.m4a',
    },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="music" ref={ref} className="py-20 px-4 bg-gray-50 dark:bg-[#0A0A0A]">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Music</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">Listen to the sound of worship</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {songs.map((song, index) => (
            <SongCard key={song.title} song={song} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function SongCard({ song, index, isInView }: any) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.3, ease: 'easeOut', delay: index * 0.1 }}
      className="bg-white dark:bg-[#1E1E1E] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
    >
      <div className="h-64 relative overflow-hidden">
        <img 
          src="/ArtNew1.png" 
          alt={song.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <button
            onClick={togglePlay}
            className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            {isPlaying ? (
              <Pause size={32} className="text-white" />
            ) : (
              <Play size={32} className="text-white ml-1" />
            )}
          </button>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 text-[#D4AF37]">{song.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          {song.testimony}
        </p>
        <audio ref={audioRef} onEnded={() => setIsPlaying(false)} preload="metadata">
          <source src={song.audio} type="audio/mp4" />
        </audio>
      </div>
    </motion.div>
  );
}

function JourneySection() {
  const milestones = [
    {
      year: '1995',
      title: 'The Beginning',
      description: 'At just 5 years old, joined the children\'s choir at Living Faith Church, discovering a deep love for worship that would shape a lifetime of ministry.',
    },
    {
      year: '2008',
      title: 'Harmony Singers',
      description: 'Became a vital member of the Harmony Singers, honing vocal skills and learning the power of corporate worship under the mentorship of seasoned gospel ministers.',
    },
    {
      year: '2015',
      title: 'Music Director',
      description: 'Appointed as Music Director at PCN Abia, leading a congregation of thousands into the presence of God through Spirit-filled worship experiences.',
    },
    {
      year: '2022',
      title: 'Debut Single',
      description: 'Released "El Roi" as a debut single, touching hearts across continents and establishing a unique voice in contemporary gospel music.',
    },
    {
      year: '2024',
      title: 'Esthington Records',
      description: 'Signed with Esthington Records, partnering with a label that shares the vision of spreading the gospel through authentic, anointed worship music.',
    },
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="journey" ref={ref} className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">The Journey</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">A testimony of faithfulness</p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-[#D4AF37]" />

          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.year}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.3, ease: 'easeOut', delay: index * 0.1 }}
              className={`relative mb-12 ${
                index % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2 md:ml-auto'
              }`}
            >
              <div className="flex items-center mb-4 md:justify-end">
                <div className={`flex items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 -ml-4 bg-[#D4AF37] rounded-full flex items-center justify-center">
                    <Calendar size={16} className="text-[#111111]" />
                  </div>
                </div>
              </div>

              <div className={`ml-12 md:ml-0 ${index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'}`}>
                <div className="bg-white dark:bg-[#1E1E1E] p-6 rounded-lg shadow-lg">
                  <span className="text-[#D4AF37] font-bold text-sm">{milestone.year}</span>
                  <h3 className="text-xl font-bold mt-2 mb-3">{milestone.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{milestone.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section id="contact" ref={ref} className="py-20 px-4 bg-gray-50 dark:bg-[#0A0A0A]">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">Let's connect and make something beautiful</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3, ease: 'easeOut', delay: 0.1 }}
          className="mb-8 p-6 bg-white dark:bg-[#1E1E1E] rounded-lg border-l-4 border-[#D4AF37]"
        >
          <h3 className="text-xl font-bold mb-2 text-[#D4AF37]">For Bookings Contact:</h3>
          <a 
            href="mailto:ministerchigozieikpo@gmail.com"
            className="text-lg hover:text-[#D4AF37] transition-colors flex items-center gap-2"
          >
            <Mail size={20} />
            ministerchigozieikpo@gmail.com
          </a>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.form
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.3, ease: 'easeOut', delay: 0.1 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-[#1E1E1E] border border-gray-300 dark:border-[#2A2A2A] focus:outline-none focus:border-[#D4AF37] transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-[#1E1E1E] border border-gray-300 dark:border-[#2A2A2A] focus:outline-none focus:border-[#D4AF37] transition-colors"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                rows={5}
                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-[#1E1E1E] border border-gray-300 dark:border-[#2A2A2A] focus:outline-none focus:border-[#D4AF37] transition-colors"
                placeholder="Your message..."
              />
            </div>
            <button
              type="submit"
              className="w-full px-8 py-4 bg-[#D4AF37] text-[#111111] font-semibold rounded-lg hover:bg-[#C19B2E] transition-colors flex items-center justify-center gap-2"
            >
              <Mail size={20} />
              Send Message
            </button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.3, ease: 'easeOut', delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-2xl font-bold mb-6">Connect With Me</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Follow along on the journey and stay updated with new music, upcoming events, and ministry opportunities.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://www.instagram.com/chigozie_ikpo?igsh=MXM5NWZ1bWJuMzJj"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center hover:bg-[#C19B2E] transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={24} className="text-[#111111]" />
              </a>
              <a
                href="https://www.fb.com/l/6lp1kJRRR"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center hover:bg-[#C19B2E] transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={24} className="text-[#111111]" />
              </a>
              <a
                href="https://www.tiktok.com/@min.chigozie.ikpo?_r=1&_t=ZS-91AzQGy3hmK"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center hover:bg-[#C19B2E] transition-colors"
                aria-label="TikTok"
              >
                <Music2 size={24} className="text-[#111111]" />
              </a>
              <a
                href="https://x.com/chigozie_ikpo?t=zURd3JuNW8Op5_M695iyUg&s=09"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center hover:bg-[#C19B2E] transition-colors"
                aria-label="X (Twitter)"
              >
                <Twitter size={24} className="text-[#111111]" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Footer({ darkMode, setDarkMode }: any) {
  return (
    <footer className="py-8 px-4 border-t border-gray-200 dark:border-[#1E1E1E]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          © 2025 Chigozie Ikpo. All rights reserved.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500">
          Made with love by{' '}
          <a
            href="https://www.mybizpush.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#D4AF37] hover:underline"
          >
            MyBizPush Solutions Limited
          </a>
        </p>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-[#1E1E1E] transition-colors"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </footer>
  );
}

export default App;
