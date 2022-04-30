FROM cypress/base:latest
COPY . .
ENV NO_COLOR=1
RUN npm install
RUN npm add cypress
ENTRYPOINT npm run test