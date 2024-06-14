"use client"
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react"
import axios from 'axios';

export default function propertyInsert() {

    //inserção na tabela property
    const [property, setProperty] = useState({
        Name: '',
        Email: '',
        FiscalNumber: '',
        Address1: '',
        Country: '',
        District: '',
        ZipCode: '',
        PhoneNumber: '',
        Description: '',
        Abbreviation: '',
        Designation: '',
    })
    const { data: session } = useSession()
    const handleInputProperty = (event) => {
        setProperty({ ...property, [event.target.name]: event.target.value })
    }
    function handleSubmitProperty(event) {
        event.preventDefault()
        if (!property.Name || !property.Email || !property.PhoneNumber || !property.FiscalNumber || !property.Address1 || !property.Country || !property.District || !property.ZipCode || !property.Abbreviation || !property.Description || !property.Designation) {
            alert("Preencha os campos corretamente");
            return;
        }
        axios.put('/api/hotel/properties', {
            data: {
                Name: property.Name,
                Email: property.Email,
                FiscalNumber: property.FiscalNumber,
                Address1: property.Address1,
                Country: property.Country,
                District: property.District,
                ZipCode: property.ZipCode,
                PhoneNumber: property.PhoneNumber,
                Description: property.Description,
                Abbreviation: property.Abbreviation,
                Designation: property.Designation,
                OrganizationID: session.user.organization
            }
        })
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }
    return {
        handleInputProperty, handleSubmitProperty
    };
}

export function propertyEdit(idProperty) {

    //edição na tabela USER
    const [valuesProperty, setValuesProperty] = useState({
        Name: '',
        Email: '',
        FiscalNumber: '',
        Address1: '',
        Country: '',
        District: '',
        ZipCode: '',
        PhoneNumber: '',
        Description: '',
        Abbreviation: '',
        Designation: '',
        active: 0
    })

    useEffect(() => {
        axios.get('/api/hotel/properties/' + idProperty)
            .then(res => {
                const property = res.data.response
                setValuesProperty({
                    ...valuesProperty,
                    idProperty: property.propertyID,
                    Name: property.name,
                    Email: property.email,
                    FiscalNumber: property.fiscalNumber,
                    Address1: property.address1,
                    Country: property.country,
                    District: property.district,
                    ZipCode: property.zipCode,
                    PhoneNumber: property.phoneNumber,
                    Description: property.description,
                    Abbreviation: property.abbreviation,
                    Designation: property.designation,
                    active: property.del
                })
            })
            .catch(err => console.log(err))
    }, [])


    function handleUpdateProperty(e) {
        e.preventDefault()


        axios.patch('/api/hotel/properties/' + idProperty, {
            data: {
                Name: valuesProperty.Name,
                Email: valuesProperty.Email,
                FiscalNumber: valuesProperty.FiscalNumber,
                Address1: valuesProperty.Address1,
                Country: valuesProperty.Country,
                District: valuesProperty.District,
                ZipCode: valuesProperty.ZipCode,
                PhoneNumber: valuesProperty.PhoneNumber,
                Description: valuesProperty.Description,
                Abbreviation: valuesProperty.Abbreviation,
                Designation: valuesProperty.Designation,
                active: valuesProperty.active ? 1 : 0
            }
        })
            .catch(err => console.log(err))
    }

    return {
        handleUpdateProperty, setValuesProperty, valuesProperty
    };
}