import React, { Component, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useQuery } from "react-query";
import { stringify } from 'querystring';
import TimelineChartItem, { TimelineChartItemProps, TimelineDateTime } from './TimelineChartItem';
import TimelineChartRecord, { TimelineChartRecordProps } from './TimelineChartRecord';
import './style/timeline-chart-style.css';
import { DataUpdateFunction } from 'react-query/types/core/utils';
import { State, stringToDateTimeObject,  } from '../pages/Pinger';
import { Directions, EditNotifications, Margin, RecordVoiceOverSharp } from '@mui/icons-material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Button } from 'react-bootstrap';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export interface TimelineChartProps 
{
    records: TimelineChartRecordProps[];
    setRecords: React.Dispatch<React.SetStateAction<TimelineChartRecordProps[]>>;
    startDate: Date | null;
    endDate: Date | null;
    setStartDate: React.Dispatch<React.SetStateAction<Date | null>>;
    setEndDate: React.Dispatch<React.SetStateAction<Date | null>>;
    setCustomizedEndDate: React.Dispatch<React.SetStateAction<boolean>>;
    zoomLevel: number;
    resolution: string;
    chartWidth: number;
    clickedIp: string | null;
    /*setChartWidth: React.Dispatch<React.SetStateAction<number>>;*/
}



const TimelineChart = (props: TimelineChartProps) => 
{
    const [scrollTop, setScrollTop] = useState(0); 
    window.onscroll = () => 
    {
        setScrollTop(window.scrollY);
        document.title = scrollTop + "";
    }

    var left = 0, width = 1;
    var regionSelector: HTMLDivElement;
    const [mouseDown, setMouseDown] = useState(false);

    function chartMouseDown(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void 
    {        
        setMouseDown(true);
        if (!document.getElementById("region_selector"))
        {
            //event.stopPropagation();
            const regionSelectorWrapper = document.getElementById("region_selector_wrapper");
            let periodsCount = (props.chartWidth - 80) / 180;
            (regionSelectorWrapper as HTMLDivElement).style.width = (periodsCount * props.zoomLevel * 180) + "px";//((props.zoomLevel * 6) - props.zoomLevel) * 180 + "px";
                        
            const timelineStatesContainer = document.getElementsByClassName("timeline-states-container")[0];
            let rect = event.currentTarget.getBoundingClientRect();      
            left = (event.clientX - rect.left - 40 + timelineStatesContainer.scrollLeft);
            
            regionSelector = document.createElement('div');
            regionSelector.id = "region_selector";
            regionSelector.style.left = left + "px";
            regionSelector.style.width = "1px";
            regionSelector.className = "region-selector";           
            regionSelectorWrapper?.appendChild(regionSelector);
        }
    }

    function chartMouseMove(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void 
    {         
        if (mouseDown == true)
        {   
            event.stopPropagation();
            regionSelector = document.getElementById("region_selector") as HTMLDivElement;
            const timelineStatesContainer = document.getElementsByClassName("timeline-states-container")[0];
            let rect = event.currentTarget.getBoundingClientRect();      
            let x = (event.clientX - rect.left);
            left = parseInt(regionSelector.style.left.split("px").join(""));
            let addedWidth = x - (left + width);
            if (width + addedWidth > 1) {
                width += addedWidth;
                regionSelector.style.width = width + "px";
            }
        }
    }

    function preventRegion() 
    {
        if (mouseDown) 
        {
            setMouseDown(false);
            while (document.getElementById("region_selector"))
            {
                const t = document.getElementById("region_selector");
                t?.parentNode?.removeChild(t);
            }
        }
    }

    const handleChartMouseUp = () =>
    {
        if (mouseDown)
        {            
            left = parseInt(regionSelector.style.left.split("px").join(""));
            let startMilliSeconds = left * (secondsPer180Px / 180) * 1000;
            let newStart = new Date(props.startDate!.getTime() + startMilliSeconds);
            props.setStartDate(newStart);
            let endMilliSeconds = width * (secondsPer180Px / 180) * 1000;
            let newEnd = new Date(newStart.getTime() + endMilliSeconds);
            props.setEndDate(newEnd);    
            props.setCustomizedEndDate(true);       
    
            while (document.getElementById("region_selector"))
            {
                const t = document.getElementById("region_selector");
                t?.parentNode?.removeChild(t);
            }
            setMouseDown(false);
        }
    }

    window.onmouseup = () => handleChartMouseUp();

    var secondsPer180Px = 0;

    const getTimeLinePeriods1 = (): Date[] =>
    {
        /*let periodsCount = ((props.chartWidth - 80) / 180) + 1;
        let newChartWidth = (periodsCount - 1) * 180 + 80;
        if (props.chartWidth - newChartWidth != 0){
            props.setChartWidth(newChartWidth);
        }
        
        alert("2: " + newChartWidth);*/


        let nowDt = new Date();
        let min: number = props.startDate ? props.startDate.getTime() : nowDt.getTime();
        let max: number = props.endDate ? props.endDate.getTime() : nowDt.getTime();   
        return [];
    }

    /*const [chartWidth, setChartWidth] = useState(0);
    window.onload = function()
    {            
        let chartElement: HTMLDivElement = document.getElementById("timeline_states_wrapper") as HTMLDivElement;
        let innerRect = chartElement.getBoundingClientRect();
        let outerRect = chartElement.parentElement!.getBoundingClientRect();
        let width = window.innerWidth - outerRect.left - (window.innerWidth - innerRect.right);
        //alert(width);
        setChartWidth(width);
    };*/

    const getTimeLinePeriods = (): Date[] => 
    {
       /* let chartElement: HTMLDivElement = document.getElementById("timeline_states_wrapper") as HTMLDivElement;
        if (chartElement && chartWidth == 0) 
        {
            let chartElement: HTMLDivElement = document.getElementById("timeline_states_wrapper") as HTMLDivElement;
            let innerRect = chartElement.getBoundingClientRect();
            let outerRect = chartElement.parentElement!.getBoundingClientRect();
            let width = window.innerWidth - outerRect.left - (window.innerWidth - innerRect.right);
            //alert(width);
            setChartWidth(width);
        }
        //if (chartWidth != 0)
        //{
            let periodsCount = Math.floor((chartWidth - 80) / 180);
            let newChartWidth = periodsCount * 180 + 80;
            if (chartWidth - newChartWidth != 0) 
            {
                let remainingSpace = chartWidth - newChartWidth;
                //setChartWidth(newChartWidth + 1);
                //let chartElement: HTMLDivElement | null = document.getElementById("timeline_states_wrapper") as HTMLDivElement;
                //chartElement.style.width = (newChartWidth + 1) + "px";

                //(chartElement.parentElement?.children[0] as HTMLDivElement).style.marginRight = (remainingSpace / 2) + "px";
                //chartElement.style.marginLeft = (remainingSpace / 2) + "px";

                let width = 0;
                for (let i = 0; i < chartElement.parentElement!.children.length; i++) {
                    width += chartElement.parentElement!.children[i].clientWidth;
                }
                let filtersWrapper = document.getElementsByClassName("filters-wrapper")[0] as HTMLDivElement;
                filtersWrapper.style.width = width + "px";
            }*/





            let periodsCount = Math.floor((props.chartWidth - 80) / 180);

            let nowDt = new Date();
            let min: number = props.startDate ? props.startDate.getTime() : nowDt.getTime();
            let max: number = props.endDate ? props.endDate.getTime() : nowDt.getTime();

            props.records.map((record) =>
            {
                record.statesProps.map((state) =>
                {
                    let start = stringToDateTimeObject(state.start.day + "/" + (state.start.month) + "/" + state.start.year +
                        " " + state.start.hour + ":" + state.start.minute + ":" + state.start.second);
                    let end = stringToDateTimeObject(state.end.day + "/" + (state.end.month) + "/" + state.end.year +
                        " " + state.end.hour + ":" + state.end.minute + ":" + state.end.second);
                    //start.setMonth(start.getMonth() - 1);
                    if (min > start.getTime()) 
                    {
                        if (props.startDate && start >= props.startDate) {
                            min = start.getTime();
                        }
                        else if (props.startDate) {
                            min = props.startDate.getTime();
                        }
                    }
                    if (max < end.getTime()) 
                    {
                        if (props.endDate && end <= props.endDate) {
                            max = end.getTime();
                        }
                        else if (props.endDate) {
                            max = props.endDate.getTime();
                        }
                    }
                });
            });

            // make a list of time periods starting from minDate up to maxDate
            const timeDiff = (max - min) / (periodsCount * props.zoomLevel);
            secondsPer180Px = timeDiff / 1000;
            
            // if timediff is in days (2 daays and 8 hours), then make it 2 days, and accumulate the 8 hours of each period to make new period from them, and if all the 8 hours sum up to 2 days then periodsCount++
            var periods: Date[] = [];
            for (let i = 0; i <= (periodsCount * props.zoomLevel); i++) 
            {
                let date = new Date(min + (i * timeDiff));
                if (props.startDate && date < props.startDate) {
                    date = props.startDate;
                }
                if (props.endDate && date > props.endDate) {
                    date = props.endDate;
                }
                periods.push(date);
            }
            return periods;
    }

    var dateTimePeriods = getTimeLinePeriods();
    const diffSeconds = Math.floor(secondsPer180Px),
          diffMinutes = Math.floor((secondsPer180Px / 60)),
          diffHours = Math.floor((secondsPer180Px / (60 * 60))),
          diffDays = Math.floor(secondsPer180Px / (60 * 60 * 24));

    function filterReturnRecords(event: React.MouseEvent<HTMLDivElement, MouseEvent>, record: TimelineChartRecordProps): void 
    {
        let index = props.records.indexOf(record);
        props.records[index].hidden = false;
        let save = [...props.records];
        props.setRecords(save);        
    }
    
    function filterRemoveRecords(event: React.MouseEvent<HTMLDivElement, MouseEvent>, record: TimelineChartRecordProps): void 
    {
        let index = props.records.indexOf(record);
        props.records[index].hidden = true;
        let save = [...props.records];
        props.setRecords(save);
    }

    var tooltip: HTMLDivElement;
    function dtPointMouseMove(event: React.MouseEvent<HTMLDivElement, MouseEvent>, dt: Date): void 
    {
        if (!document.getElementById("timeline_dt_point_tooltip"))
        {
            let days = dt.getDate() < 10 ? "0" + dt.getDate() : dt.getDate();
            let month = (dt.getMonth() + 1) < 10 ? "0" + (dt.getMonth() + 1) : (dt.getMonth() + 1);
            let hours = dt.getHours() < 10 ? "0" + dt.getHours() : dt.getHours();
            let minutes = dt.getMinutes() < 10 ? "0" + dt.getMinutes() : dt.getMinutes();
            let seconds = dt.getSeconds() < 10 ? "0" + dt.getSeconds() : dt.getSeconds();

            tooltip = document.createElement('div');
            tooltip.id = "timeline_dt_point_tooltip";
            tooltip.className = "timeline-dt-tooltip-w";
            tooltip.innerHTML = `<div class="timeline-dt-tooltip">` + days + `/` + month + `/` + dt.getFullYear() + ` ` + hours + `:` + minutes + `:` + seconds + `</div>`;
            tooltip.style.top = (event.clientY + 30).toString() + "px";
            tooltip.style.left = (event.clientX - (tooltip.clientWidth / 2)).toString() + "px";
            const body = document.getElementsByTagName('body')[0];
            body?.appendChild(tooltip);
        }
        else 
        {
            tooltip.style.top = (event.clientY + 30).toString() + "px";
            tooltip.style.left = (event.clientX - (tooltip.clientWidth / 2)).toString() + "px";
        }
    }

    function dtPointMouseOut(event: React.MouseEvent<HTMLDivElement, MouseEvent>): void 
    {
        while (document.getElementById("timeline_dt_point_tooltip"))
        {
            const t = document.getElementById("timeline_dt_point_tooltip");
            t?.parentNode?.removeChild(t);
        }
    }
    
    return (
        <div className='timeline-chart-container'>
            <div className='flex-timeline-chart-container'>
                <div className='filter-container'>
                    <div className='side-title-wrapper' style={{ marginTop: (scrollTop <= 100 ? 0 : scrollTop - 100) + "px" }}>
                    </div>
                    {props.records.map((record: TimelineChartRecordProps) => 
                    {
                        let isMonitored = false;
                        for (let i = 0; i < record.statesProps.length; i++) {
                            if (record.statesProps[i].state != "none") {
                                isMonitored = true;
                                break;
                            }
                        }
                        if (record.hidden == false && isMonitored) 
                        {
                            let blink = props.clickedIp && props.clickedIp == record.ipAddress ? " blink" : "";      
                            return <div className={'filter-button noselect' + blink} onClick={(event) => filterRemoveRecords(event, record)}><VisibilityOffIcon/></div>;
                        }
                    })}
                    {props.records.map((record: TimelineChartRecordProps) =>
                    {
                        let isMonitored = false;
                        for (let i = 0; i < record.statesProps.length; i++) {
                            if (record.statesProps[i].state != "none") {
                                isMonitored = true;
                                break;
                            }
                        }
                        if (record.hidden == true && isMonitored) {
                            return <div className='filter-button noselect' onClick={(event) => filterReturnRecords(event, record)}><RemoveRedEyeIcon/></div>;
                        }
                    })}
                </div>
                <div className='ip-status-container'>
                    <div className='side-title-wrapper' style={{ marginTop: (scrollTop <= 100 ? 0 : scrollTop - 100) + "px" }}>
                    </div>
                    {props.records.map((record: TimelineChartRecordProps) => 
                    {
                        let isMonitored = false;
                        for (let i = 0; i < record.statesProps.length; i++) {
                            if (record.statesProps[i].state != "none") {
                                isMonitored = true;
                                break;
                            }
                        }
                        if (record.hidden == false && isMonitored)
                        {
                            let total = record.downTime + record.upTime;
                            let upPrecentage = ((record.upTime / total) * 100) + "";
                            upPrecentage = parseFloat(upPrecentage).toFixed(1);
                            let blink = props.clickedIp && props.clickedIp == record.ipAddress ? " blink" : "";  
                            return <div className={'ip-status-w' + blink}>
                                <div className='ip-status' style={{ color: "#29B971" }}>{upPrecentage + "%"}</div>
                            </div>;
                        }                        
                    })}
                    {props.records.map((record: TimelineChartRecordProps) =>
                    {
                        let isMonitored = false;
                        for (let i = 0; i < record.statesProps.length; i++) {
                            if (record.statesProps[i].state != "none") {
                                isMonitored = true;
                                break;
                            }
                        }
                        if (record.hidden == true && isMonitored)
                        {
                            let total = record.downTime + record.upTime;
                            let upPrecentage = ((record.upTime / total) * 100) + "";
                            upPrecentage = parseFloat(upPrecentage).toFixed(1);
                            return <div className='ip-status-w' style={{background: "#454545", opacity: "0.3"}}>
                                <div className='ip-status' style={{ color: "#29B971" }}>{upPrecentage + "%"}</div>
                            </div>;
                        }                        
                    })}
                </div>
                <div className='timeline-ips-container'>
                    <div className='side-title-wrapper' style={{ display: "flex", marginTop: (scrollTop <= 100 ? 0 : scrollTop - 100) + "px" }}></div>
                    {props.records.map((record) => 
                    {
                        let isMonitored = false;
                        for (let i = 0; i < record.statesProps.length; i++) {
                            if (record.statesProps[i].state != "none") {
                                isMonitored = true;
                                break;
                            }
                        }
                        if (record.hidden == false && isMonitored)
                        {
                            let blink = props.clickedIp && props.clickedIp == record.ipAddress ? " blink" : "";       
                            let color = record.statesProps[record.statesProps.length - 1].state == "up" ?
                                "#29B971" : "#FF5555";
                            return <div className={'ip-record' + blink} style={{ color: color }}>{record.ipAddress}</div>;
                        }                        
                    })}
                    {props.records.map((record) => 
                    {
                        let isMonitored = false;
                        for (let i = 0; i < record.statesProps.length; i++) {
                            if (record.statesProps[i].state != "none") {
                                isMonitored = true;
                                break;
                            }
                        }
                        if (record.hidden == true && isMonitored)
                        {
                            let color = record.statesProps[record.statesProps.length - 1].state == "up" ?
                                "#29B971" : "#FF5555";
                            let background = record.hidden == true ? "#454545" : "";
                            let opacity = record.hidden == true ? "0.3" : "";
                            return <div className='ip-record' style={{ color: color, background: background, opacity: opacity }}>{record.ipAddress}</div>;
                        }
                    })}
                </div>
                <div id="timeline_states_wrapper" className='timeline-states-wrapper noselect' style={{width: props.chartWidth + "px"}}>
                    <div className='timeline-states-container' onClick={preventRegion} onMouseDown={(event) => chartMouseDown(event)} onScroll={preventRegion} /*onMouseMove={(event) => chartMouseMove(event)}*/ onMouseUp={handleChartMouseUp}>
                        <div id="pinger_chart_time_axis" onMouseDown={(event) => event.stopPropagation()} style={{ marginTop: (scrollTop <= 100 ? 0 : scrollTop - 100) + "px" }} className='date-time-axis'>
                            <div className='r-date-time-axis'>
                            {
                                dateTimePeriods.map((dt: Date) => 
                                {                                    
                                    let index = dateTimePeriods.indexOf(dt);
                                    let days = dt.getDate() < 10 ? "0" + dt.getDate() : dt.getDate();
                                    let month = (dt.getMonth() + 1) < 10 ? "0" + (dt.getMonth() + 1) : (dt.getMonth() + 1);
                                    let hours = dt.getHours() < 10 ? "0" + dt.getHours() : dt.getHours();
                                    let minutes = dt.getMinutes() < 10 ? "0" + dt.getMinutes() : dt.getMinutes();
                                    let seconds = dt.getSeconds() < 10 ? "0" + dt.getSeconds() : dt.getSeconds();
                                    if (index == 0) 
                                    {
                                        if (diffDays > 0) {
                                            return <div className='date-time-point-w' onMouseMove={(event) => dtPointMouseMove(event, dt)} onMouseOut={(event) => dtPointMouseOut(event)} style={{ marginLeft: "0" }}>
                                                <div className='date-time-point' style={{ top: "50%", fontSize: "18px", transform: "translateY(-50%)" }}>{days + "/" + month /*+ "/" + dt.getFullYear()*/}</div>
                                            </div>;
                                        }
                                        else if (diffHours > 0) {
                                            return <div className='date-time-point-w' onMouseMove={(event) => dtPointMouseMove(event, dt)} onMouseOut={(event) => dtPointMouseOut(event)} style={{ marginLeft: "0" }}>
                                                <div className='date-time-point' style={{ fontSize: "14px", height: "16px", lineHeight: "16px" }}>{days + "/" + month /*+ "/" + dt.getFullYear()*/}</div>
                                                <div className='date-time-point'>{dt.getHours() > 12 ? (dt.getHours() - 12) + " PM" : dt.getHours() + " AM"}</div>
                                            </div>;
                                        }
                                        else if (diffMinutes > 0) {
                                            return <div className='date-time-point-w' onMouseMove={(event) => dtPointMouseMove(event, dt)} onMouseOut={(event) => dtPointMouseOut(event)} style={{ marginLeft: "0" }}>
                                                <div className='date-time-point' style={{ fontSize: "14px", height: "16px", lineHeight: "16px" }}>{days + "/" + month /*+ "/" + dt.getFullYear()*/}</div>
                                                <div className='date-time-point'>{hours + ":" + minutes}</div>
                                            </div>;
                                        }
                                        else {
                                            return <div className='date-time-point-w' onMouseMove={(event) => dtPointMouseMove(event, dt)} onMouseOut={(event) => dtPointMouseOut(event)} style={{ marginLeft: "0" }}>
                                                <div className='date-time-point' style={{ fontSize: "14px", height: "16px", lineHeight: "16px" }}>{days + "/" + month /*+ "/" + dt.getFullYear()*/}</div>
                                                <div className='date-time-point'>{hours + ":" + minutes + ":" + seconds}</div>
                                            </div>;
                                        }
                                    }
                                    else 
                                    {
                                        if (diffDays > 0) {
                                            return <div className='date-time-point-w' onMouseMove={(event) => dtPointMouseMove(event, dt)} onMouseOut={(event) => dtPointMouseOut(event)}>
                                                <div className='date-time-point' style={{ top: "50%", fontSize: "18px", transform: "translateY(-50%)" }}>{days + "/" + month /*+ "/" + dt.getFullYear()*/}</div>
                                            </div>;
                                        }
                                        else if (diffHours > 0) {
                                            return <div className='date-time-point-w' onMouseMove={(event) => dtPointMouseMove(event, dt)} onMouseOut={(event) => dtPointMouseOut(event)}>
                                                <div className='date-time-point' style={{ fontSize: "14px", height: "16px", lineHeight: "16px" }}>{days + "/" + month /*+ "/" + dt.getFullYear()*/}</div>
                                                <div className='date-time-point'>{dt.getHours() > 12 ? (dt.getHours() - 12) + " PM" : dt.getHours() + " AM"}</div>
                                            </div>;
                                        }
                                        else if (diffMinutes > 0) {
                                            return <div className='date-time-point-w' onMouseMove={(event) => dtPointMouseMove(event, dt)} onMouseOut={(event) => dtPointMouseOut(event)}>
                                                <div className='date-time-point' style={{ fontSize: "14px", height: "16px", lineHeight: "16px" }}>{days + "/" + month /*+ "/" + dt.getFullYear()*/}</div>
                                                <div className='date-time-point'>{hours + ":" + minutes}</div>
                                            </div>;
                                        }
                                        else {
                                            return <div className='date-time-point-w' onMouseMove={(event) => dtPointMouseMove(event, dt)} onMouseOut={(event) => dtPointMouseOut(event)}>
                                                <div className='date-time-point' style={{ fontSize: "14px", height: "16px", lineHeight: "16px" }}>{days + "/" + month /*+ "/" + dt.getFullYear()*/}</div>
                                                <div className='date-time-point'>{hours + ":" + minutes + ":" + seconds}</div>
                                            </div>;
                                        }
                                    }
                                }
                            )}
                            </div>
                            <div className='datetime-axis-points'>
                            {
                                dateTimePeriods.map((dt: Date) =>
                                {
                                    if (dateTimePeriods.indexOf(dt) == 0) {
                                        return <div className='datetime-axis-point' style={{marginLeft: "0"}}></div>;
                                    }
                                    else {
                                        return <div className='datetime-axis-point'></div>;
                                    }
                                })
                            }
                            </div>
                        </div>
                        {props.records.map((record) => 
                        {        
                            let isMonitored = false;
                            for (let i = 0; i < record.statesProps.length; i++) {
                                if (record.statesProps[i].state != "none") {
                                    isMonitored = true;
                                    break;
                                }
                            }
                            if (record.hidden == false && isMonitored) 
                            {
                                return <TimelineChartRecord selectedStart={props.startDate} selectedEnd={props.endDate} ipAddress={record.ipAddress} statesProps={record.statesProps} secondsPer180Px={secondsPer180Px}
                                    totalWidth={dateTimePeriods.length * 80 + (dateTimePeriods.length - 1) * 100} upTime={record.upTime} downTime={record.downTime} hidden={record.hidden} clickedIp={props.clickedIp} />;
                            }
                        })}
                        {props.records.map((record) => 
                        {
                            let isMonitored = false;
                            for (let i = 0; i < record.statesProps.length; i++) {
                                if (record.statesProps[i].state != "none") {
                                    isMonitored = true;
                                    break;
                                }
                            }
                            if (record.hidden == true && isMonitored) {   
                                return <TimelineChartRecord selectedStart={props.startDate} selectedEnd={props.endDate} ipAddress={record.ipAddress} statesProps={record.statesProps} secondsPer180Px={secondsPer180Px}
                                    totalWidth={dateTimePeriods.length * 80 + (dateTimePeriods.length - 1) * 100} upTime={record.upTime} downTime={record.downTime} hidden={record.hidden} clickedIp={props.clickedIp} />;
                            }
                        })}
                        <div style={{ position: "relative", display: "block", height: "0px", marginTop: "55px" }}></div>
                        <div className='region-selector-wrapper' onMouseMove={(event) => chartMouseMove(event)} onMouseUp={handleChartMouseUp} id="region_selector_wrapper" style={{display: (mouseDown ? "block" : "none")}}></div>
                    </div>                    
                </div>
            </div>
        </div>);
};

export default TimelineChart;