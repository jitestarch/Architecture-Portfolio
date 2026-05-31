import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-[#111111] text-white py-16 mt-auto">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <Link href="/" className="text-2xl font-medium tracking-tight mb-6 inline-block">
            STUDIO<span className="text-accent">.</span>
          </Link>
          <p className="text-white/60 max-w-sm text-balance">
            Creating minimal, sustainable, and contextually driven architecture for the modern world.
          </p>
        </div>
        
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-widest mb-6 text-gray-500">Connect</h4>
          <ul className="space-y-4">
            <li><a href="#" className="text-white/60 hover:text-white transition-colors text-sm font-light">Instagram</a></li>
            <li><a href="#" className="text-white/60 hover:text-white transition-colors text-sm font-light">LinkedIn</a></li>
            <li><a href="#" className="text-white/60 hover:text-white transition-colors text-sm font-light">Behance</a></li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-[10px] font-bold uppercase tracking-widest mb-6 text-gray-500">Studio</h4>
          <ul className="space-y-4">
            <li className="text-white/60 text-sm font-light">123 Architecture Blvd<br/>New York, NY 10001</li>
            <li><a href="mailto:hello@studio.com" className="text-white/60 hover:text-white transition-colors text-sm font-light">hello@studio.com</a></li>
          </ul>
        </div>
      </div>
      
      <div className="container mx-auto px-6 md:px-12 mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-sm text-white/40">
        <p>&copy; {new Date().getFullYear()} Studio Architecture. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
          <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
        </div>
      </div>
    </footer>
  );
}
