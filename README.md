# San Francisco Demo Poller

Simple persistent container to periodically poll [DataSF](https://data.sfgov.org/Public-Safety/Fire-Department-Calls-for-Service/nuek-vuh3) and ingest demo data into StatEngine.

## Building

```
docker build -t san-francisco-demo-poller .
```

## Running
```
docker run san-francisco-demo-poller
```
