# Carousell Interview Challenge

## Application Name
Billboard

## How to use

### Option 1: Amazon EC2
The most straight-forward way to deploy application.
Please go to 

http://ec2-35-164-53-251.us-west-2.compute.amazonaws.com/


### Option 2: Docker Image
I use the basic free tier ec2 on AWS, so it shoul be a bit slow. Therefore I provide a docker image solution that can be deployed locally.

Docker Hub url: 
https://hub.docker.com/r/skylying/billboard/

- Step 1: pull docker image

`docker pull skylying/billboard`

- Step 2: run docker image

`docker run -d -p 5000:5000 skylying/billboard`

- Step 3: Search your docker host

In my case, I use `docker-machine` and it hosts an virtual machine in my OS. 
Run `docker-machine env default`, you'll see output like : 

```
export DOCKER_TLS_VERIFY="1"
export DOCKER_HOST="tcp://192.168.99.100:2376"
export DOCKER_CERT_PATH="/Users/tim_lin/.docker/machine/machines/default"
export DOCKER_MACHINE_NAME="default"
# Run this command to configure your shell:
# eval $(docker-machine env default)
```

Copy IP address from `DOCKER_HOST` field, paste it onto your browser like this: 
`192.168.99.100:5000`

Then you are good to go

## About Challenge Requirements
There are few requirements of this challenge, I'll walk through every each one of them

### Maintain a list of topics and its upvotes/downvotes
Check, using sqlite database

### Allow the user to submit topics. For this challenge, a “topic” is simply a string that does not exceed 255 characters.
Check, (1) Front-end `<textarea>` maxlength is set to 255. (2) Backend database schema `content` type is set to `String(255)`

### Allow the user to upvote or downvote a topic multiple times.
Check, try it.

### Always return a list of top 20 topics (sorted by upvotes, descending)
Check, try it

### In-memory: Design an in-memory data structure
Check. I choose sqlite as my in-memory database. When building Flask app , we can assign in-mamory database with configuration paramater `SQLALCHEMY_DATABASE_URI='sqlite:///:memory:'` , which you can find in `src/config.py`. 
To verify that in both environment I provide: 

- AWS

I can't give my aws keys, but here's how I do it

Login to aws instance, `ps -ef | grep python` find my background process, kill it, then run `nohup python app.py --init &` again

- Docker

Run `docker ps`, find container id (for example `dee1e7c7310f`), then run `docker restart dee1e7c7310f`.

## More About Billboard Application

### Application Structure
Billboard is built using python `Flask` framework and `React-redux` structure. 
Here's the folder structure
```
.
├── Dockerfile
├── README.md
├── app.py
├── atom.png
├── build.sh
├── index.html
├── requirements.txt
└── src                      => Flask app here !!
    ├── __init__.py
    ├── config.py
    ├── controller
    │   ├── __init__.py
    │   ├── ajax.py
    │   └── index.py
    ├── exceptions.py
    ├── factory.py
    ├── forms.py
    ├── helper.py
    ├── model
    │   ├── __init__.py
    │   └── billboard.py
    ├── sites                 => React app here !!
    │   ├── index.html
    │   ├── package.json
    │   ├── src
    │   │   ├── actions
    │   │   │   └── topicAction.js
    │   │   ├── app.js
    │   │   ├── components
    │   │   │   ├── billboard.js
    │   │   │   ├── footer.js
    │   │   │   └── topicBox.js
    │   │   ├── constants
    │   │   │   └── constants.js
    │   │   ├── container.js
    │   │   └── reducers
    │   │       └── topicReducer.js
    │   └── webpack.config.js
    └── static
        ├── bundle.js
        ├── css
        │   ├── // CSS stuff...
        ├── fonts
        │   ├── // Font stuff...
        └── js
            └── // JS stuff...
```

### UX Enhancement
To make billboard easier and friendlier to use, I add few extra specs: 

- Input validation

You are not allow to add Empty topic.

- Press Enter to add topic

That's right, enter key works just find too.

- Show all / Show Top 20 button

Requirement says always show top 20 topics, but when I add more than 20 topics with their order sorted by upvotes, I'll never see the newly added topic at bottom of page. So my solution is to add a Toggle button at application footer. Feel free to try that.

- Topic id indicator

Since I didn't check for same topic content, I think putting topic id is a workaround to help identifying topics with same content.


## Conclusion
I hope billboard fits the challenge requirements as well as I hope, if you have any questions on deploying, testing the application, please feel free to let me know. 

My email : 
linsutim@gmail.com

Thank you.



