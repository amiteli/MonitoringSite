import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import { useQuery } from "react-query";
import { stringify } from 'querystring';
import './style/timeline-chart-style.css';

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
    color: string | "#FF5555" | "#29B971";
    state: string | "up" | "down" | "none";
    start: TimelineDateTime;
    end: TimelineDateTime;
    timeInSeconds: number;
    secondsPer180Px: number;
}

const TimelineChartItem = (props: TimelineChartItemProps) =>
{
    var tooltip: HTMLDivElement;
    const boxMouseMoveHandler = (event: React.MouseEvent<HTMLDivElement>, stateProps: TimelineChartItemProps): void => 
    {
        const box: HTMLDivElement = event.currentTarget;
        box.getElementsByTagName('div')[0].style.opacity = "0.3";
        if (!document.getElementById("timeline_chart_tooltip"))
        {
            let background = stateProps.state == "up" ? "#5af8ae" : (stateProps.state == "down" ? "#fd9e9e" : "#999");
            tooltip = document.createElement('div');
            tooltip.id = "timeline_chart_tooltip";
            tooltip.className = "pinger-tooltip-w";
            tooltip.style.background = background;
            tooltip.innerHTML = `<div class="pinger-tooltip">
                <div class="state-tt-handle">` + stateProps.state.toUpperCase() + `</div>
                <div class="state-desc">Start: ` + stateProps.start.day + "/" + (stateProps.start.month + 1) + "/" + 
                    stateProps.start.year + " " + stateProps.start.hour + ":" + stateProps.start.minute + ":" + 
                    stateProps.start.second + `</div>
                <div class="state-desc">End: ` + stateProps.end.day + "/" + (stateProps.end.month + 1) + "/" +
                    stateProps.end.year + " " + stateProps.end.hour + ":" + stateProps.end.minute + ":" +
                    stateProps.end.second + `</div>
            </div>`;
            tooltip.style.top = (event.clientY + 30).toString() + "px";
            tooltip.style.left = (event.clientX - (tooltip.clientWidth / 2)).toString() + "px";
            const body = document.getElementsByTagName('body')[0];
            body?.appendChild(tooltip);
        }
        else 
        {
            let background = stateProps.state == "up" ? "#5af8ae" : (stateProps.state == "down" ? "#fd9e9e" : "#999");
            tooltip.style.background = background;
            tooltip.style.top = (event.clientY + 30).toString() + "px";
            tooltip.style.left = (event.clientX - (tooltip.clientWidth / 2)).toString() + "px";
        }
    }
    
    const boxMouseOutHandler = (event: React.MouseEvent<HTMLDivElement>, stateProps: TimelineChartItemProps) => 
    {
        const box: HTMLDivElement = event.currentTarget;
        box.getElementsByTagName('div')[0].style.opacity = "0";        
        while (document.getElementById("timeline_chart_tooltip"))
        {
            const t = document.getElementById("timeline_chart_tooltip");
            t?.parentNode?.removeChild(t);      
        }
    };
    
    let secondsPerPixel = props.secondsPer180Px / 180;    
    return (<div className='timeline-chart-item' style={{backgroundColor: props.color, 
        width: (props.timeInSeconds / secondsPerPixel) + "px"}}
        onMouseOut={(event) => boxMouseOutHandler(event, props)}
        onMouseMoveCapture={(event) => boxMouseMoveHandler(event, props)}
        onMouseDown={(event) => event.stopPropagation()}>
            <div className='timeline-chart-item-mask'></div>
        </div>);
};

export default TimelineChartItem;