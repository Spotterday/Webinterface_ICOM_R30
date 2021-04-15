# ICOM IC-R30 Webinterface [Linux]

for Windows : [README_WIN.md](README_WIN.md)

![IC-R30 Webinterface](https://github.com/Spotterday/Webinterface_ICOM_R30/blob/main/IC-R30%20Webinterface.PNG)

## Contact and Support

I try my best to support you - for contact use r30@spotterday.de - but no 24 hour support.
Otherwise check the [FAQ.md](FAQ.md) and [HOWTO.md](HOWTO.md), for questions already asked.

## Donate
Guys I know a lot of stuff on Github is free. But I would appreciate a small coffee donation. The project has taken time and grey hairs.

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/paypalme/spotterday/10)

## Hardware requirements

### USB Bluetooth Dongle
Based on the following document [RS-R30-Brochure](doc/RS-R30-Brochure.pdf), you will need a USB dongle which supports SPP (CI-V command）.
A possible USB dongel which works under Linux and Windows is this : [USB Dongle](https://amzn.to/3o0EV8l) (*Affiliate  Link*)
Bluetooth Profile : A2DP, ATT, AVRCP, GAVDP, GATT, HCRP, HFP, HID, HID over GATT, OPP, PAN, SPP

### USB Audio Card
At the moment I have not finished the audio output via Node JS lib. In the meantime I'm using a USB audio card - which is connected via audio cable to my PI to get audio to my PC - or simply the internal speaker of the R30 ;) .

## Software requirements

OS : Raspbian GNU/Linux 10 (buster) / Windows 10
Browser : Version 87.0.4280.88 

## Installation

### Prepare Linux

```
pi@R30:~ $ sudo apt-get full-upgrade
pi@R30:~ $ sudo apt-get install bluetooth bluez blueman
pi@R30:~ $ sudo apt-get install pi-bluetooth
pi@R30:~ $ sudo apt-get install npm
pi@R30:~ $ sudo apt-get install nodejs
pi@R30:~ $ sudo apt-get install bluealsa
pi@R30:~ $ sudo apt-get install libasound2 libasound2-dev
``` 

```
pi@R30:~ $ sudo cp -a /lib/systemd/system/bluetooth.service /etc/systemd/system

pi@R30:~ $ sudo nano /etc/systemd/system/bluetooth.service

[Unit]
Description=Bluetooth service
Documentation=man:bluetoothd(8)
ConditionPathIsDirectory=/sys/class/bluetooth

[Service]
Type=dbus
BusName=org.bluez
ExecStart=/usr/lib/bluetooth/bluetoothd -C
ExecStartPost=/usr/bin/sdptool add SP
NotifyAccess=main
#WatchdogSec=10
#Restart=on-failure
CapabilityBoundingSet=CAP_NET_ADMIN CAP_NET_BIND_SERVICE
LimitNPROC=1
ProtectHome=true
ProtectSystem=full

[Install]
WantedBy=bluetooth.target
Alias=dbus-org.bluez.service
```

### Enable RFComm

```
pi@R30:~ $ sudo touch /etc/systemd/system/rfcomm.service

pi@R30:~ $ sudo nano /etc/systemd/system/rfcomm.service

[Unit]
Description=RFCOMM service
After=bluetooth.service
Requires=bluetooth.service
[Service]
ExecStart=/usr/bin/rfcomm watch rfcomm0 1 /sbin/agetty -noclear rfcomm0 9600 vt100
[Install]
WantedBy=multi-user.target


pi@R30:~ $ sudo systemctl enable rfcomm
``` 

### Disable onboard Bluetooth

``` 
pi@R30:~ $ sudo nano /boot/config.txt

# Add line to /boot/config.txt
dtoverlay=pi3-disable-bt

# Disable hciuart
pi@R30:~ $ sudo systemctl disable hciuart.service

# Reboot
pi@R30:~ $ sudo reboot
```

### Connect Bluetooth <-> IC-R30

Now the hard part, normally you could pair your R30 with linux via shell. But that dosn´t want work on my PI or I'm acting weird :

Important your R30 should be in mode << Pairing Reception >>

```	
pi@R30:~ $  sudo bluetoothctl 

[bluetooth]# agent on
Agent registered

[bluetooth]# pairable on
Changing pairable on succeeded

[bluetooth]# scan on
Discovery started
...
...
...

[bluetooth]# scan off
Discovery stopped

[bluetooth]# pair XX:XX:XX:XX:XX:XX

[bluetooth]# trust XX:XX:XX:XX:XX:XX
Changing XX:XX:XX:XX:XX:XX trust succeeded
[CHG] Device XX:XX:XX:XX:XX:XX Connected: yes

[bluetooth]# exit
	
```

Fallback is - you can do it via Desktop ;) 

![Linux 1](https://github.com/Spotterday/Webinterface_ICOM_R30/blob/main/doc/img/linux1.png)
![Linux 2](https://github.com/Spotterday/Webinterface_ICOM_R30/blob/main/doc/img/linux2.png)


### Download IC-R30 Webinterface project from Github

```
pi@R30:~ $ wget https://github.com/Spotterday/Webinterface_ICOM_R30/archive/main.zip
pi@R30:~ $ unzip main.zip
pi@R30:~ $ cd Webinterface_ICOM_R30-main
```

### Update IC-R30 Webinterface * Optional

```	
pi@R30:~ $ cp Webinterface_ICOM_R30-main/config/default.json ./default.json
pi@R30:~ $ wget https://github.com/Spotterday/Webinterface_ICOM_R30/archive/main.zip
pi@R30:~ $ unzip main.zip
pi@R30:~ $ cp default.json Webinterface_ICOM_R30-main/config/
pi@R30:~ $ rm -f default.json
```

### Compile node js sub projects with NPM 

A list of packages can be find in [package.json](package.json) under section **dependencies**.

:warning: On Unix put package **"node-bluetooth-serial-port": "tinyprinter/node-bluetooth-serial-port#master"** from package.json to optionalDependencies. It is only required on windows.

```	
pi@R30:~/Webinterface_ICOM_R30-main $ npm install
```

#### Recompile node js sub projects with NPM - if necessary

```	
pi@R30:~/Webinterface_ICOM_R30-main $ rm -rf node_modules/
pi@R30:~/Webinterface_ICOM_R30-main $ npm install
```

### Configure Webinterface

```	
pi@R30:~/Webinterface_ICOM_R30-main $ cd config
pi@R30:~/Webinterface_ICOM_R30-main/config $ nano default.json
```

The main part is the **server/devices** and **scanner/hwmac & scanner/serial**  section

hwmac : In your R30 settings / menu : Bluetooth Set -> Bluetooth Device Information -> BD Address

```
{
  "version" : {
    "web" : "1.4.0",
    "server" : "1.4.5"
  },
  "server"  : {
    "audio" : {
      "src" : ""
    },
    "http": {
      "host": "0.0.0.0",
      "port": 3000
    },
    "devices": {
      "win"   : "Com4",
      "linux" : "/dev/rfcomm0"
    }
  },
  "scanner" : {
    "usa"   : false,
    "hwmac" : "XX:XX:XX:XX:XX:XX",
    "serial": {
      "baudrate"  : 9600,
      "databits"  : 7,
      "autoopen"  : true,
      "stopbits"  : 1,
      "parity"    : "none",
      "lock"      : true
    }
  },
  "debug"   : {
    "server"  : false,
    "web"     : false,
    "data"    : false
  },
  "remote"  : {
    "connect"   : false,
    "host"      : "",
    "port"      : 6000,
    "username"  : "",
    "key"       : "",
    "rights"    : {
      "change" : {
        "freq"  : false,
        "mode"  : false
      }
    }
  }
}
```

### Run Webinterface
```
pi@R30:~/Webinterface_ICOM_R30-main $ node client.js
```

### Run Webinterface as Service

#### Create systemd file 
```
pi@R30:~ $ sudo touch /lib/systemd/system/r30.service
```

#### Add systemd information
```
pi@R30:~ $ sudo nano /lib/systemd/system/r30.service
```
```
[Unit]
Description=R30
After=multi-user.target

[Service]
Type=simple
ExecStart=/usr/bin/nodejs /home/pi/Webinterface_ICOM_R30-main/client.js
Restart=on-abort

[Install]
WantedBy=multi-user.target
```
#### Reload systemd & enable R30 service & start 

```
pi@R30:~ $ sudo systemctl daemon-reload 
pi@R30:~ $ sudo systemctl enable r30.service
pi@R30:~ $ sudo systemctl start r30.service
```

### Open Webinterface
http://{YOUR_PI_IP_ADDRESS}:{PORT_OF_DEFAULT_JSON}
e.g: http://192.168.10.2:3000

## Known Issues

- [ ] IC-R30 Settings not working
- [ ] IC-R30 Bank frequencies listing not working
- [ ] Receive audio via Bluetooth not working
- [x] [Receive audio via Bluetooth - Workaround with VLC](https://github.com/Spotterday/Webinterface_ICOM_R30#workaround-audio-with-vlc)
- [ ] Receive Log in sqlite database not working
- [X] IC-R30 Bank name listing
- [X] IC-R30 WX Mode not supported - i have no USA device
- [X] Command queue fills up when website is not in focus - It is a protection from Chrome and Firefox, that socket request can be made only every 1 second - but we push every 100ms a new command

### Workaround Audio with VLC

Connect your R30 via Cable and [USB Sound Card](https://amzn.to/2WXS3zu) (*Affiliate  Link*) to your PI

```
pi@R30:~ $ sudo apt-get install vlc
pi@R30:~ $ sudo touch /lib/systemd/system/r30audio.service
pi@R30:~ $ sudo nano /lib/systemd/system/r30audio.service

[Unit]
Description=R30audio
After=syslog.target
After=network.target

[Service]
RestartSec=2s
Type=simple
User=pi
Group=pi
ExecStart=/usr/bin/cvlc -vvv alsa://plughw:1,0 --sout '#transcode{acodec=mp3,ab=64,channels=1}:standard{access=http,dst=0.0.0.0:8888/r30.mp3}'
Restart=always

[Install]
WantedBy=multi-user.target

pi@R30:~ $ sudo systemctl daemon-reload 
pi@R30:~ $ sudo systemctl enable r30audio.service
pi@R30:~ $ sudo systemctl start r30audio.service

# Add the web link to your /home/pi/Webinterface_ICOM_R30-main/config/default.json in server\audio\src and restart your service and reload your website

"server"  : {
    "audio" : {
      "src" : "http:\\192.168.10.2\r30.mp3"
    },
    ...
},

```


