FROM python:3.8 as mkrequirementstxt
RUN pip install pipenv
WORKDIR /workdir
COPY Pipfile Pipfile.lock ./
RUN pipenv lock -r > requirements.txt


FROM python:3.8

COPY --from=mkrequirementstxt /workdir/requirements.txt /

RUN pip install waitress -r /requirements.txt

COPY . /app
WORKDIR /app

ENV PYTHONPATH=/app/src

CMD ["waitress-serve", "--call", "app:create_app"]