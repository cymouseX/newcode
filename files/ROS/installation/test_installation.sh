#!/bin/bash

echo This script loads the turtlebot into gazebo and starts an rviz session.
echo If you, inside rviz, click the \"2D Nav Goal\" button and click on the map near the robot, the robot should attempt to navigate to that location. It may not do a good job of that.
echo Use Ctrl-C in this terminal window to exit.
echo WARNING - After you press enter, it may take a few minutes to start up \( particularly the first time \).
echo Press enter to proceed
read temp

source /opt/ros/kinetic/setup.bash 

roslaunch turtlebot_gazebo turtlebot_world.launch &

sleep 10

roslaunch turtlebot_gazebo amcl_demo.launch &

sleep 5

roslaunch turtlebot_rviz_launchers view_navigation.launch 

killall rosout roslaunch rosmaster gazebo