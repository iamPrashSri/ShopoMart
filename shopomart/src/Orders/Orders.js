import React, { useEffect, useState } from 'react';
import { useStateValue } from '../DataLayerConfig/StateProvider';
import { db } from '../Hosting/Firebase';
import Order from './Order/Order';
import './Orders.css';

function Orders() {

    const [orders, setOrders] = useState([]);
    const [{basket, user}, dispatch] = useStateValue();

    useEffect(() => {

        if( user ){
            db.collection('users')
            .doc(user?.uid)
            .collection('orders')
            .orderBy('created', 'desc')
            .onSnapshot(snapshot => (
                setOrders(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            ));
        } else {
            setOrders([]);
        }
    }, [user]);

    return (
        <div className="orders">
            <div className="orders__order">
                {orders?.map(order => (
                    <Order 
                        order={order}
                    />
                ))}
            </div>
        </div>
    )
}

export default Orders;
