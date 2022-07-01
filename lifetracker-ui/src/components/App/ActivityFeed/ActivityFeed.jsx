import * as React from 'react'
import './ActivityFeed.css'


export default function ActivityFeed({totalCaloriesPerDay, avgCaloriesPerCategory}){
    return(
        <div className="activity-feed">
            <div className="working-area">
                <div className='handy'>
                    <h1>Activity Feed</h1>
                </div>
                <div className="randy">
                    <button>Add Exercise</button>
                    <button>Log Sleep</button>
                    <button> Record Nutrition </button>
                </div>
            </div>
        </div>
    )
}