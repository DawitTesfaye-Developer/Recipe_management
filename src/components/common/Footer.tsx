import React from "react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Github,
} from "lucide-react";

interface FooterProps {
  companyName?: string;
  companyLogo?: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    github?: string;
  };
  contactInfo?: {
    email?: string;
    phone?: string;
    address?: string;
  };
  links?: {
    title: string;
    href: string;
  }[];
}

const Footer = ({
  companyName = "Recipe World",
  companyLogo = "/vite.svg",
  socialLinks = {
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
    github: "https://github.com",
  },
  contactInfo = {
    email: "contact@recipeworld.com",
    phone: "+1 (555) 123-4567",
    address: "123 Culinary Street, Foodville, FC 12345",
  },
  links = [
    { title: "About Us", href: "/about" },
    { title: "Privacy Policy", href: "/privacy" },
    { title: "Terms of Service", href: "/terms" },
    { title: "FAQ", href: "/faq" },
    { title: "Blog", href: "/blog" },
    { title: "Careers", href: "/careers" },
  ],
}: FooterProps) => {
  return (
    <footer className="w-full py-12 px-6 md:px-12 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <img
                src={companyLogo}
                alt={companyName}
                className="h-8 w-8 mr-2"
              />
              <h3 className="text-xl font-bold">{companyName}</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Discover delicious recipes from around the world. Create, share,
              and enjoy amazing food experiences.
            </p>
            <div className="flex space-x-4">
              <a
                href={socialLinks.facebook}
                aria-label="Facebook"
                className="text-gray-600 hover:text-blue-600"
              >
                <Facebook size={20} />
              </a>
              <a
                href={socialLinks.twitter}
                aria-label="Twitter"
                className="text-gray-600 hover:text-blue-400"
              >
                <Twitter size={20} />
              </a>
              <a
                href={socialLinks.instagram}
                aria-label="Instagram"
                className="text-gray-600 hover:text-pink-600"
              >
                <Instagram size={20} />
              </a>
              <a
                href={socialLinks.github}
                aria-label="Github"
                className="text-gray-600 hover:text-gray-900"
              >
                <Github size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {links.slice(0, 3).map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {links.slice(3).map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-600 hover:text-primary transition-colors"
                  >
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <Mail size={18} className="text-gray-600 mr-2 mt-0.5" />
                <span className="text-gray-600">{contactInfo.email}</span>
              </div>
              <div className="flex items-start">
                <Phone size={18} className="text-gray-600 mr-2 mt-0.5" />
                <span className="text-gray-600">{contactInfo.phone}</span>
              </div>
              <div className="flex items-start">
                <MapPin size={18} className="text-gray-600 mr-2 mt-0.5" />
                <span className="text-gray-600">{contactInfo.address}</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600 mb-4 md:mb-0">
            © {new Date().getFullYear()} {companyName}. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-primary"
            >
              Cookie Settings
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-primary"
            >
              Accessibility
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
