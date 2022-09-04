import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import { useQuery } from "react-query";
import { stringify } from 'querystring';
import TimelineChartItem, { TimelineChartItemProps, TimelineDateTime } from './TimelineChartItem';
import './style/timeline-chart-style.css';
import { stringToDateTimeObject } from '../pages/Pinger';

export interface TimelineChartRecordProps
{
    selectedStart: Date | null;
    selectedEnd: Date | null;
    ipAddress: string;
    statesProps: TimelineChartItemProps[];
    secondsPer180Px: number;
    totalWidth: number;
    upTime: number;
    downTime: number;
    hidden: boolean;
    clickedIp: string | null;
}

const TimelineChartRecord = (props: TimelineChartRecordProps) =>
{
    if (props.hidden == false)
    {   
        let blink = props.clickedIp && props.clickedIp == props.ipAddress ? " blink" : "";  
        return (<div className={'timeline-chart-record-container' + blink} style={{width: props.totalWidth + "px"}}>
            <div className='timeline-chart-record'>
                { props.statesProps.map((item: TimelineChartItemProps) => {
                    return <TimelineChartItem color={item.color} state={item.state} start={item.start} end={item.end} timeInSeconds={item.timeInSeconds} secondsPer180Px={props.secondsPer180Px}/>;
                })}
            </div>
        </div>);
    }
    else 
    {        
        return (<div className='timeline-chart-record-container' style={{width: props.totalWidth + "px", background: "#454545", opacity: "0.3" }}>
            <div className='timeline-chart-record'>
                { props.statesProps.map((item: TimelineChartItemProps) => {
                    return <TimelineChartItem color={item.color} state={item.state} start={item.start} end={item.end} timeInSeconds={item.timeInSeconds} secondsPer180Px={props.secondsPer180Px}/>;
                })}
            </div>
        </div>);
    }
};

export default TimelineChartRecord;