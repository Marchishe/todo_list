import React from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
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
                onChange={(_, tabValue)=>handleChangeTab(tabValue)}
                variant="scrollable"
                scrollButtons="auto"
                aria-label="scrollable auto tabs example"
            >
                <Tab className='ready-tasks' label='All tasks' />
                <Tab className='active-tasks' label='Active Tasks' />
                <Tab className='finished-tasks' label='Done' />
            </Tabs>
            <div className='white-element'></div>
        </div>
    );
}

export default TodoActions;
