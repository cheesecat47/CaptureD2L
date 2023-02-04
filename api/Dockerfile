# syntax=docker/dockerfile:1
FROM python:3.11 as builder

ENV PYTHONUNBUFFERED = 1

WORKDIR /app

COPY ./src .
COPY ./requirements.txt /

RUN apt-get update; apt-get install -y gcc python3-dev python3-venv libgl1-mesa-glx libglib2.0-0; \
    python3 -m venv /venv; \
    /venv/bin/pip install -U pip setuptools; \
    /venv/bin/pip install -r /requirements.txt;

FROM python:3.11 

WORKDIR /app

COPY --from=builder /app /app
COPY --from=builder /venv /venv

RUN apt-get update; apt-get install -y libgl1-mesa-glx libglib2.0-0;

ENV PATH="/venv/bin:$PATH"

CMD [ "uvicorn", "main:app", "--host=0.0.0.0", "--reload" ] 
    # "--root-path", "/api/v1"