/**
 * @copyright 2025 pomelo925
 * @license Apache-2.0
 */


// Node Modules
import PropTypes from "prop-types";


const SkillCard = ({imgSrc, label, desc, classes}) => {
  return (
    <div className={'flex items-center gap-3 ring-2 \
      ring-inset ring-rose-200/20 rounded-2xl p-3 \
      hover:bg-zinc-800 group '+ classes}>
      <figure className="bg-zinc-900 rounded-lg overflow-hidden p-2 \
      group-hover:bg-zinc-700 transition-colors">
        <img 
          src={imgSrc}
          alt={label}
          width={40}
          height={40}
        />
      </figure>

      <div>
        <h3 className="">
          {label}
        </h3>

        <p className="text-zinc-400 text-sm mt-1">
          {desc}
        </p>
      </div>
    </div>
  );
};
 
SkillCard.PropTypes = {
  imgSrc: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  classes: PropTypes.string
}
export default SkillCard;