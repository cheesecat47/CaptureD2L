# syntax=docker/dockerfile:1
FROM python:3.11-slim as builder

ENV PYTHONUNBUFFERED = 1

WORKDIR /app

COPY . .

RUN apt-get update; apt-get install -y gcc python3-dev python3-venv libgl1-mesa-glx libglib2.0-0; \
    python3 -m venv venv; \
    venv/bin/pip install -U pip setuptools; \
    venv/bin/pip install -r ./requirements.txt;

FROM python:3.11-slim 

WORKDIR /app

COPY --from=builder /app /app

RUN apt-get update; apt-get install -y libgl1-mesa-glx libglib2.0-0;

ENV PATH="/app/venv/bin:$PATH"

CMD [ "uvicorn", "main:app", "--host=0.0.0.0", "--reload" ] 
    # "--root-path", "/api/v1"