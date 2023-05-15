import React from "react";
import {Carousel} from "antd";
import book1 from '../asset/book1.jpg'
import book2 from '../asset/book2.jpg'
import book3 from '../asset/book3.jpg'
import book4 from '../asset/book4.jpg'

const bookItems = [
    {
        id: 1,
        image: book1,
        alt: 'book1'
    },
    {
        id: 2,
        image: book2,
        alt: 'book2'
    },
    {
        id: 3,
        image: book3,
        alt: 'book3'
    },
    {
        id: 4,
        image: book4,
        alt: 'book4'
    }
];

const contentStyle = {
    width:'100%',
    background: '#364d79',
};

function BookCarousel() {
    return (
        <Carousel autoplay={true} style={contentStyle}>
            {bookItems.map((item) => (
                <div key={item.id}>
                    <img
                        src={item.image}
                        alt={item.alt}
                        style={{width:'100%'}}
                    />
                </div>
            ))}
        </Carousel>
    )
}

export default BookCarousel;