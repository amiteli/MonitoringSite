import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import { State, stringToDateTimeObject } from '../pages/Pinger';
import IpBlockHeader from './IpBlockHeader';
import IpBlockStates from './IpBlockStates';
import IpBlock, { IpBlockProps } from './IpBlock';

export interface CategoryBlockProps
{
    category: string;
    ipBlocks: {[ip: string]: Array<State>};
    setCurrentPage: (page: string, ip: string) => void;// React.Dispatch<React.SetStateAction<string>>;
}

const CategoryBlock = (props: CategoryBlockProps) =>
{
    return (
        <div className='blocks-category'>
            <div className='block-category-title'>{props.category}</div>
            <div className='blocks-wrapper'>            
            {
                Object.keys(props.ipBlocks).map((ip: string) => {
                    return <IpBlock ip={ip} states={props.ipBlocks[ip]} setCurrentPage={props.setCurrentPage}/>;
                })
            }
            </div>
        </div>        
    );
}

export default CategoryBlock;