<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <h2 align="center">Rumer</h3>

  <p align="center">
    AirBnB-inspired property listing and reservation app
    <br />
    <a href="https://rumer.herokuapp.com/">View Live</a>
    ·
    <a href="https://github.com/hedwardd/rumer/issues">Report Bug</a>
    ·
    <a href="https://github.com/hedwardd/rumer/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
      <ul>
        <li><a href="#guests">Guests</a></li>
        <li><a href="#hosts">Hosts</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Screen Shot][screenshot-desktop]](https://rumer.herokuapp.com/)
[![Product Screen Shot Mobile][screenshot-mobile]](https://rumer.herokuapp.com/)

Rumer is an AirBnB-inspired project where users can create listings of their properties (with titles, descriptions, and photos) and browse and reserve other users' listings.

### Built With

* [Node.js](https://nodejs.org/en//)
* [Express](https://expressjs.com/)
* [React](https://reactjs.org/)
* [MongoDB](https://www.mongodb.com/)



<!-- USAGE EXAMPLES -->
## Usage
There are two main ways of using Rumer: as a guest and as a host.

### Guests

As a guest, you can browse and make reservations on listings that hosts have created.

Reservations are made with specific start and end dates and can't overlap with existing reservations.

When browsing, you can optionally filter listings by availabilility so that you don't see listings that are already booked during your preferred date range.

On the "My Reservations" page, you can see all of your future and past reservations that you have made.

### Hosts

As a host, you are primarily listing your properties for guests to make reservations on.

You can create a page for your property (a "listing"), including a title, description, address, and photos, for guests to see and reserve for certain dates.

On the "Manage Listings" page, you can see all of your listings and archive them. Additionally, you can see all future and past reservations that have been made on your listings.

Of course, hosts can also act as guests, but cannot make reservations on their own listings.



<!-- ROADMAP -->
## Roadmap

Regarding features, I'd like to implement geographic searching and filtering, similar to how AirBnB functions.

Regarding technologies, I'm considering refactoring the project, at least starting with the backend, to use TypeScript.  I'm also considering switching from MongoDB database to use PostgreSQL.



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Heath Daniel - [LinkedIn](https://www.linkedin.com/in/heath-daniel/) - mr.heath.daniel@gmail.com

Project Link: [Source](https://github.com/hedwardd/rumer), [Live](https://rumer.herokuapp.com/)



<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
* [date-fns](https://date-fns.org/)
* [react-dates](https://github.com/airbnb/react-dates)
* [dotenv](https://github.com/motdotla/dotenv)
* [Passport](http://www.passportjs.org/)
* [filestack](https://www.filestack.com/)
* [styled-components](https://styled-components.com/)
* [React Carousel Image Gallery](https://github.com/xiaolin/react-image-gallery)
* [react-outside-click-handler](https://github.com/airbnb/react-outside-click-handler)
* [Choose an Open Source License](https://choosealicense.com)



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[license-url]: https://github.com/hedwardd/rumer/blob/main/LICENSE.txt
[screenshot-desktop]: images/screenshot-desktop.png
[screenshot-mobile]: images/screenshot-mobile.png