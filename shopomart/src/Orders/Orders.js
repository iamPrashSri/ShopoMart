import React, { useEffect, useState } from 'react';
import { useStateValue } from '../DataLayerConfig/StateProvider';
import { db } from '../Hosting/Firebase';
import Order from './Order/Order';
import './Orders.css';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useHistory } from 'react-router-dom';

function Orders() {

    const [orders, setOrders] = useState([]);
    const [{ user }] = useStateValue();
    const history = useHistory();
    const MySwal = withReactContent(Swal);

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
            MySwal.fire({
                title: <h6>Please Sign In/Sign Up to see your Returns and Orders</h6>,
                icon: "error",
                allowOutsideClick: false,
                allowEscapeKey: false,
                allowEnterKey: false
            }).then(() => {
                history.replace('/login');
            });
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
