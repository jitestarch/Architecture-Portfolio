import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-black max-w-7xl  text-white py-6 mb-10 mt-auto mx-auto rounded-4xl">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* some bakchodi */}
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="text-2xl font-medium tracking-tight mb-6 inline-block">
            JITESH STUDIO<span className="text-accent">.</span>
          </Link>
          <p className="text-white/60 max-w-sm text-balance">
            Creating minimal, sustainable, and contextually driven architecture for the modern world.
          </p>
        </div>
        
        {/* socials list */}
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-widest mb-6 text-gray-500">Connect</h4>
          <ul className="space-y-2">
            <li><a href="https://www.instagram.com/__jiigs__/" className="text-white/60 hover:text-white transition-colors text-sm font-light">Instagram</a></li>
            <li><a href="#" className="text-white/60 hover:text-white transition-colors text-sm font-light">LinkedIn</a></li>
            <li><a href="#" className="text-white/60 hover:text-white transition-colors text-sm font-light">Behance</a></li>
          </ul>
        </div>
        
        {/* address and mail id  */}
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-widest mb-6 text-gray-500">Studio</h4>
          <ul className="">
            <li><a href="tel:+919087990009" className="text-white/60 hover:text-white transition-colors text-sm font-light">+91 9087990009</a></li>
            <li><a href="mailto:jiteshsa5273@gmail.com" className="text-white/60 hover:text-white transition-colors text-sm font-light">jiteshsa5273@gmail.com</a></li>
          </ul>
        </div>
      </div>
      
     
    </footer>
  );
}


// <p>&copy; {new Date().getFullYear()} Studio Architecture. All rights reserved.</p>