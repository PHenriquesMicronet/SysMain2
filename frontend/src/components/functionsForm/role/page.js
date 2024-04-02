"use client"
import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function roleEdit(idRole){
    //edição na tabela role
    const [valuesRole, setValuesRole] = useState({
        name: '',
        description: ''
    })


    useEffect(() => {
        axios.get('/api/hotel/roles/' + idRole)
            .then(res => {
                setValuesRole({ ...valuesRole,
                    name: res.data.response.name,
                    description: res.data.response.description
                })
            })
            .catch(err => console.log(err))
    }, [])


    function handleUpdateRole(e) {
        e.preventDefault()
        axios.patch('/api/hotel/roles/' + idRole, {
            data: {
                name: valuesRole.name,
                description: valuesRole.description
            }
        })
        .catch(err => console.log(err))
    }

    return { 
        handleUpdateRole, setValuesRole, valuesRole 
    };
}