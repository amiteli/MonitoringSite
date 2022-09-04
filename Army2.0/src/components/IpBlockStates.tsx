import React, { Component, useState } from 'react';
import ReactDOM from 'react-dom';
import { State, stringToDateTimeObject } from '../pages/Pinger';

export interface IpBlockStatesProps
{
    states: Array<State>;
    secondsPerPixel: number;
};

const IpBlockStates = (props: IpBlockStatesProps) =>
{
    let firstState = props.states[0];
    let index = 1;
    while (firstState.state == "none") {
        firstState = props.states[index];
        index++;
    }

    let up = 0;
    let down = 0;

    props.states.map((state: State) =>
    {
        if (state.state != "none")
        {
            let index = props.states.indexOf(state);
            let startTime = stringToDateTimeObject(state.time);
            startTime.setMonth(startTime.getMonth() - 1);
            let endTime = new Date();
            if (index < props.states.length - 1) {
                endTime = stringToDateTimeObject(props.states[index + 1].time);
                endTime.setMonth(endTime.getMonth() - 1);
            }
            
            let stateDurationSeconds = (endTime.getTime() - startTime.getTime()) / 1000;
        
            if (state.state == "up") up += stateDurationSeconds;
            if (state.state == "down") down += stateDurationSeconds;
        }
    });    

    let total = down + up;
    let upPrecentage = ((up / total) * 100) + "";
    upPrecentage = parseFloat(upPrecentage).toFixed(1);

    let currentState = props.states[props.states.length - 1].state;
    let currentStateStart = stringToDateTimeObject(props.states[props.states.length - 1].time);
    currentStateStart.setMonth(currentStateStart.getMonth() - 1);
    
    var currentSatateDuration = ((new Date()).getTime() - currentStateStart.getTime()) / 1000;
    var durationDays = Math.floor(currentSatateDuration / 86400);
    currentSatateDuration -= durationDays * 86400;

    var durationHours = Math.floor(currentSatateDuration / 3600) % 24;
    currentSatateDuration -= durationHours * 3600;

    var durationMinutes = Math.floor(currentSatateDuration / 60) % 60;
    currentSatateDuration -= durationMinutes * 60;

    var durationSeconds = Math.floor(currentSatateDuration % 60);  // i
    
    let stateDuration = (durationDays > 0 ? durationDays + " | " : "") + 
        (durationHours > 0 ? (durationHours >= 10 ? durationHours : "0" + durationHours) + ":" : "00:") + 
        (durationMinutes > 0 ? (durationMinutes >= 10 ? durationMinutes : "0" + durationMinutes) + ":" : "00:") + 
        (durationSeconds > 0 ? (durationSeconds >= 10 ? durationSeconds : "0" + durationSeconds) : "00");

    return (
        <div className="ip-history-wrapper">

            <div className="ip-status-block-wrapper">
                <div className="ip-block-start-time">{firstState.time}</div>
                <div className="ip-block-up-precentage">{upPrecentage + "%"}</div>                
            </div>

            <div className="ip-status-block-wrapper">
                <div className="ip-block-start-time" style={{display: "inline-block"}}>{"State: "}<div style={{position: "relative", display: "inline-block", fontWeight: "bold", color: (currentState == "up" ? "rgb(41, 185, 113)" : "rgb(255, 85, 85)")}}>{currentState}</div></div>
            </div>

            <div className="ip-status-block-wrapper" style={{borderBottom: "none"}}>
                <div className="ip-block-start-time" style={{color: "#000"}}>{"Duration: " + stateDuration}</div>                
            </div>

            <div className="ip-block-history-wrapper">
                <div className="ip-block-history">
                {
                    props.states.map((state: State) =>
                    {
                        if (state.state != "none")
                        {
                            let index = props.states.indexOf(state);
                            let start = stringToDateTimeObject(state.time);
                            start.setMonth(start.getMonth() - 1);
                            let end = new Date();
                            if (index < props.states.length - 1) {
                                end = stringToDateTimeObject(props.states[index + 1].time);
                                end.setMonth(end.getMonth() - 1);
                            }

                            let seconds = (end.getTime() - start.getTime()) / 1000;
                            let width = seconds / props.secondsPerPixel;
                            
                            return <div className="ip-block-history-item" 
                                style={{background: (state.state == "up" ? "#29B971" : "#FF5555"),
                                    width: width + "px"}}></div>;
                        }
                    })
                }
                </div> 
            </div>                                         
        </div> 
    );
}

export default IpBlockStates;