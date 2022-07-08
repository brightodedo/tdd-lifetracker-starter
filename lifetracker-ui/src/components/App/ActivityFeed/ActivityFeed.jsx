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
            <div className="below-banner">
                    <div className="first-banner">
                        <div className="total-exercise">
                            <div className="top-word">
                                <h4>Total Exercise Minutes</h4>
                            </div>
                            <div className="bottom-word">
                                <p>4</p>
                            </div>
                        </div>
                        <div className="avg-sleep">
                            <div className="top-word">
                                <h4>Avg Sleep Hours</h4>
                                </div>
                                <div className="bottom-word">
                                    <p>98.03</p>
                                </div>
                            </div>
                        <div className="avg-calories">
                            <div className="top-word">
                                <h4>Avg Sleep Hours</h4>
                            </div>
                            <div className="bottom-word">
                                <p>98.03</p>
                            </div>
                        </div>
                    </div>
                    <div className="second-label">
                        <h3>More Stats</h3>
                    </div>
                    <div className="second-banner">
                        <div className="max-cal">
                            <div className="top-word">
                                <h4>Maximum Hourly Calories</h4>
                            </div>
                            <div className="bottom-word">
                                <p>350</p>
                            </div>
                        </div>
                        <div className="avg-exercise">
                            <div className="top-word">
                                <h4>Avg Exercise Intensity</h4>
                            </div>
                            <div className="bottom-word">
                                <p>0</p>
                            </div>
                        </div>
                        <div className="total-sleep">
                            <div className="top-word">
                                <h4>Avg Exercise Intensity</h4>
                            </div>
                           <div className="bottom-word">
                                <p>0</p>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}