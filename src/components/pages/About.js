import React, { useState, useEffect } from 'react';
import SimpleReactLightbox, { SRLWrapper } from 'simple-react-lightbox';
import crewData from '../../about-us'; // Your crew member data
import '../../App.scss';
import Loader from '../Loader';

const imagePath = process.env.PUBLIC_URL + '/images/';

const options = {
  settings: {
    overlayColor: 'rgb(25, 136, 124)',
    autoplaySpeed: 1500,
    transitionSpeed: 900,
  },
  buttons: {
    backgroundColor: 'red',
    iconColor: 'rgba(126, 172, 139, 0.8)',
  },
  caption: {
    captionColor: '#a6cfa5',
    captionFontFamily: 'Raleway, sans-serif',
    captionFontWeight: '300',
    captionTextTransform: 'uppercase',
  },
  progressBar: {
    height: '20px',
    fillColor: 'blue',
    backgroundColor: 'white',
  },
};

function About() {
  const [crewMembers, setCrewMembers] = useState([]);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    document.title = 'LTD - About Us';
    setCrewMembers(crewData);

    setInterval(() => {
      if (document.readyState === 'complete') {
        setOpen(false);
      }
    }, 100);
  }, []);

  return (
    <div className="about">
      {open === true ? <Loader open /> : <Loader />}
      <div className="about-content"><br/>
        <h1>Meet Our Crew</h1>
        <p>Our dedicated team is here to ensure you have the best experience possible.</p>
      </div>
      <SimpleReactLightbox>
        <SRLWrapper options={options}>
          <div className="container">
            {crewMembers.length > 0 ? (
              crewMembers.map((member) => (
                <div key={member.id} className="image-card">
                  <img
                    className="image"
                    src={`${imagePath}${member.imageName}`}
                    alt={member.name}
                    onError={(e) => (e.target.src = `${imagePath}default.jpg`)} // Fallback image
                  />
                  <p className="image-name">{member.name}</p>
                </div>
              ))
            ) : (
              <Loader />
            )}
          </div>
        </SRLWrapper>
      </SimpleReactLightbox>
    </div>
  );
}

export default About;
