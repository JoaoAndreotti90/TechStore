import React from 'react';
import { Cpu, Github, Linkedin } from 'lucide-react';
import Link from 'next/link';

const footerSections = [
  {
    title: 'Produtos',
    links: [
      { name: 'Ver Todos', href: '/products' },
    ]
  },
  {
    title: 'Suporte',
    links: [
      { name: 'Central de Ajuda', href: '/support' },
      { name: 'Fale Conosco', href: '/support' },
      { name: 'Garantia', href: '/support' },
      { name: 'Devoluções', href: '/support' },
    ]
  },
  {
    title: 'Legal',
    links: [
      { name: 'Termos de Uso', href: '#' },
      { name: 'Privacidade', href: '#' },
      { name: 'LGPD', href: '#' },
    ]
  }
];

const socialLinks = [
  { 
    icon: Linkedin, 
    href: 'https://www.linkedin.com/in/joao-andreotti/',
    label: 'LinkedIn'
  },
  { 
    icon: Github, 
    href: 'https://github.com/JoaoAndreotti90',
    label: 'GitHub' 
  }
];

export default function Footer() {
  return (
    <footer className="bg-[#050506] border-t border-white/5 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          <div className="col-span-1 md:col-span-1">
            <Link href="/" aria-label="Voltar para a página inicial">
              <div className="flex items-center gap-2 mb-6 cursor-pointer group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                  <Cpu className="w-5 h-5 text-white" aria-hidden="true" />
                </div>
                <span className="text-xl font-bold text-white tracking-tight">TechStore</span>
              </div>
            </Link>
            
            <p className="text-gray-500 text-sm font-medium leading-relaxed mb-6">
              A melhor experiência em tecnologia do Brasil. Produtos premium e preços justos.
            </p>
            
            <nav aria-label="Redes Sociais" className="flex gap-3">
              {socialLinks.map((social) => (
                <a 
                  key={social.label} 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-indigo-600 hover:text-white text-gray-400 transition-all duration-300 shadow-sm"
                  aria-label={`Visite nosso ${social.label}`}
                >
                  <social.icon className="w-5 h-5" aria-hidden="true" />
                </a>
              ))}
            </nav>
          </div>

          <nav aria-label="Links do Rodapé" className="col-span-1 md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
            {footerSections.map((section) => (
              <div key={section.title}>
                <h4 className="text-white font-bold mb-6 tracking-wide">{section.title}</h4>
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link 
                        href={link.href} 
                        className="text-gray-500 font-medium hover:text-indigo-400 text-sm transition-colors block w-fit"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-sm font-medium">© {new Date().getFullYear()} TechStore. Todos os direitos reservados.</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" aria-hidden="true"></span>
            <p className="text-gray-600 text-xs font-bold uppercase tracking-widest">Sistema Operacional</p>
          </div>
        </div>
      </div>
    </footer>
  );
}