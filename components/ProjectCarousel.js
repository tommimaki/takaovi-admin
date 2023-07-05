/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Carousel } from "react-responsive-carousel";
import Link from "next/link";

const ProjectsCarousel = ({ projects }) => {
  return (
    <Carousel
      showArrows
      showThumbs={false}
      showStatus={false}
      showIndicators={false}
      infiniteLoop
      autoPlay
      interval={2500}
      transitionTime={500}
    >
      {projects.map((project, index) => (
        <div key={index}>
          <Link href={`/inconstruction/${project._id}`}>
            {project.images.length > 0 ? (
              <img src={project.images[1]} alt={`Project ${index + 1}`} />
            ) : (
              <p>No image available for this project</p>
            )}
            <p className="legend">{project.title}</p>
          </Link>
        </div>
      ))}
    </Carousel>
  );
};

export default ProjectsCarousel;
