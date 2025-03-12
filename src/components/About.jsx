/**
 * @copyright 2025 pomelo925
 * @license Apache-2.0
 */


const aboutItems = [
  {
    label: 'Project Done', 
    number: 45
  },
  {
    label: 'Years of experience',
    number: 4
  }
];

const About = () => {
  return (
    <section
      id="about"
      className="section"
    >
      <div className="container">
        <div className="bg-zinc-800/50 p-7 rounded-2xl md:p-12">

        <p className="text-zinc-300 mb-4 mb:mb-8 md:text-xl md:max-w-[60ch]">
          I am a passionate developer who loves to code and solve problems. 
          I have completed 45 projects in 4 years. 
          I have experience in developing web applications, mobile applications, and desktop applications.
        </p>

          <div className="flex flex-wrap items-center gap-4 md:gap-7">
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

            <img
              src="/images/logo.png"
              alt="logo"
              width={30}
              height={30}
              className="ml-auto md:w-[40px] md:h-[40px]"
            >
            </img>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About;