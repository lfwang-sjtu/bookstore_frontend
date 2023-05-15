import React from 'react';
import { Card } from 'antd';
import {Link} from 'react-router-dom'
const { Meta } = Card;

function Book(props) {
    const {info} = props;
    return (
        <Link
            to={`/book_details/${info.id}`}
        >
            <Card
                style={{width: 300, height: 400}}
                cover={<img alt={info.name} src={info.image}/>}
            >
                <Meta title={info.name} description={'¥' + info.price}/>
            </Card>
        </Link>
    )
}
export default Book;