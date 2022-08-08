import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import { useQuery } from "react-query";
import { stringify } from 'querystring';

export interface TimelineDateTime
{
    day: number;
    month: number;
    year: number;
    hour: number;
    minute: number;
    second: number;
}

export interface TimelineChartItemProps
{
    color: "red" | "green";
    state: "up" | "down";
    start: TimelineDateTime;
    end: TimelineDateTime;
    time: number;
}

const TimelineChartItem = (props: TimelineChartItemProps) =>
{
    return <div start={props.start} className='timeline-chart-item' style={{backgroundColor: props.color}}>
        
    </div>;
};

export default TimelineChartItem;