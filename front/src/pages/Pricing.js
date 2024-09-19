import React from 'react';
import './pageStyles/pricing.css';

const Pricing = () => {
    const services = [
        { name: 'Private Photography Session', price: '100 credits' },
        { name: 'Graduation Photography', price: '150 credits' },
        { name: 'Wedding Photography', price: '500 credits' },
        { name: 'Event Filming', price: '300 credits' },
        { name: 'Photo Album Design', price: '50 credits' },
    ];

    return (
        <div className="pricing-container">
            <h2 className="pricing-title">Our Services & Pricing</h2>
            <div className="pricing-list">
                {services.map((service, index) => (
                    <div key={index} className="pricing-item">
                        <span className="service-name">{service.name}</span>
                        <span className="service-price">{service.price}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Pricing;
