'use strict';

import React from 'react';


module.exports.About = React.createClass({
  render: function() {
    return (
      <div className="StaticPage-container">
        <div className="StaticPage">
         <h2 className="StaticPage-title">About</h2>
         <h3 className="StaticPage-title">Your city, your map, your voice.</h3>
         <h4>WHAT</h4>
         <p>StreetlivesNYC is an online space providing information for and from the homeless population of New York City.</p>
         <p>We are simultaneously the first living database of needs and resources created by the homeless community, a platform for representation and a means to effect change in the provision of services and programs.</p>
            
         <h4>HOW</h4>
         <p>StreetlivesNYC can easily be used to quickly create, locate and view description of services, and comment on any aspect of homeless life in NYC, as well as provide warnings on difficulties and dangers faced by the community.</p>

         <p>Anyone can use StreetlivesNYC to search for services and/or to make a post. We are currently planning to allow users to upload images as well. In the near future we will be introducing the following ways to post: twitter #StreetlivesNYC, Facebook, or sending toll-free SMS or voicemail.</p>

         <p>Community guidelines for posting are:</p>
         <h5>• Respect and do no harm to others <br />
           • Respect and do no harm to yourself</h5>
         <p>The site is moderated. Hate speech will be removed. Factually incorrect location posts will be amended.</p>


         <h4>WHY</h4>
         <p>Over the course of the last City fiscal year (FY 2015), nearly 110,000 individuals slept in the New York City municipal shelter system. This includes over 42,000 different homeless New York City children.</p>
         <p>Each night thousands of unsheltered homeless people sleep on New York City streets, in the subway system, and in other public spaces. There is no accurate measurement of New York City’s unsheltered homeless population, and recent City surveys significantly underestimate the number of unsheltered homeless New Yorkers. <br/><a href="http://www.coalitionforthehomeless.org/basic-facts-about-homelessness-new-york-city/">(source: Coalition for the Homeless)</a>
         </p>
         <p>StreetlivesNYC is a platform for community empowerment and self-representation. By improving the understanding of and access to relevant services, StreetlivesNYC can provide non personal data to advocate for and improve the efficacy of those services.</p>
         <p>In short, the community's insight over time into what works and what doesn’t is shared with Service Providers without compromising user privacy.</p>
         <p>Whilst our core mission is to provide user generated content, the site's functionality will adapt to and be guided by the community’s need.</p>
         <p>We do not assume that we have a right to make choices for the user without consensus. Feedback is gratefully welcomed.</p>
         <p>Thank you,<br />
           —The Streetlives team.</p>
         <p>Outreach ongoing with:</p>
         <div className="Outreach">
            <div className="social-proof">
                <a href="http://www.aliforneycenter.org/"><img src="img/AliForney.svg"></img></a>
            </div>
            <div className="social-proof">
                <a href="https://cartodb.com/"><img src="img/CartoDB.svg"></img></a>
            </div>
            <div className="social-proof">
                <a href="http://civichall.org/"><img src="img/CivicHall.svg"></img></a>
            </div>
            <div className="social-proof">
                <a href="https://openreferral.org/"><img src="img/OpenReferral.svg"></img></a>
            </div>
            <div className="social-proof">
                <a href="https://www.plannedparenthood.org/"><img src="img/PlannedParenthood.svg"></img></a>
            </div>
            <div className="social-proof">
                <a href="https://www.breadandlife.org/"><img src="img/StJohn.png"></img></a>
            </div>
         </div>
        </div>
      </div>
    )
  }
})
