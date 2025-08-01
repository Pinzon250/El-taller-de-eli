import { useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdClose } from 'react-icons/io';

export default function NavbarR() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Moldes', href: '/moldes' },
    { name: 'Seminarios', href: '/seminarios' },
    { name: 'Kits', href: '/kits' },
    { name: 'Catálogo', href: '/catalogo', isCTA: true },
  ];

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-white/60 backdrop-blur-md transition-all duration-300 rounded-xl px-6 py-3 shadow-lg w-[90%] max-w-6xl">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="flex-shrink-0">
          <img src="/Logos/logo.png" alt="Logo Taller de Eli" className="h-10" />
        </a>

        {/* Desktop menu */}
        <ul className="hidden md:flex space-x-6 text-sm md:text-base font-medium">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className={
                  link.isCTA
                    ? 'bg-pink-300 text-pink-900 rounded-full px-4 py-2 text-base hover:bg-pink-400 transition font-bold'
                    : 'hover:text-pink-600 transition'
                }
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-2xl text-pink-900"
          onClick={toggleMenu}
          aria-label="Menú móvil"
        >
          {isOpen ? <IoMdClose /> : <GiHamburgerMenu />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`
          overflow-hidden transition-all duration-300 ease-in-out 
          ${isOpen ? 'max-h-96 mt-4 opacity-100' : 'max-h-0 opacity-0'}
        `}
      >
        <ul className="flex flex-col space-y-4 text-base font-medium md:hidden">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className={
                  link.isCTA
                    ? 'block bg-pink-300 text-pink-900 rounded-full px-4 py-2 text-center hover:bg-pink-400 transition font-bold'
                    : 'block text-center hover:text-pink-600 transition'
                }
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
