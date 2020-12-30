# ICOM IC-R30 Webinterface

![IC-R30 Webinterface](https://github.com/Spotterday/Webinterface_ICOM_R30/blob/main/IC-R30%20Webinterface.PNG)

## Hardware requirements

Based on the following document [RS-R30-Brochure](doc/RS-R30-Brochure.pdf), you will need a USB dongle which supports SPP (CI-V command）.
A possible USB dongel which works under Linux and Windows is this : [USB Dongle](https://amzn.to/3o0EV8l) *Affiliate  Link*
-> Bluetooth Profile : A2DP, ATT, AVRCP, GAVDP, GATT, HCRP, HFP, HID, HID over GATT, OPP, PAN, SPP

## Software requirements

OS : Raspbian GNU/Linux 10 (buster) / Windows 10

## Installation

### Prepare Linux

`apt-get full-upgrade`

`apt-get install pi-bluetooth`

`apt-get install npm`

`apt-get install nodejs`

`apt-get install bluealsa`

`apt-get install libasound2 libasound2-dev`

### Disable onboard Bluetooth

` # Add line to /boot/config.txt` 
` dtoverlay=pi3-disable-bt`

`sudo systemctl disable hciuart.service`




## Known Issues

### IC-R30 Settings not working

### Receive audio via Bluetooth not working




