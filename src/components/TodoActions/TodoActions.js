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
                <Tab label='All tasks' />
                <Tab label='Active Tasks' />
                <Tab label='Done' />
            </Tabs>
        </div>
    );
}

export default TodoActions;
