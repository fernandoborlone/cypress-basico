FROM cypress/base:14.7.0
COPY . .
ENV NO_COLOR=1
RUN npm install
RUN npm add cypress
ENTRYPOINT npm run test