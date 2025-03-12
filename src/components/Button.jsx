/**
 * @copyright 2025 pomelo925
 * @license Apache-2.0
 */


/**
 * Node modules
 */
import PropTypes from 'prop-types';


/**
 * Primary Button
 */

const ButtonPrimary = ({ 
  href, 
  target = '_self', 
  label, 
  icon, 
  classes 
}) => {
  if(href) {
    return (
      <a 
        href={href}
        target={target}
        className={"btn btn-primary " + classes}
      >
        {label}
        
        {icon ?
          <span className="material-symbols-rounded" aria-hidden="true">
            {icon}
          </span>
          : undefined
        }
      </a>
    )
  } else {
    return (
      <button className={"btn btn-primary "+ classes}>
        {label}

        {icon ?
          <span className="material-symbols-rounded" aria-hidden="true">
            {icon}
          </span>
          : undefined
        }
      </button>
    )
  }
}

ButtonPrimary.propTypes = {
  label: PropTypes.string.isRequired,
  href: PropTypes.string,
  target: PropTypes.string,
  icon: PropTypes.string,
  classes: PropTypes.string
}


/**
 * Outline Button
 */

const ButtonOutline = ({ 
  href, 
  target = '_self', 
  label, 
  icon, 
  classes 
}) => {
  if(href) {
    return (
      <a 
        href={href}
        target={target}
        className={"btn btn-outline " + classes}
      >
        {label}
        
        {icon ?
          <span className="material-symbols-rounded" aria-hidden="true">
            {icon}
          </span>
          : undefined
        }
      </a>
    )
  } else {
    return (
      <button className={"btn btn-outline "+ classes}>
        {label}

        {icon ?
          <span className="material-symbols-rounded" aria-hidden="true">
            {icon}
          </span>
          : undefined
        }
      </button>
    )
  }
}

ButtonOutline.propTypes = {
  label: PropTypes.string.isRequired,
  href: PropTypes.string,
  target: PropTypes.string,
  icon: PropTypes.string,
  classes: PropTypes.string
}



const Button = ({ onClick, children, type }) => {
  return (
    <button className={`btn btn-${type}`} onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['primary', 'secondary', 'danger']).isRequired,
};

export {
  ButtonPrimary,
  ButtonOutline
}