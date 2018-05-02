# San Francisco Demo Poller

Simple persistent service to periodically poll [DataSF](https://data.sfgov.org/Public-Safety/Fire-Department-Calls-for-Service/nuek-vuh3) and ingest demo data into StatEngine.

## Developing

### Install Dependencies
```
npm install
```

### Compile
```
npm compile
```

### Running
```
node lib/index.js
```

## Docker

### Building

```
docker build -t prominentedgestatengine/san-francisco-demo-poller:latest --no-cache .
```

### Running
```
docker run prominentedgestatengine/san-francisco-demo-poller:latest
```

## Pushing
```
docker push prominentedgestatengine/san-francisco-demo-poller:latest
```
