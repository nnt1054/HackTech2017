# LookingForConcert
WIP Web Application built using Meteor.js at CalTech's hackathon, Hacktech.  Uses Spotify and Ticketmaster API to allow users to sign in and displays concerts based on the artists that they listen to. Also allows users to sort the concerts returned by date, artist, and location.

Link : https://lookingforconcert.herokuapp.com/

User Flow:

1) Click "Connect Spotify" and log in using your Spotify.
2) Click "Load Artists." Feel free to inspect and pull up the console to convince yourself this works.
3) Click "Load concerts." Note: Concerts will not be displayed yet.
4) Click one of the "Sort by" buttons to see your concerts.

FIXME:

1) Need to refine the Ticketmaster query to speedup runtime.  
2) Need to fix the "Sort by Location" to sort by distance to current location, instead of sorting locations alphabetically.
3) Fix saved events.
4) Possibly change implementation to display concerts upon "Load Concerts" button as opposed to current system that requires users to sort before viewing.
5) Add email/text alert reminders based on Saved Events
6) UI/UX
