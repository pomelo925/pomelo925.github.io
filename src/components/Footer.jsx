/**
 * @copyright 2025 pomelo925
 * @license Apache-2.0
 */


/**
 * Components
 */
import { ButtonPrimary } from "./Button";

const sitemap = [
  {
    label: 'Home',
    href: '#home'
  },
  {
    label: 'About',
    href: '#about'
  },
  {
    label: 'Work',
    href: '#work'
  },
  {
    label: 'Contact me',
    href: '#contact'
  }
];

const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/pomelo925'
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/%E8%88%88%E4%BD%91-%E9%BB%83-0285a5279/'
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/liebestraum_925/'
  },
  {
    label: 'Youtube',
    href: 'https://www.youtube.com/@pomelo925'
  }
];


const Footer = () => {
  return (
    <footer className="section">
      <div className="container">
        <div className="lg:grid lg:grid-cols-2">
          <div className="mb-10">
            <h2 className="headline-1 mb-8 lg:max-w-[12ch] reveal-up">
              Let&apos;s work together.
            </h2>

            <ButtonPrimary 
              href="mailto:yoseph.huang@gmail.com"
              label="Start project"
              icon="chevron_right"
              classes="reveal-up"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 lg:pl-20">
            <div>
              <p className="mb-2 reveal-up"> Sitemap </p>
              <ul>
                {sitemap.map(({ label, href }, key) => (
                  <li key={key}>
                    <a 
                      href={href}
                      className="block text-sm text-zinc-400 py-1
                        transition-colors hover:text-zinc-200 reveal-up"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-2 reveal-up"> Socials </p>
              <ul>
                {socials.map(({ label, href }, key) => (
                  <li key={key}>
                    <a 
                      href={href}
                      target="_blank"
                      className="block text-sm text-zinc-400 py-1
                        transition-colors hover:text-zinc-200 reveal-up"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="mt-10 border-t border-zinc-700 pt-4 container flex justify-end">
          <p className="text-zinc-500 text-sm reveal-up">
            COPYRIGHT &copy; 2025 <span className="text-zinc-400">pomelo925</span>
          </p>
      </div>
    </footer> 
  )
}

export default Footer;