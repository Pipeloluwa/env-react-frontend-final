import React, { useState } from 'react'
import { SketchPicker } from 'react-color'
import { keep_bg_color } from '../api/papic_controls_variables';

const PapicControls = () => {
    // +++++++++++ PICK COLOR ++++++++
    const [pickedColor, setPickedColor]= useState(keep_bg_color[0]);
    const pickedColor_ = (e) => {
        setPickedColor(e.hex);
    }
    const pickedColor__ = (e) => {
        setPickedColor(e.hex);
        keep_bg_color.length= 0;
        keep_bg_color.push(e.hex);
    }

    return (
        <div className='fixed z-10'>
            <SketchPicker 
                color={pickedColor}
                onChange={(e) => {pickedColor_(e)}}
                onChangeComplete= {(e) => {pickedColor__(e)}}
            />
        </div>
    );
}

export default PapicControls