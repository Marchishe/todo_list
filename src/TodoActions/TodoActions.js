import React from 'react'
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckIcon from '@mui/icons-material/Check';
import './TodoActions.css';

function TodoActions(
    {
        handleChangeTab,
        tab
    }
) {


    return (
        <div className='actions-wrapper'>
            <Tabs
                value={tab}
                onChange={(e, tabValue)=>handleChangeTab(tabValue)}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
            >
                <Tab label='Task List' />
                <Tab label='Active Tasks' />
                <Tab label='Done' />
            </Tabs>
        </div>
    );
}

export default TodoActions;
