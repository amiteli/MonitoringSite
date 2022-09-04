import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import { State, stringToDateTimeObject } from '../pages/Pinger';
import IpBlockHeader from './IpBlockHeader';
import IpBlockStates from './IpBlockStates';

export interface IpBlockProps
{
    ip: string;
    states: Array<State>;
    setCurrentPage: (page: string, ip: string) => void;//React.Dispatch<React.SetStateAction<string>>;
};

const ipDataBlockWidth = 220;

const IpBlock = (props: IpBlockProps) =>
{
    function ipBlockClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>, ip: string): void {
        props.setCurrentPage("secondary", ip);
    }

    // calculate the amount of time (in seconds) since the start of monitoring till now
    let endDate = new Date();
    let firstState = props.states[0];
    let index = 1;
    while (firstState.state == "none") {
        firstState = props.states[index];
        index++;
    }
    let startDate = stringToDateTimeObject(firstState.time);
    startDate.setMonth(startDate.getMonth() - 1);

    let seconds = (endDate.getTime() - startDate.getTime()) / 1000;
    let secondsPerPixel = seconds / ipDataBlockWidth;
        
    return (
        <div className="ip-data-block" onClick={(event) => ipBlockClick(event, props.ip)}>
            <div className="inner-ip-data-block">
                <IpBlockHeader ip={props.ip} background={(props.states[props.states.length - 1].state == "up" ? "#29B971" : "#FF5555")}/>
                <IpBlockStates secondsPerPixel={secondsPerPixel} states={props.states}/>
            </div>
        </div>
    );
};

export default IpBlock;