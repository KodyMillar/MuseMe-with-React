import React from 'react';
import '../../styles/styles.css';

function MyProgress() {
    return (
        <div id="progress-page-layout">
            <div id="my-instruments-list">
                <button id="add-instrument-button">Add Instrument</button>
                <h3>My Instruments</h3>
                <ul>
                    <li>Piano</li>
                </ul>
            </div>
            <div>
                <h1 id="my-progress-header">My Progress</h1>
                <div class="progress-box">
                    <h2 class="instrument-title">Piano</h2>
                    <h3>Level: Grade 5</h3>
                    <table>
                        <tr>
                            <th>Level Progress</th>
                        </tr>
                        <tr>
                            <td>Gauge</td>
                            <td>3/5 songs</td>
                        </tr>
                        <tr>
                            <td>Guage</td>
                            <td>2/4 scales</td>
                        </tr>
                        <tr>
                            <td>Gauge</td>
                            <td>2/2 Chords</td>
                        </tr>
                    </table>
                </div>
            </div>
	    </div>
    )
}

export default MyProgress;