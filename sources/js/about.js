'use strict';

import React from 'react';
import { Header} from './header.js';


module.exports.About = React.createClass({
  render: function() {
    return (
      <div>
        <div className="StaticPage">
         <h2 className="StaticPage-title">About</h2>
         <h3 className="StaticPage-title">Your city, your map, your voice.</h3>
         <h4>WHAT</h4>
         <p>StreetlivesNYC is a map based crowdsourcing site providing information for and from the Homeless population of New York City. Our purpose is to give the community something of its own, a platform for its voice unfiltered by outside agency.</p>

         <h4>HOW</h4>
         <p>The site can easily be used to quickly create, locate and view description of services, and comment on any aspect of homeless life in NYC, as well as provide warnings on difficulties and dangers faced by the community.</p>

         <p>This can be achieved by accessing the site online to search for services or to make a post. We are currently planning to allow users to upload images as well. In the near future we will be introducing the following ways to post: twitter #StreetlivesNYC, Facebook, or sending toll-free SMS or voicemail. </p>
         <br />

         <p>Community guidelines for posting are:</p>
         <h5>• Respect and do no harm to others <br />
           • Respect and do no harm to yourself</h5>
         <p>Hate speech will be removed, incorrect location post will be amended.</p>

         <h4>WHY</h4>
         <p>Over the course of the last City fiscal year (FY 2014), more than 116,000 different homeless men, women, and children slept in the New York City municipal shelter system. This includes nearly 42,000 different homeless New York City children.</p>
         <p>Each night thousands of unsheltered homeless people sleep on New York City streets, in the subway system, and in other public spaces. There is no accurate measurement of New York City’s unsheltered homeless population, and recent City surveys significantly underestimate the number of unsheltered homeless New Yorkers.<br/> <a href="http://www.coalitionforthehomeless.org/basic-facts-about-homelessness-new-york-city/">(source: Coalition for the Homeless)</a>
         </p>
         <p> Streetlives aims to be a platform for community empowerment and self-representation. </p>
         <p>A core goal is improving the understanding of and access to relevant services, and as a parallel goal over time StreetlivesNYC intends to use non personal data to advocate for and improve the efficacy of those services. In short, the community's insight over time into what works and what doesn’t is shared with service providers without compromising user privacy.</p>
         <p>Whilst our core mission is to provide user generated content, the site's functionality will adapt to and be guided by the community’s need.</p>
         <p> We do not assume that we have a right to make choices for the user without listening to their voice. Feedback is gratefully welcomed.</p>
         <p>Thank you,<br />
           —The Streetlives team.</p>




         <p>Outreach ongoing with:</p>
         <div className="Outreach">
           <ul>
             <li className="theBridge"></li>
             <li className="Covenant"></li>
             <li className="MCCNY"></li>
             <li className="Father"></li>
           </ul>
         </div>
        </div>
      </div>
    )
  }
})
