/**
 * @copyright 2025 pomelo925
 * @license Apache-2.0
 */

/**
 * Components
 */
import SkillCard from './SkillCard';


const skillItem = [
  {
    imgSrc: 'https://skillicons.dev/icons?i=linux',
    label: 'Linux',
    desc: 'OS'
  },
  {
    imgSrc: 'https://skillicons.dev/icons?i=ubuntu',
    label: 'Ubuntu',
    desc: 'OS'
  },
  {
    imgSrc: 'https://skillicons.dev/icons?i=docker',
    label: 'Docker',
    desc: 'Containerization'
  },
  {
    imgSrc: 'https://skillicons.dev/icons?i=git',
    label: 'Git',
    desc: 'Version Control'
  },
  {
    imgSrc: 'https://skillicons.dev/icons?i=githubactions',
    label: 'Github Actions',
    desc: 'CI/CD'
  },
  {
    imgSrc: 'https://skillicons.dev/icons?i=raspberrypi',
    label: 'Raspberry Pi',
    desc: 'Computer'
  },
  {
    imgSrc: 'https://skillicons.dev/icons?i=ros',
    label: 'ROS',
    desc: 'Robotic Platform'
  },
  {
    imgSrc: 'https://skillicons.dev/icons?i=arduino',
    label: 'Arduino',
    desc: 'Prototyping Platform'
  },
  {
    imgSrc: 'https://skillicons.dev/icons?i=vscode',
    label: 'VSCode',
    desc: 'Code Editor'
  },
  {
    imgSrc: 'https://skillicons.dev/icons?i=cmake',
    label: 'CMake',
    desc: 'Building Tool'
  },
  {
    imgSrc: 'https://skillicons.dev/icons?i=c',
    label: 'C',
    desc: 'Language'
  },
  {
    imgSrc: 'https://skillicons.dev/icons?i=cpp',
    label: 'C++',
    desc: 'Language'
  },
  {
    imgSrc: 'https://skillicons.dev/icons?i=python',
    label: 'Python',
    desc: 'Language'
  },
  {
    imgSrc: 'https://skillicons.dev/icons?i=qt',
    label: 'Qt',
    desc: 'GUI'
  },
  {
    imgSrc: 'https://skillicons.dev/icons?i=opencv',
    label: 'OpneCV',
    desc: 'Image Processing'
  },
  {
    imgSrc: 'https://skillicons.dev/icons?i=pytorch',
    label: 'Pytorch',
    desc: 'Machine Learning'
  },
  {
    imgSrc: 'https://skillicons.dev/icons?i=stackoverflow',
    label: 'Stack Overflow',
    desc: 'Community'
  },
  {
    imgSrc: 'https://skillicons.dev/icons?i=github',
    label: 'Github',
    desc: 'Community'
  },
  {
    imgSrc: 'https://skillicons.dev/icons?i=latex',
    label: 'LATEX',
    desc: 'Note'
  },
  {
    imgSrc: 'https://skillicons.dev/icons?i=markdown',
    label: 'Markdown',
    desc: 'Note'
  },
  {
    imgSrc: 'https://skillicons.dev/icons?i=notion',
    label: 'Notion',
    desc: 'Note'
  }
];


const Skill = () => {
  return (
    <section className="section">
      <div className="container">

        <h2 className="headline-2 reveal-up">
          Essential Tools.
        </h2>

        <p className="text-zinc-400 mt-3 mb-8 max-w-[50ch]">
          Frequently used tools in my projects.
        </p>

       <div className="grid gap-3 grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))]">
        {
          skillItem.map(({imgSrc, label, desc}, key) => (
            <SkillCard 
              imgSrc={imgSrc}
              label={label}
              desc={desc}
              key={key}
              classes="reveal-up"
            />
          ))
        }
       </div>
      </div>
    </section>
  );
};

export default Skill;