/**
 * @copyright 2025 pomelo925
 * @license Apache-2.0
 */


/**
 * Node Modules
 */
import PropTypes from "prop-types";


const ProjectCard = ({
  imgSrc,
  title,
  tags,
  projectLink,
  classes
}) => {
  return (
    <div className={"relative p-4 rounded-2xl bg-zinc-800 \
      hover:bg-zinc-700/50 active:bg-zinc-700/60 \
      ring-1 ring-inset ring-zinc-50/5 transition-colors " + classes}>
      
      {/* 強制圖片大小一致 */}
      <figure className="img-box w-full h-48 rounded-lg mb-4 overflow-hidden">
        <img 
          src={imgSrc}
          alt={title}
          loading='lazy'
          className="w-full h-full object-cover"
        />
      </figure>

      {/* Title 獨自一行 */}
      <h3 className="title-2 mb-4">{title}</h3>

      {/* Arrow 和 Tags 同排 */}
      <div className="flex items-center justify-between gap-4">
        {/* Arrow */}
        <div className="w-11 h-11 rounded-lg grid place-items-center 
          bg-rose-400 text-zinc-950 shrink-0"> 
          <span
            className="material-symbols-rounded"
            aria-hidden="true"
          >
            arrow_outward
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2">
          {tags.map((label, key) => (
            <span 
              key={key}
              className="h-8 text-sm text-zinc-400 bg-zinc-50/5 
                grid items-center px-3 rounded-lg"
            >
              {label}
            </span>
          ))}
        </div>
      </div>

      <a
        href={projectLink}
        target="_blank"
        className="absolute inset-0"
      ></a>

    </div>
  )
}


ProjectCard.PropTypes = {
  imgSrc: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  tags: PropTypes.array.isRequired,
  projectLink: PropTypes.string.isRequired,
  classes: PropTypes.string
}

export default ProjectCard;