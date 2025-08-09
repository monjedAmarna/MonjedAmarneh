import React, { useState, createRef } from "react";
import PropTypes from "prop-types";
import "./ProjectCard.scss";
import ColorThief from "colorthief";

export default function ProjectCard({ cardInfo, isDark }) {
  const [colorArrays, setColorArrays] = useState([]);
  const imgRef = createRef();
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  function getColorArrays() {
    const colorThief = new ColorThief();
    setColorArrays(colorThief.getColor(imgRef.current));
  }

  function rgb(values) {
    return typeof values === "undefined"
      ? null
      : "rgb(" + values.join(", ") + ")";
  }

  const GetDescBullets = ({ descBullets, isDark }) => {
    return descBullets
      ? descBullets.map((item, i) => (
          <li
            key={i}
            className={isDark ? "subTitle dark-mode-text" : "subTitle"}
          >
            {item}
          </li>
        ))
      : null;
  };

  // Handle slider navigation
  const images = cardInfo.images || [];
  const hasImages = images.length > 0;

  const handlePrevImage = e => {
    e.stopPropagation();
    setCurrentImageIndex(idx =>
      idx === 0 ? images.length - 1 : idx - 1
    );
  };

  const handleNextImage = e => {
    e.stopPropagation();
    setCurrentImageIndex(idx =>
      idx === images.length - 1 ? 0 : idx + 1
    );
  };

  // Reset image index when collapsed or images change
  React.useEffect(() => {
    if (!isExpanded) setCurrentImageIndex(0);
  }, [isExpanded, images]);

  // For color extraction, use the first image or projectLogo
  const mainImage = hasImages ? images[currentImageIndex] : cardInfo.projectLogo;

  return (
    <div
      className={
        (isDark ? "project-card-dark" : "project-card") +
        (isExpanded ? " expanded" : "")
      }
      onClick={() => setIsExpanded(exp => !exp)}
      tabIndex={0}
      role="button"
      aria-expanded={isExpanded}
      style={{ cursor: "pointer" }}
    >
      <div style={{ background: rgb(colorArrays) }} className="project-banner">
        <div className="project-blurred_div"></div>
        <div className="project-div-name">
          <h5 className="project-text-name">{cardInfo.projectName}</h5>
        </div>
        <img
          crossOrigin={"anonymous"}
          ref={imgRef}
          className="project-roundedimg"
          src={mainImage}
          alt={cardInfo.projectName}
          onLoad={() => getColorArrays()}
        />
      </div>
      <div className="project-text-details">
        <h5
          className={
            isDark
              ? "project-text-date dark-mode-text"
              : "project-text-date"
          }
        >
          {cardInfo.date}
        </h5>
        <p
          className={
            isDark
              ? "subTitle project-text-desc dark-mode-text"
              : "subTitle project-text-desc"
          }
        >
          {cardInfo.desc}
        </p>
        {/* Expanded content: image slider and descBullets */}
        {isExpanded && (
          <div className="project-expanded-content" onClick={e => e.stopPropagation()}>
            {hasImages && (
              <div className="project-slider">
                <button
                  className="slider-arrow left"
                  onClick={handlePrevImage}
                  aria-label="Previous image"
                  tabIndex={0}
                >
                  &#8592;
                </button>
                <img
                  src={images[currentImageIndex]}
                  alt={`Project image ${currentImageIndex + 1}`}
                  className="slider-image"
                />
                <button
                  className="slider-arrow right"
                  onClick={handleNextImage}
                  aria-label="Next image"
                  tabIndex={0}
                >
                  &#8594;
                </button>
              </div>
            )}
            {cardInfo.descBullets && cardInfo.descBullets.length > 0 && (
              <ul className="project-desc-bullets">
                <GetDescBullets descBullets={cardInfo.descBullets} isDark={isDark} />
              </ul>
            )}
          </div>
        )}
        {cardInfo.footerLink && cardInfo.footerLink.length > 0 && (
          <div className="project-footer-links" onClick={e => e.stopPropagation()}>
            {cardInfo.footerLink.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link-button"
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

ProjectCard.propTypes = {
  cardInfo: PropTypes.shape({
    projectName: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    projectLogo: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]).isRequired,
    descBullets: PropTypes.arrayOf(PropTypes.string),
    images: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
      ])
    ),
    footerLink: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired
      })
    )
  }).isRequired,
  isDark: PropTypes.bool
};

ProjectCard.defaultProps = {
  isDark: false
}; 