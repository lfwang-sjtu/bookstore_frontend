import React, {useEffect, useState} from 'react';
import { Card } from 'antd';
import {Link} from 'react-router-dom'
const { Meta } = Card;

function BookCard(props) {

    return (
        <Card
            hoverable={true}
            style={{width: 300, height: 400}}
            cover={<img alt={props.item.name} src={props.item.image}/>}
        >
            <Meta
                title={
                    <Link to={`/book_details/${props.item.isbn}`}>
                        {props.item.name}
                    </Link>
                }
                description={'¥' + props.item.price}
            />
        </Card>
    )
}
export default BookCard;