import React from 'react';
import { Descriptions, Button } from 'antd';

function BookDetail(props) {
    console.log(props.info);
    return (
        <div>
            <div>
                <div ><img alt="image" src={props.info.image} style={{width:"350px", height:"350px"}}/></div>
                <div>
                    <Descriptions>
                        <Descriptions.Item label={"书名"} span={3}>{props.info.name}</Descriptions.Item>
                        <Descriptions.Item label={"作者"} span={3}>{props.info.author}</Descriptions.Item>
                        <Descriptions.Item label={"分类"} span={3}>{props.info.type}</Descriptions.Item>
                        <Descriptions.Item label={"定价"} span={3}>¥ {props.info.price}</Descriptions.Item>
                        <Descriptions.Item label={"状态 "} span={3}>有货 库存 {props.info.inventory}件</Descriptions.Item>
                        <Descriptions.Item label={"作品简介"} span={3}>{props.info.description}</Descriptions.Item>
                    </Descriptions>
                </div>
            </div>
            <div>
                <Button size={"large"}>
                    加入购物车
                </Button>

                <Button size={"large"}>
                    立即购买
                </Button>
            </div>
        </div>
    )
}
export default BookDetail;

