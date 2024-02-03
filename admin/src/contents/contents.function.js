import React from 'react';
import './assets/css/index.css';

import ContentsList from './components/contentslist';
import IndieMovieList from './components/indiemovielist';
import UpcomingList from './components/upcominglist';
import TrendingList from './components/trendinglist';


const Contentspage = () => {
	return (
		<div className='main-panel'>
			<div className='content-wrapper'>
				<div className="container-fluid mt-1">
					<ul className="nav nav-tabs" id="myTab" role="tablist">
						<li className="nav-item" role="presentation">
							<button className="nav-link active" id="content-tab" data-bs-toggle="tab" data-bs-target="#content-tab-pane" type="button" role="tab" aria-controls="content-tab-pane" aria-selected="true">Contents</button>
						</li>
						<li className="nav-item" role="presentation">
							<button className="nav-link" id="indiemovie-tab" data-bs-toggle="tab" data-bs-target="#indiemovie-tab-pane" type="button" role="tab" aria-controls="indiemovie-tab-pane" aria-selected="false">Indie Movie</button>
						</li>
						<li className="nav-item" role="presentation">
							<button className="nav-link" id="upcoming-tab" data-bs-toggle="tab" data-bs-target="#upcoming-tab-pane" type="button" role="tab" aria-controls="upcoming-tab-pane" aria-selected="false">Upcoming</button>
						</li>
						<li className="nav-item" role="presentation">
							<button className="nav-link" id="trending-tab" data-bs-toggle="tab" data-bs-target="#trending-tab-pane" type="button" role="tab" aria-controls="trending-tab-pane" aria-selected="false">Trending</button>
						</li>
					</ul>
					<div className="tab-content" id="myTabContent">
						<div className="tab-pane fade show active" id="content-tab-pane" role="tabpanel" aria-labelledby="content-tab" tabIndex="0">
							<ContentsList />
						</div>
						<div className="tab-pane fade" id="indiemovie-tab-pane" role="tabpanel" aria-labelledby="indiemovie-tab" tabIndex="0">
							<IndieMovieList />
						</div>
						<div className="tab-pane fade" id="upcoming-tab-pane" role="tabpanel" aria-labelledby="upcoming-tab" tabIndex="0">
							<UpcomingList />
						</div>
						<div className="tab-pane fade" id="trending-tab-pane" role="tabpanel" aria-labelledby="trending-tab" tabIndex="0">
							<TrendingList />
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Contentspage;