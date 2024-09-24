import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import servicesData from '../../services-data';
import '../../App.scss';
import Loader from '../Loader';

// a functional sub component that creates various types of buttons.
const TagButton = ({ name, handleSetTag, tagActive }) => (
    <button className={`tag ${tagActive ? 'active' : ''}`} onClick={() => handleSetTag(name)}>
        {name.toUpperCase()}
    </button>
);

function Services() {
    const [tag, setTag] = useState('all');
    const [filteredServices, setFilteredServices] = useState([]);
    const [open, setOpen] = useState(true);

    useEffect(() => {
        tag === 'all' 
            ? setFilteredServices(servicesData) 
            : setFilteredServices(servicesData.filter(service => service.tag === tag));
    }, [tag]);

    useEffect(() => {
        document.title = "LTD - Services";
    }, []);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (document.readyState === 'complete') {
                setOpen(false);
                clearInterval(intervalId);
            }
        }, 100);
        return () => clearInterval(intervalId); // Cleanup on unmount
    }, []);

    const getImageUrl = (src) => `${process.env.PUBLIC_URL}/images/${src}`;

    return (
        <div className="services">
            {open && <Loader open />}
            {!open && <Loader />}
            <h1 className="services-banner">Services</h1>
            <Container>
                <Row>
                    <Col xs="12">
                        <div className="tags">
                            <TagButton name="all" tagActive={tag === 'all'} handleSetTag={setTag} />
                            <TagButton name="hotel" tagActive={tag === 'hotel'} handleSetTag={setTag} />
                            <TagButton name="villa" tagActive={tag === 'villa'} handleSetTag={setTag} />
                        </div>
                    </Col>
                    <Col xs="12">
                        <section className="services-data">
                            {filteredServices.map((service, index) => (
                                <div key={service.id} className="service-card" data-index={index}>
                                    <Row className="service-row">
                                        {/* Image Column (Left Side) */}
                                        <Col md="6" className="service-image" style={{ paddingRight: '0px' }}>
                                            <div className="image-container">
                                                {service.images.map((image, i) => (
                                                    <img 
                                                        key={i} 
                                                        src={getImageUrl(image.src)} 
                                                        alt={image.title} 
                                                        className="service-thumbnail" 
                                                    />
                                                ))}
                                            </div>
                                        </Col>

                                        {/* Details Column (Right Side) */}
                                        <Col md="6" className="service-details" style={{ paddingLeft: '15px' }}>
                                            <h1 className="service-data-heading">{service.name}</h1>
                                            <div className="service-data-style">
                                                <p>Style: {service.style}</p>
                                            </div>
                                            <div className="service-data-setting">
                                                <p>Setting: {service.Setting}</p>
                                            </div>
                                            <div className="service-data-tag">
                                                <p>Tag: {service.tag}</p>
                                            </div>
                                            <br/>
                                            <div className="service-data-price">
                                                <h4>Price per night from: {`Rs.${service.price}`}</h4>
                                            </div>
                                            <Link to={`/services/${service.id}`} className="view-service-btn">
                                                More...
                                            </Link>
                                        </Col>
                                    </Row>
                                </div>
                            ))}
                        </section>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Services;
