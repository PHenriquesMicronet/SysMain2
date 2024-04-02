"use client"
import React, { useState, useEffect } from "react";
import axios from 'axios';

export default function propertyInsert(){

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

    const handleInputProperty = (event) => {
        setProperty({ ...property, [event.target.name]: event.target.value })
    }
    function handleSubmitProperty(event) {
        event.preventDefault()
        if (!property.Name || !property.Email || !property.PhoneNumber || !property.FiscalNumber || !property.Address1 || !property.Country || !property.District || !property.ZipCode || !property.Abbreviation || !property.Description || !property.Designation || !property.OrganizationID) {
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
                OrganizationID: property.OrganizationID
            }
        })
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }
    //final da inserção na tabela property
    return { 
        handleInputProperty , handleSubmitProperty, setProperty, property
    };
}

export function propertyEdit(idProperty){
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
        Designation: ''
    })

    useEffect(() => {
        axios.get('/api/hotel/properties/' + idProperty)
            .then(res => {
                setValuesProperty({ ...valuesProperty,
                    Name: res.data.response.name,
                    Email: res.data.response.email,
                    FiscalNumber: res.data.response.fiscalNumber,
                    Address1: res.data.response.address1,
                    Country: res.data.response.country,
                    District: res.data.response.district,
                    ZipCode: res.data.response.zipCode,
                    PhoneNumber: res.data.response.phoneNumber,
                    Description: res.data.response.description,
                    Abbreviation: res.data.response.abbreviation,
                    Designation: res.data.response.designation
                })
            })
            .catch(err => console.log(err))
    }, [])

    /*useEffect(() => {
        axios.get('/api/hotel/properties/' + idProperty) // Makes a GET request to the specified API endpoint
            .then(res => {
                console.log(res) // Logs the response data to the console
            })
            .catch(err => console.log(err)); // Logs any errors that occur during the request
    }, []);*/

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
                Designation: valuesProperty.Designation
            }
        })
        .catch(err => console.log(err))
    }

    return { 
        handleUpdateProperty, setValuesProperty, valuesProperty 
    };
}