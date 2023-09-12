# Design System Deployment Guide

There are many ways to start using the design system:

1. Clone the repo. Yep, that's it. Once you have the code on your computer, go to the folder and click on index.html. Drop the file into a text editor to start customizing.
2. Fork the repo. Once you create a fork, it's yours. You can edit code directly from Github's web interface or clone it to your computer. Enable Pages in Settings and you'll have a live website ready in minutes.
3. Deploy as an onion site on a VPS. We've included a script to deploy your site as an onion service, which is only accessible through the Tor Browser.

## Deploy as an Onion site on a VPS

1. Go to digitalocean.com and create an account.
2. Click "Create" > Droplet.
3. Choose the configuration for your server.
   a. For the operating system, choose Debian 12
   b. All other settings are flexible. It's possible only to pay $4/mo.
4. Once created, open your Terminal and SSH into your new server.
   ```
   ssh root@<IP ADDRESS>
   ```
5. Once logged in, execute the following command:
   ```
   curl -sSL https://raw.githubusercontent.com/scidsg/design-system/main/scripts/onion-install.sh | bash
   ```
6. The various packages needed for proper functionality will automatically download.
7. Once installation is complete, you'll see a message that looks like this:
   ```
   ✅ The Design System installation is complete! You can access it using Tor Browser by entering the address below:
                                               
   http://r6dq7s64lo6y3e267tfwjdgjydkvko33vhpzo7yptvj3ghm5n4yhg5qd.onion
   ```
8. [Download Tor Browser](https://www.torproject.org/download/), then enter your onion address.

🎉 Congratulations, you've just launched a private website powered by our design system and the Tor network!

![demo](https://github.com/scidsg/design-system/assets/28545431/11988e19-e300-425f-abf0-7d694cef406e)
