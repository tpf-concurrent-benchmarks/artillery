FROM artilleryio/artillery:2.0.11

WORKDIR /opt/app

RUN apk add --no-cache bash

COPY package.json package.json
COPY package-lock.json package-lock.json
COPY run_scenario.sh run_scenario.sh

RUN npm install

RUN chmod +x run_scenario.sh

ENTRYPOINT ["./run_scenario.sh"]

