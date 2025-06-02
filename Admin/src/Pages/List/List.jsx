import React, { useEffect, useState, useCallback } from 'react';
import './List.css';
import axios from "axios";
import { toast } from "react-toastify";

const List = ({ url }) => {
    const [list, setList] = useState([]);

    const fetchList = useCallback(async () => {
        try {
            const response = await axios.get(`${url}/api/food/list`);
            if (response.data.success) {
                setList(response.data.list);
            } else {
                toast.error("Failed to fetch food list");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error fetching food list");
        }
    }, [url]);

    const removeFood = async (foodId) => {
        try {
            const response = await axios.get(`${url}/api/food/remove/${foodId}`);
            if (response.data.success) {
                toast.success(response.data.message);
                await fetchList();
            } else {
                toast.error("Failed to remove food item");
            }
        } catch (error) {
            console.error(error);
            toast.error("Error removing food item");
        }
    };

    useEffect(() => {
        fetchList();
    }, [fetchList]);

    return (
        <div>
            <p>All Foods List</p>
            <div className="list table">
                <div className="list table-format">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>
                {list.map((item, index) => (
                    <div key={index} className='list-table-format'>
                        <img src={`${url}/images/${item.image}`} alt="" />
                        <p>{item.name}</p>
                        <p>{item.category}</p>
                        <p>{item.price}</p>
                        <p onClick={() => removeFood(item._id)} className='cursor'>X</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default List;
