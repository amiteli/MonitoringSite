import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';

export interface IpBlockHeaderProps
{
    ip: string;
    background: string;
};

const IpBlockHeader = (props: IpBlockHeaderProps) =>
{
    return (
        <div className="ip-data-block-name noselect" 
            style={{background: props.background}}>{props.ip}</div>
    );
}

export default IpBlockHeader;