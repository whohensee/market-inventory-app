FROM node:alpine3.21
WORKDIR /app
# RUN npm install
# ENV FLASK_APP=app.py
# ENV FLASK_RUN_HOST=0.0.0.0
# RUN apk add --no-cache gcc musl-dev linux-headers
# COPY requirements.txt requirements.txt
# COPY scripts/ scripts/
# RUN pip install --upgrade pip
# RUN pip install -r requirements.txt
# EXPOSE 5000
COPY . .
RUN npm install express
CMD ["node", "app.js"]