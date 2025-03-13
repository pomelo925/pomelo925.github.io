/**
 * @copyright 2025 pomelo925
 * @license Apache-2.0
 */

/**
 * Components
 */
import ProjectCard from "./ProjectCard";


const works = [
  {
    imgSrc: 'ttennis.png',
    title: 'TTennis-Pickup-Robot',
    tags: ['RTABMap', 'Nav2', 'YOLO'],
    projectLink: 'https://github.com/pomelo925/TTennis-Pickup-Robot'
  },
  {
    imgSrc: 'tel-2024.jpg',
    title: '2024-TEL',
    tags: ['STM32', 'C/C++'],
    projectLink: 'https://github.com/pomelo925/TEL-2024'
  },
  {
    imgSrc: 'eu2024-sima.png',
    title: '2024-Eurobot-SIMA',
    tags: ['PCB Layout', 'ESP32', 'C++'],
    projectLink: 'https://github.com/pomelo925/eurobot2024-ladybug'
  },
  {
    imgSrc: 'eu2024-vision.png',
    title: '2024-Eurobot-Vision',
    tags: ['ROS', 'YOLOv8', 'DBSCAN'],
    projectLink: 'https://github.com/DIT-ROBOTICS/eurobot-2024-vision-main'
  },
  {
    imgSrc: 'eu2023-nav.png',
    title: '2023-Eurobot-Navigation',
    tags: ['ROS', 'Navigation Stack'],
    projectLink: 'https://github.com/DIT-ROBOTICS/navigation'
  },
  {
    imgSrc: 'tel2022.png',
    title: '2022-TEL',
    tags: ['ROS', 'OpenCV', 'STM32'],
    projectLink: 'https://github.com/pomelo925/tel2022_DoItTomorrow'
  }
];


const Work = () => {
  return (
    <section
      id="work"
      className="section"
    >
      <div className="container">
        <h2 className="headline-2 mb-8 reveal-up">
          Portfolio.
        </h2>

        <div className="grid gap-x-4 gap-y-5 grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))]">
          {works.map(({ imgSrc, title , tags, projectLink }, key) => (
            <ProjectCard 
              key={key}
              imgSrc={imgSrc}
              title={title}
              tags={tags}
              projectLink={projectLink}
              classes="reveal-up"
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Work;