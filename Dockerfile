FROM python:3.11-slim
WORKDIR /app

# Root se backend folder ke andar ki requirements.txt uthayein
COPY backend/requirements.txt . 

RUN pip install --no-cache-dir -r requirements.txt

# Pura backend folder copy karein
COPY backend/ .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]