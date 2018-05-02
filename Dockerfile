FROM node:8

# Make src directory
RUN mkdir -p /usr/src/se-san-francisco-demo-poller
WORKDIR /usr/src/se-san-francisco-demo-poller

# Install dependencies
COPY package.json /usr/src/se-san-francisco-demo-poller
RUN npm install

# Copy rest of src over
COPY . /usr/src/se-san-francisco-demo-poller

# Compile
RUN npm run compile

# Run
ENV NODE_ENV=production
CMD [ "node", "/usr/src/se-san-francisco-demo-poller/lib/index.js" ]
