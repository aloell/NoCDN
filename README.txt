The repository stores the source code of the project NoCDN.
For complete information, please refer to the thesis: 
SCALABLE CONTENT DELIVERY WITHOUT A MIDDLEMAN
available at the https://etd.ohiolink.edu/
or refer to the paper:
NoCDN: Scalable Content Delivery Without a Middleman
available at https://hotweb2017.github.io/


Below is a very brief introduction of source code for the project.

After you unzip the archive, check the following.

directory "user_side_06_2017_version":
This directory contains user side implementation of 06/2017
"promiseP2P_testv3.html" and "promiseP2P_testv4.html" are both wrapper pages.
In "promiseP2P_testv3.html", if the user fails to fetch a object, it fetches the object from the origin server.
In "promiseP2P_testv4.html", if the user fails to fetch a object, the program ends.
"qihu3.htm" is the first content object.
The directory "qihu_files" contain content objects.
The directory "section9.3_test_cases" contains test web pages for the experiment of section 9.3.
The wrapper page in "section9.3_test_cases" is "myexp2_pro3.html".
Images (pieX.png) in "section9.3_test_cases" are all identical.

directory "cdnp2p1":
This directory contains the peer sign up PHP scripts.

directory "upnplib":
The automated router configuration program on the peer side.
It is used to add/modify/delete a port mapping.


file "http.conf":
peer side apache server configuration file.

directory "promise_enhanced":
"promise_enhanced" contains the 01/2017 version(concurrent fetching) of user side implementation.
"promiseP2P_testv2.html" is the wrapper page.
"qihu2.htm" is the first content object.
"qihu_files" directory contains content objects.


directory "copy_526html":
"copy_526html" contains the 05/2016 version(sequential fetching) of the user side implementation.
myexp2.html is the "container page"
pie.html is the "first_real_content_page"
