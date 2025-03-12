/**
 * @copyright 2025 pomelo925
 * @license Apache-2.0
 */


/**
 * Components
 */

import { ButtonPrimary, ButtonOutline } from './Button';


const Hero = () => {
  return (
    <section
      id="home"
      className="pt-28 lg:pt-36"
    >
      <div className="container lg:grid grid-cols-2 gap-10 items-center">

        <div>

          <div className="flex items-center gap-3">
            <figure className="img-box w-9 h-9 rounded-lg"> 
              <img
                src="/portrait.png"
                width={40}
                height={40}
                alt="pomelo925 portrait"
                className="img-cover"
              />
            </figure>

            <div className="flex itetms-center gap-1.5 
              text-zinc-400 text-sm tracking-wide">
              <span className="relative w-2 h-2 rounded-full bg-emerald-400">
                <span className="absolute inset-0 rounded-full 
                  bg-emerald-400 animate-ping"> 
                </span>
              </span>
              
              Available for work.
            </div>
          </div>
      
        <h2 className="headline-1 max-w-[15ch] sm:max-w-[20ch]
          lg:max-w-[15ch] mt-5 mb-8 lg:mb-10">
          Working on Robotics and AI development.
        </h2>

          <div className="flex items-center gap-3">
            <ButtonPrimary 
              label="Download CV"
              icon="download"
            />

            <ButtonOutline
              href="#about"
              label="Scroll down"
              icon="arrow_downward"
            />
          </div>
        </div>
        
        <div className="hidden lg:block">
          <figure className="w-full max-w-[480px] ml-auto bg-gradient-to-t from-rose-400
            via-25% via-rose-400/40 to-65% rounded-[60px] overflow-hidden">
            <img
              src="/banner.png"
              width={656}
              height={800}
              alt="pomelo925"
              className="w-full"
            />
          </figure>
        </div>
      </div>
    </section>
  );
};

export default Hero