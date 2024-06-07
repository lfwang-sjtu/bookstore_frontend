import Title from "antd/es/typography/Title";
import {Button, Form, Input, List, message, Modal, Table} from "antd";
import {json, useNavigate} from "react-router-dom";
import React, {useState} from "react";
import * as constant from "../utilities/constant";

function AdminBookTable(props) {
    const [searchKeyword, setSearchKeyword] = useState('');
    const [bookData, setBookData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalAddVisible, setModalAddVisible] = useState(false);
    const [id, setId] = useState('');

    const [editName, setEditName] = useState('');
    const [editAuthor, setEditAuthor] = useState('');
    const [editImage, setEditImage] = useState('');
    const [editIsbn, setEditIsbn] = useState('');
    const [editInventory, setEditInventory] = useState('');
    const [editType, setEditType] = useState('');
    const [editPrice, setEditPrice] = useState('');
    const [editDescription, setEditDescription] = useState('');

    const [addName, setAddName] = useState('');
    const [addAuthor, setAddAuthor] = useState('');
    const [addImage, setAddImage] = useState('');
    const [addIsbn, setAddIsbn] = useState('');
    const [addInventory, setAddInventory] = useState('');
    const [addType, setAddType] = useState('');
    const [addPrice, setAddPrice] = useState('');
    const [addDescription, setAddDescription] = useState('');

    const navigate = useNavigate();


    const filteredBooks = bookData.find(book => book.id === id);

    const handleFormSubmit = () => {
        const request = {
            "id": id,
            "name": editName,
            "author": editAuthor,
            "image": editImage,
            "isbn": editIsbn,
            "inventory": editInventory,
            "type": editType,
            "price": editPrice,
            "description": editDescription
        };
        message.info("editbook" + JSON.stringify(request));
        fetch(`${constant.BACKEND}/updateBook`,{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(request)
        }).then((res) => {
            if (res.status === 403) {
                message.info("Please login first");
                navigate("/login");
            }
            if (res.ok) {
                res.json().then((json) => {
                    console.log(json.msg);
                    setBookData(Object.values(json.detail));
                })
            } else message.info("Oops! network error");
        }).catch((error) => {console.log(error);})
        setModalVisible(false);
    };

    const handleDelete = () => {
        fetch(`${constant.BACKEND}/deleteBook?id=${id}`,{
            credentials: 'include',
        })
            .then((res) => {
                if (res.status === 403) {
                    message.info("Please login first");
                    navigate("/login");
                }
            if (res.ok) {
                res.json().then((json) => {
                    console.log(json.msg);
                    setBookData(Object.values(json.detail));
                })
            } else message.info("Oops! network error");
        }).catch((error) => {console.log(error);})
        setModalVisible(false);
    }

    const handleAdd = () => {
        const request = {
            "name": addName,
            "author": addAuthor,
            "image": addImage,
            "isbn": addIsbn,
            "inventory": addInventory,
            "type": addType,
            "price": addPrice,
            "description": addDescription
        };
        message.info("addBook" + JSON.stringify(request));
        fetch(`${constant.BACKEND}/addBook`,{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(request)
        }).then((res) => {
            if (res.status === 403) {
                message.info("Please login first");
                navigate("/login");
            }
            if (res.ok) {
                res.json().then((json) => {
                    console.log(json.msg);
                    setBookData(Object.values(json.detail));
                })
            } else message.info("Oops! network error");
        }).catch((error) => {console.log(error);})
        setModalAddVisible(false);
    }

    const handleCancel = () => {
        setModalVisible(false);
    };

    const handleAddCancel = () => {
        setModalAddVisible(false);
    }

    function openEdit(id) {
        setId(id);
        setModalVisible(true);
    }

    function openAdd() {
        setModalAddVisible(true);
    }

    const columns = [
        {
            title: '书籍ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '书名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '作者',
            dataIndex: 'author',
            key: 'author',
        },
        {
            title: 'ISBN',
            dataIndex: 'isbn',
            key: 'isbn',
        },
        {
            title: '剩余',
            dataIndex: 'inventory',
            key: 'inventory',
        },
        {
            title: '价格',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: '编辑',
            dataIndex: 'action',
            key: 'action',
            render: (text, record) => (
                <div>
                    <Button
                        onClick={() => {
                            openEdit(record.id)
                        }}
                    >编辑</Button>
                </div>
            )
        }
    ];

    const handleSearch = () => {
        fetch(`${constant.BACKEND}/searchBook?keyword=${searchKeyword}`, {
            credentials: 'include',
        })
            .then((res) => {
                if (res.status === 403) {
                    message.info("Please login first");
                    navigate("/login");
                }
                if (res.ok) {
                    res.json().then(
                        (json) => {
                            setBookData(Object.values(json.detail));
                        }
                    )
                }
            })
            .catch(error => {
                console.error('Error fetching book list:', error);
            });
    };

    // const data = props.bookData.map((item) => ({ key: item.id, ...item }));

    const handleNameChange = (e) => {
        setEditName(e.target.value);
    };

    const handleAuthorChange = (e) => {
        setEditAuthor(e.target.value);
    };

    const handleIsbnChange = (e) => {
        setEditIsbn(e.target.value);
    };

    const handleImageChange = (e) => {
        setEditImage(e.target.value);
    };

    const handleInventoryChange = (e) => {
        setEditInventory(e.target.value);
    };

    const handleTypeChange = (e) => {
        setEditType(e.target.value);
    };

    const handlePriceChange = (e) => {
        setEditPrice(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setEditDescription(e.target.value);
    };

    const handleNameAdd = (e) => {
        setAddName(e.target.value);
    };

    const handleAuthorAdd = (e) => {
        setAddAuthor(e.target.value);
    };

    const handleIsbnAdd = (e) => {
        setAddIsbn(e.target.value);
    };

    const handleImageAdd = (e) => {
        setAddImage(e.target.value);
    };

    const handleInventoryAdd = (e) => {
        setAddInventory(e.target.value);
    };

    const handleTypeAdd = (e) => {
        setAddType(e.target.value);
    };

    const handlePriceAdd = (e) => {
        setAddPrice(e.target.value);
    };

    const handleDescriptionAdd = (e) => {
        setAddDescription(e.target.value);
    };



    return (
        <div>
            <Input
                placeholder="输入关键词搜索书籍"
                value={searchKeyword}
                onChange={e => setSearchKeyword(e.target.value)}
                style={{ marginBottom: '16px' }}
            />
            <Button type="primary" onClick={handleSearch}>搜索</Button>
            <Button type="primary" onClick={openAdd}>新增图书</Button>
            <Table columns={columns} dataSource={bookData} pagination={false}/>
            <Modal
                title={"编辑书籍信息"}
                visible={modalVisible}
                onCancel={handleCancel}
                footer={null}
            >
                <div>
                    {filteredBooks && (
                        <p>书籍ID:[{id}]</p>
                    )}
                </div>
                <Form
                    name="editBookForm"
                    onFinish={handleFormSubmit}
                >
                    {/* 表单字段 */}
                    <Form.Item
                        label="书名"
                        name="name"
                        rules={[{ required: true, message: '请输入书名' }]}
                    >
                        <Input value={editName} onChange={handleNameChange} />
                    </Form.Item>
                    <Form.Item
                        label="作者"
                        name="author"
                        rules={[{ required: true, message: '请输入作者' }]}
                    >
                        <Input value={editAuthor} onChange={handleAuthorChange}/>
                    </Form.Item>
                    <Form.Item
                        label="ISBN"
                        name="isbn"
                        rules={[{ required: true, message: '请输入ISBN' }]}
                    >
                        <Input value={editIsbn} onChange={handleIsbnChange}/>
                    </Form.Item>
                    <Form.Item
                        label="封面"
                        name="image"
                        rules={[{ required: true, message: '请输入封面地址' }]}
                    >
                        <Input value={editImage} onChange={handleImageChange}/>
                    </Form.Item>
                    <Form.Item
                        label="库存量"
                        name="inventory"
                        rules={[{ required: true, message: '请输入库存量' }]}
                    >
                        <Input value={editInventory} onChange={handleInventoryChange}/>
                    </Form.Item>
                    <Form.Item
                        label="类型"
                        name="type"
                        rules={[{ required: true, message: '请输入类型' }]}
                    >
                        <Input value={editType} onChange={handleTypeChange}/>
                    </Form.Item>
                    <Form.Item
                        label="价格"
                        name="price"
                        rules={[{ required: true, message: '请输入价格' }]}
                    >
                        <Input value={editPrice} onChange={handlePriceChange}/>
                    </Form.Item>
                    <Form.Item
                        label="描述"
                        name="description"
                        rules={[{ required: true, message: '请输入书籍描述' }]}
                    >
                        <Input value={editDescription} onChange={handleDescriptionChange}/>
                    </Form.Item>
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            onClick={() => {
                                handleFormSubmit()
                            }}
                        >提交修改</Button>
                        <Button
                            type="primary"
                            htmlType="delete"
                            onClick={() => {
                                handleDelete()
                            }}
                        >删除这本书</Button>
                    </Form.Item>
                </Form>
            </Modal>

            <Modal
                title={"新建书籍信息"}
                visible={modalAddVisible}
                onCancel={handleAddCancel}
                footer={null}
            >
                <Form
                    name="addBookForm"
                    onFinish={handleAdd}
                >
                    <Form.Item
                        label="书名"
                        name="name"
                        rules={[{ required: true, message: '请输入书名' }]}
                    >
                        <Input value={addName} onChange={handleNameAdd} />
                    </Form.Item>
                    <Form.Item
                        label="作者"
                        name="author"
                        rules={[{ required: true, message: '请输入作者' }]}
                    >
                        <Input value={addAuthor} onChange={handleAuthorAdd}/>
                    </Form.Item>
                    <Form.Item
                        label="ISBN"
                        name="isbn"
                        rules={[{ required: true, message: '请输入ISBN' }]}
                    >
                        <Input value={addIsbn} onChange={handleIsbnAdd}/>
                    </Form.Item>
                    <Form.Item
                        label="封面"
                        name="image"
                        rules={[{ required: true, message: '请输入封面地址' }]}
                    >
                        <Input value={addImage} onChange={handleImageAdd}/>
                    </Form.Item>
                    <Form.Item
                        label="库存量"
                        name="inventory"
                        rules={[{ required: true, message: '请输入库存量' }]}
                    >
                        <Input value={addInventory} onChange={handleInventoryAdd}/>
                    </Form.Item>
                    <Form.Item
                        label="类型"
                        name="type"
                        rules={[{ required: true, message: '请输入类型' }]}
                    >
                        <Input value={addType} onChange={handleTypeAdd}/>
                    </Form.Item>
                    <Form.Item
                        label="价格"
                        name="price"
                        rules={[{ required: true, message: '请输入价格' }]}
                    >
                        <Input value={addPrice} onChange={handlePriceAdd}/>
                    </Form.Item>
                    <Form.Item
                        label="描述"
                        name="description"
                        rules={[{ required: true, message: '请输入书籍描述' }]}
                    >
                        <Input value={addDescription} onChange={handleDescriptionAdd}/>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            onClick={() => {
                                handleAdd()
                            }}
                        >提交新建书籍信息</Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
export default AdminBookTable;