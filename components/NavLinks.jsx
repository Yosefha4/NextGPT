import Link from "next/link";

const links = [
  { href: "/chat", label: "chat" },
  { href: "/image-generator", label: "Image Gen" },
  { href: "/voice-generator", label: "Text To Speech" },
  { href: "/tours", label: "tours" },
  { href: "/tours/new-tour", label: "new tour" },
  { href: "/profile", label: "profile" },
];
const NavLinks = ({ currentPath }) => {
  return (
    <ul className="menu text-base-content">
      {links.map((link) => {
        const isActive = currentPath === link.href;
        return (
          <li key={link.href} className="text-xl mb-2">
            <Link href={link.href} className={`capitalize ${isActive ? "bg-base-200 font-bold" : ""}`}>
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default NavLinks;
