import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import destinationsData from '../../destinations-data';
import SimpleReactLightbox, { SRLWrapper } from 'simple-react-lightbox';
import '../../App.scss';
import Loader from '../Loader';

// specifying our image path.
const imagePath = process.env.PUBLIC_URL + '/images/';

const TagButton = ({ name, handleSetTag, tagActive }) => {
  return (
    <button className={`tag ${tagActive ? 'active' : null}`} onClick={() => handleSetTag(name)}>
      {name.toUpperCase()}
    </button>
  );
};

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

function Destinations() {
  const [tag, setTag] = useState('all');
  const [filteredImages, setFilteredImages] = useState([]);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    tag === 'all'
      ? setFilteredImages(destinationsData)
      : setFilteredImages(destinationsData.filter((image) => image.tag === tag));
  }, [tag]);
  useEffect(() => {
    document.title = "LTD - Destinations";
  }, []);

  useEffect(() => {
    setInterval(() => {
      if (document.readyState === 'complete') {
        setOpen(false);
      }
    }, 100);
  }, []);

  return (
    <div className="destinations">
      {open === true ? <Loader open /> : <Loader />}
      <div className="tags">
        <TagButton name="all" tagActive={tag === 'all'} handleSetTag={setTag} />
        <TagButton name="popular" tagActive={tag === 'popular'} handleSetTag={setTag} />
        <TagButton name="romantic" tagActive={tag === 'romantic'} handleSetTag={setTag} />
        <TagButton name="new" tagActive={tag === 'new'} handleSetTag={setTag} />
      </div>
      <SimpleReactLightbox>
        <SRLWrapper options={options}>
          <div className="container">
            {filteredImages.map((image) => (
              <div key={image.id} className="image-card">
                <Link to="#">
                  <img
                    className="image"
                    src={`${imagePath}${image.imageName}`}
                    alt={image.tag}
                  />
                </Link>
                <p className="image-name">{image.place}</p>
              </div>
            ))}
          </div>
        </SRLWrapper>
      </SimpleReactLightbox>
    </div>
  );
}

export default Destinations;
