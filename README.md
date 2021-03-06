
# Ellie Tale - WebXR Version | [Try it out!](https://vrapeutic.github.io/Ellie-Tale/index.html) 

[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-v2.0%20adopted-ff69b4.svg)](code_of_conduct.md)
| master 	| [![Build Status](https://travis-ci.com/vrapeutic/Ellie-Tale.svg?branch=main)](https://travis-ci.com/vrapeutic/Ellie-Tale) 	| Travis CI Build Status 	|
|-	|-	|-	|
___

<p align="center">
<a href="https://giphy.com/"><img src="https://media.giphy.com/media/sPLvCsgHmeRORpXqEB/giphy.gif" alt="Ellie-poster" border="0"></a>
</p>

## Description
 
A gamified **Virtual Reality** theapeutic application, addresses attention skills on various levels. The gameplay consists of a visual target tracking exercise that is designed to address and measure the various variables of attention.

## Story
**Uncle Noah** is a nice old man, living by himself in the neighborhood. Since he’s living alone, he usually needs help in his everyday activites. He does fishing, farming, growing fruits, and writes books to earn a living. 

**Ellie** is a fairy living in the neighborhood. One evening, she saw Uncle Noah while he was working on his garden and she talked to him. When she got to know that he was living and working all by himself, she decided that she’d pass by every day to help him. Ellie has invited the **you** to join her in helping Uncle Noah by unpacking his tools or collecting his objects.

The gameplay occurs in **three unique environments**. Each is composed of a round track on which the player shall reveal hidden items with the help of Ellie that are then collected. Uncle Noah is always present in the environments on the side doing an idle animation, and the items that the player and Ellie find are collected in a container that lies beside Uncle Noah.
The three environments are: 

 - **Garden**; and the objective is to collect fruits and vegetables
 - **Beach**; and the objective is to collect fish and fishing tools
 - **Library**; and the objective is to collect letters

## Technologies Used

 - [A-Frame](https://aframe.io/)
	 - [Animation Mixer](https://www.8thwall.com/8thwall/animation-mixer-aframe)
	 - [AABB Colider](https://github.com/supermedium/superframe/tree/master/components/aabb-collider/)
	 - [SPE Particles](https://github.com/harlyq/aframe-spe-particles-component)
 - HTML, CSS, JavaScript

## Installation Guide

### 1 | Install and run the project locally using NPM
---

> node v15.5.0
> npm v7.3.0

 1. Clone the repository `git clone https://github.com/vrapeutic/Ellie-Tale.git`
 2. Go to the repo's directory `cd Ellie-Tale`
 3. Run `npm install` to install the required dependecies
 4. Run `npm run dev` command to start the WebXR app in your local envirotnment
 5. Go to the localhost URL specified in the terminal
 6. Congrats! You've got your local development environment ready!

### 2 | Install and run the project locally using Docker
---

> docker v20.10.1

 1. Clone the repository 
`git clone https://github.com/vrapeutic/Ellie-Tale.git`
 2. Go to the repo's directory 
`cd Ellie-Tale`
 3. Run `docker pull yahyaalaa/Ellie-tale-webxr:tag` to pull the latet Docker image from our DockerHub public repository, where you will find our available `tags`
 4. Run `docker run -d -p YOUR_PREFERRED_PORT:3000 --name Ellie-tale --mount type=bind,source="$(pwd)",target=/webxr-code yahyaalaa/Ellie-tale-webxr:tag` command to run the Docker image on your local machine, and at the same time mount the working directory, to apply changes to the image on the fly
 5. Choose your preferred port in order to run the app on local host
 6. Go to the localhost:YOUR_PREFERRED_PORT to check your new code modifications
 7. Hooray! You've got your Docker image-based local development environment ready!

### 3 | Run the project on Glitch platform
---
 1. Go to [Glitch](https://glitch.com/) platform
 2. Create an account if you don't already have one
 3. On your dashboard, then click **New project**, then choose the **Import from GitHub** option
 4. Paste the repo's full [url](https://github.com/vrapeutic/Ellie-Tale.git), then click **Ok**
 5. You're ready to go!
 
 ### Preferred platform
 ---
 If you are going to be using a VR Headset, then we recommend trying the app (either the [hosted version](https://bit.ly/2LiIM22) or on [Glitch](https://glitch.com/)) on the [Oculus Browser](https://developer.oculus.com/webxr/).
 
 For local development and testing, modern browsers could be used, where mouse and keyboard interactions will be the main source of interaction with the VR environment.


## Contributions
First off, thanks for taking the time to contribute! You can check out our contribution guidelines from this [link](https://github.com/YahyaAlaaMassoud/Ellie-Tale/blob/master/CONTRIBUTING.md).
Please note that this project is released with a Contributor Code of Conduct, which can be found [here](https://www.contributor-covenant.org/version/2/0/code_of_conduct/). By participating in this project you agree to abide by its terms.
