/**
 * @copyright 2025 pomelo925
 * @license Apache-2.0
 */


const aboutItems = [
  {
    label: 'Github Followers', 
    number: 28
  },
  {
    label: 'Years of experience',
    number: 5
  },
  {
    label: 'Robot Competitions', 
    number: 4
  }
];

const About = () => {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="bg-zinc-800/50 p-7 rounded-2xl md:p-12 reveal-up">

        <p className="text-zinc-300 mb-4 md:text-xl md:max-w-[70ch]">
        Hi, I'm Hsing-Yu, Huang. I'm a NTHU student majoring in Power Machinery Engineering.
        Passionate to software/hardware developement specializing in AI-driven robotics.
        Experienced in international and local robotics competitions with multiple awards.
        </p>

          <div className="flex flex-wrap items-center gap-4 mt-20 md:gap-7">
            {
              aboutItems.map(({label,  number}, key) => (
                <div key={key}>
                  <div className="flex items-center md:mb-2">
                    <span className="text-2xl font-bold md:text-4xl">{number}</span>
                    <span className="text-pink-500 font-semibold md:text-3xl">+</span>
                  </div>

                  <p className="text-sm text-rose-300">{label}</p>
                </div>
              ))
            }

            {/* <img
              src="/portrait.jpg"
              alt="logo"
              width={30}
              height={30}
              className="ml-auto md:w-[40px] md:h-[40px]"
            /> */}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About;